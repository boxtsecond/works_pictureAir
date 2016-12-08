/**
 * Created by xueting-bo on 16/11/23.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;
var shareModeEnum = require('../tools/enums.js').shareModeEnum;
var config = require('../../config/config.js').config;
var util = require('../lib/util/util.js');
var Promise = require('bluebird');
var enums = require('../tools/enums.js');
var userModel = require('../mongodb/Model/userModel.js');
var contactModel = require('../mongodb/Model/contactModel.js');
var userModel = require('../mongodb/Model/userModel.js');
var async = require('async');
var common = require('../tools/common.js');
var sendEmail = require('../tools/sendMsg.js').sendEmailTO;
var filterUserToredis=require('../rq.js').resfilter_user.filterUserToredis;
var redisclient=require('../rq').redisclient;

//创建分享链接
exports.getShareUrl = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, ['shareContent'])){
        return res.ext.json(errInfo.getShareUrl.paramsError);
    }
    if (typeof params.shareContent == 'string') {
        try {
            params.shareContent = JSON.parse(params.shareContent);
        } catch (e) {
            return res.ext.json(errInfo.getShareUrl.paramsError);
        }
    }
    var key, targetDataModel,urlParams;
    var fullUrl, secretKey;
    var shareModel = require('../mongodb/Model/shareModel.js');
    var shareContent = params.shareContent;
    var maxRetryCheck = 10;
    var checkCount = 0;
    var checkSecretKey = function(){
        return Promise.resolve()
            .then(function () {
                return shareModel.countAsync({"secretKey":secretKey});
            })
            .then(function (n) {
                if(n >= 1 && checkCount < maxRetryCheck){
                    secretKey = util.shortUrlGenerate(fullUrl);
                    ++ checkCount;
                    checkSecretKey(secretKey);
                }
                if(checkCount >= maxRetryCheck){
                    return Promise.reject(errInfo.getShareUrl.shareUrlError);
                }
            })
            .catch(function (err) {
                if(err.status){
                    return Promise.reject(err);
                }else {
                    return Promise.reject(errInfo.getShareUrl.shareUrlError);
                }
            });
    }

    Promise.resolve()
        .then(function () {
            switch (shareContent.mode){
                case shareModeEnum.product:
                    key = shareModeEnum.product;
                    targetDataModel = require('../mongodb/Model/productModel.js');
                    break;
                case shareModeEnum.userInfo:
                    key = shareModeEnum.userInfo;
                    targetDataModel = require('../mongodb/Model/userModel.js');
                    break;
                case shareModeEnum.photo:
                    key = shareModeEnum.photo;
                    targetDataModel = require('../mongodb/Model/photoModel.js');
                    break;
                case shareModeEnum.video:
                    key = shareModeEnum.video;
                    targetDataModel = require('../mongodb/Model/videoModel.js');
                    break;
                default :
                    key = shareModeEnum.other;
                    break;
            }
            urlParams = querystring.stringify({
                "userId": params.token.userId,
                "key": key,
                "ids": shareContent.ids
            })
            fullUrl = require('url').parse(path.join(config.serverIP, config.apiPort, 'share', urlParams)).path.replace("/" + config.apiPort, ":" + config.apiPort);
            secretKey = util.shortUrlGenerate(fullUrl);
        })
        .then(function(){
            if (!targetDataModel) {
                return Promise.reject(errInfo.getShareUrl.paramsError);
            }else {
                return checkSecretKey();
            }
        })
        .then(function () {
            var condition = {"_id": {"$in": shareContent.ids.split(',')}};
            if (shareContent.mode == shareModeEnum.photo) {
                condition.disabled = false;
            }
            return targetDataModel.findAsync(condition);
        })
        .then(function (targetData) {
            targetData = targetData || [];
            if (targetData.length != 0 && targetData.length != shareContent.ids.split(',').length) {
                return Promise.reject(errInfo.getShareUrl.paramsError);
            }
            return shareModel.findOneAsync({"sharerId": params.token.userId, "shareContent.ids": shareContent.ids.split(",")});
        })
        .then(function (shareData) {
            var info = {};
            if (shareData) {
                info.shareId = shareData._id;
                info.shareUrl = (params.isUseShortUrl) ? shareData.shareShortUrl : shareData.shareUrl;
            }else {
                shareData = new shareModel({
                    shareDomain: config.serverIP + ':' + config.apiPort,
                    sharerId: params.token.userId,
                    shareUrl: fullUrl,
                    shareShortUrl: url.resolve(config.serverIP + ':' + config.apiPort, '/share/' + secretKey),
                    secretKey: secretKey,
                    shareContent: {
                        mode: shareContent.mode,
                        ids: shareContent.ids.split(',')
                    },
                    shareCount: 0
                })
                shareData.save();
                info = {
                    shareId: shareData._id,
                    shareUrl: (params.isUseShortUrl) ? shareData.shareShortUrl : shareData.shareUrl
                };
            }
            return info;
        })
        .then(function (result) {
            var resultObj = errInfo.success;
            resultObj.result = result;
            return res.ext.json(resultObj);
        })
        .catch(function (err) {
            console.log(err);
            if(err.status){
                return res.ext.json(err);
            }
            return res.ext.json(errInfo.getShareUrl.promiseError);
        });
}

//分享链接
function share(req, res, params, next) {
    var params = params || req.ext.params;
    if(!req.ext.checkExistProperty(params, ['shareId', 'shareKey', 'shareContent'])){
        return res.ext.json(errInfo.getShareUrl.paramsError);
    }
    var shareModel = require('../mongodb/Model/shareModel.js');
    var TargetDataModel, refData, shareEntity, shareContent, idsArray;
    
    Promise.resolve()
        .then(function () {
            return shareModel.findOneAsync({"$or": [{"_id": params.shareId}, {"secretKey": params.shareKey}]});
        })
        .then(function (data) {
            if (!data) return Promise.reject(errInfo.share.notFind);
            var shareModeEnum = enums.shareModeEnum;
            shareEntity = data;
            shareContent = data.shareContent;
            switch (shareContent.mode) {
                case shareModeEnum.product:
                    TargetDataModel = require('../mongodb/Model/productModel.js');
                    break;
                case shareModeEnum.userInfo:
                    TargetDataModel = require('../mongodb/Model/userModel.js');
                    break;
                case shareModeEnum.photo:
                    TargetDataModel = require('../mongodb/Model/photoModel.js');
                    break;
                case shareModeEnum.video:
                    TargetDataModel = require('../mongodb/Model/videoModel.js');
                    break;
                default :
                    break;
            }
            if (!TargetDataModel) return Promise.reject(errInfo.share.paramsError);
            idsArray = shareContent.ids;
        })
        .then(function () {
            if (!shareEntity.shareSource) {

                shareEntity.shareSource = {
                    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress,
                    title: params.title || 'share',
                    terminal: params.token.t || '',
                    description: params.description || '',
                    platform: params.platform || ''
                };
            }
            shareEntity.shareCount++;
            shareEntity.save();
        })
        .then(function () {
            refData = {
                mode: shareContent.mode,
                data: []
            };
            var condition = {"_id": {"$in": idsArray}};
            if (shareContent.mode == shareModeEnum.photo) {
                condition.disabled = false;
            }
            return TargetDataModel.findAsync(condition)
                .then(function (targets) {
                    targets = targets || [];
                    return Promise.each(targets, function (target) {
                        console.log(target)
                        if (!target) return Promise.reject(errInfo.share.notFindTargetData);
                        var shareInfoList = target.shareInfo = target.shareInfo || [];
                        var position = -1;
                        for (var i = 0; i < shareInfoList.length; i++) {
                            if (shareInfoList[i].channel == input.platform) {
                                position = i;
                            }
                        }
                        if (position == -1) {
                            target.shareInfo.push({
                                sourceId: shareEntity._id,
                                sourceSecret: shareEntity.secretKey,
                                channel: input.platform,
                                count: 1
                            });
                        } else {
                            target.shareInfo[position].count += 1;
                        }
                        refData.data.push(target);
                        target.save();
                    });
                });
        })
        .then(function () {
            var result = {};
            if (params.getShareData) {
                result = refData;
            }
            var resultObj = errInfo.success;
            resultObj.result = result;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.share.promiseError);
            }
        });
}
exports.share = function (req, res, next) {
    share(req, res);
};

//分享图片
exports.getShareInfo = function (req, res, next) {
    var params = req.ext.params;
    params.getShareData = true;
    share(req, res, params, next);
}

exports.addCodeToUser = function (req, res, next) {
    var params = req.ext.params;
    if (!req.ext.checkExistProperty(params, 'customerId')) {
        return res.ext.json(errInfo.addCodeToUser.paramsError);
    }
    var customerId = params.customerId.trim() || '';
    customerId = customerId.toUpperCase().replace(/-/g, "");
//    customerId=customerId.replace('http://140.206.125.194:3001/downloadApp.html?','');
    var userId = params.token.userId;
    //判断customerId是否有效
    var cType = getCodeTypeByCode(customerId);
    if (cType != enums.codeType.photoPass && cType != enums.codeType.eventPass) {
        return res.ext.json(errInfo.addCodeToUser.invalidPP);
    }
    //如果codeType是PP，需要判断当前PP是否已经绑定到用户，已经绑定则不能再绑定
    async.auto({
        userExist: function (callback) {
            userModel.findById(userId, function (err, usr) {
                if (err) {
                    // log.error('addCodeToUser', err);
                    return callback(errInfo.addCodeToUser.userError);
                }
                if (usr) {
                    return callback(null, usr);
                } else {
                    return callback(errInfo.addCodeToUser.notFind);
                }
            })
        },
        hasBound: ['userExist', function (results, callback) {
            userModel.findOne({'customerIds.code': customerId, _id: userId}, {
                _id: 1,
                hiddenPPList: 1
            }, function (err, user) {
                if (err) {
                    // log.error('addCodeToUser', err);
                    return callback(errInfo.addCodeToUser.userError);
                }
                if (user) {
                    //恢复隐藏的PP
                    var pb = common.getArrayProperty('code', user.hiddenPPList, customerId);
                    if (pb == null) {
                        return callback(errInfo.PPRepeatBound);
                    } else {
                        userModel.update({_id: userId}, {$pull: {hiddenPPList: pb}}, function (err) {
                            if (err) {
                                // log.error('addCodeToUser', err);
                                return callback(errInfo.addCodeToUser.userUpdateError);
                            }
                            return callback(errInfo.success);
                        })
                    }
                }
                return callback(null, true);
            })
        }],
        updateUser: ['hasBound', function (results, callback) {
            userModel.findByIdAndUpdate(userId, {
                $addToSet: {
                    customerIds: {
                        code: customerId,
                        cType: cType
                    }
                }
            }, function (err) {
                if (err) {
                    // log.error('addCodeToUser', err);
                    return callback(errInfo.addCodeToUser.userUpdateError);
                }
                return callback(null, true);
            })
        }],
        addExceptPPPOrderHistory: ['updateUser', function (results , callback) {
            photoModel.find({'customerIds.code': customerId}, {}, function (err, list) {
                if (err) {
                    log.error('bindPPsToUser', err);
                    return callback(errInfo.addCodeToUser.photoError);
                }
                if (list && list.length > 0) {
                    var count = 0;
                    async.each(list, function (p) {
                        var orderHistory = [];
                        //将用户Id写入到卡号对应的userIds中
                        if (p.customerIds && p.customerIds.length > 0) {
                            for (var i = 0; i < p.customerIds.length; i++) {
                                if (p.customerIds[i].code == customerId) {
                                    if (!p.customerIds[i].userIds) {
                                        p.customerIds[i].userIds = [];
                                    }
                                    if (p.customerIds[i].userIds.indexOf(userId) == -1) {
                                        p.customerIds[i].userIds.push(userId);
                                    }
                                }
                            }
                        } else {
                            p.customerIds = [
                                {
                                    code: customerId,
                                    cType: cType,
                                    userIds: [userId]
                                }
                            ]
                        }
                        if (p.userIds.indexOf(userId) == -1) {
                            p.userIds.push(userId);
                        }
                        if (p.orderHistory && p.orderHistory.length > 0) {
                            for (var i = 0; i < p.orderHistory.length; i++) {
                                if (p.orderHistory[i].customerId == customerId && p.orderHistory[i].productId && p.orderHistory[i].productId.length > 0) {
                                    if (!p.orderHistory[i].userId) {
                                        p.orderHistory[i].userId = userId;
                                    } else {

                                        if (common.getObjByPropertiesFromArray([{
                                                field: "customerId",
                                                value: p.orderHistory[i].customerId
                                            },
                                                {field: "userId", value: userId},
                                                {field: "productId", value: p.orderHistory[i].productId}
                                            ], orderHistory) == null) {
                                            orderHistory.push({ //购买信息

                                                customerId: p.orderHistory[i].customerId,  //pp或ep的code

                                                productId: p.orderHistory[i].productId,  //对应产品Id（照片，杯子，钥匙扣）

                                                prepaidId: '',  //pp+的code

                                                userId: userId,  //用户Id

                                                createdOn: Date.now()  //创建时间

                                            })
                                        }

                                    }
                                }
                            }
                        }

                        p.orderHistory = p.orderHistory.concat(orderHistory);
                        p.modifiedOn = Date.now();
                        p.save(function (err) {
                            if (err) {
                                log.error('addCodeToUser', err);
                                return callback(errInfo.addCodeToUser.photoSaveError);
                            }
                            count++;
                            if (count == list.length) {
                                return callback(null, true);
                            }
                        })
                    })
                } else {
                    return callback(null);
                }
            })

        }]
    }, function (err, results) {
        if (err) {
            return res.ext.json(err);
        }
        return res.ext.json();
    });
}

exports.updateUser = function (req, res, next) {
    var params = req.ext.params;
    var userId = params.token.userId;
    Promise.resolve()
        .then(function(){
            return getUpdateUserInfo(params);
        })
        .then(function(result){
            if(result.status){
                return res.ext.json(result);
            }
            var updateInfo = result[0];
            var isEmail = result[1];
            var isMobile = result[2];
            if (isEmail || isMobile) {
                return userModel.findOneAsync({_id: userId.trim()})
                    .then(function(user){
                        if (user) {
                            if (user.userName == user.email && isEmail) {
                                return res.ext.json(errInfo.updateUser.denyUpdateRegister);
                            } else {
                                var conditions = {_id: {$ne: userId.trim()}};
                                if (isEmail) {
                                    conditions.email = updateInfo.email;
                                }
                                if (isMobile) {
                                    conditions.mobile = updateInfo.mobile;
                                }
                                userModel.findOneAsync(conditions)
                                    .then(function (user) {
                                        if (user) {
                                            if (isEmail) {
                                                return res.ext.json(errInfo.updateUser.existedEmail);
                                            } else if (isMobile) {
                                                return res.ext.json(errInfo.updateUser.existedMobile);
                                            }
                                        } else {
                                            userModel.findByIdAndUpdateAsync(userId.trim(), updateInfo)
                                                .then(function (ur) {
                                                    if(ur){
                                                        return res.ext.json();
                                                    }else {
                                                        return res.ext.json(errInfo.updateUser.notFind);
                                                    }
                                                })
                                                .catch(function(err){
                                                    console.log('findByIdAndUpdate', err);
                                                    return res.ext.json(errInfo.updateUser.userError);
                                                })
                                        }
                                    })
                                    .catch(function(err){
                                        console.log('findOne1', err);
                                        return res.ext.json(errInfo.updateUser.userError);
                                    });
                            }

                        } else {
                            return res.ext.json(errInfo.updateUser.notFind);
                        }
                })
                    .catch(function(err){
                        console.log('findOne2', err);
                        return res.ext.json(errInfo.updateUser.userError);
                    });

            } else {
                userModel.findByIdAndUpdateAsync(userId.trim(), updateInfo)
                    .then(function (ur) {
                        if(ur){
                            return res.ext.json();
                        }else {
                            return res.ext.json(errInfo.updateUser.notFind);
                        }
                    })
                    .catch(function(err){
                        console.log('findByIdAndUpdate', err);
                        return res.ext.json(errInfo.updateUser.userError);
                    });
            }
        })
        .catch(function (error) {
            console.log(error);
            return res.ext.json(errInfo.updateUser.promiseError);
        });
}

function getCodeTypeByCode(code, cb) {
//    var PPPTypes=['3','7','E','F','8','9','A','B','C','D'];
//     var cardTypes = JSON.parse(fs.readFileSync(__dirname + '/cardTypes.json'));
//     var PPPTypes = cardTypes.pppTypes.split(',');
//
//     var couponTypes = cardTypes.couponTypes.split(',');
    var PPPTypes = ['3','7','E','F','8','9','A','B','C','D','G','H','J','S','K','N','M'];
    var couponTypes = ['X','Y','Z','V'];
    code = code.toUpperCase().replace(/-/g, "");
    if(code=='7000000040448097'){
        return enums.codeType.invalid;
    }
    if(code.length==0){
        return enums.codeType.invalid;
    }
    var regNum=/^[0-9]*$/;
    if(regNum.exec(code)){
        return enums.codeType.photoPass;
    };
    if (code.length == 16) {
        var prefix = code.substring(0, 4);
        var cType = code.substr(5, 1);
        if (prefix == 'DPUP') {
            return enums.codeType.userPass;
        }
        else  if (prefix == 'DPPP' || cType == enums.codeTypeNum.photoPass) {
            return enums.codeType.photoPass;
        } else if (cType == enums.codeTypeNum.experienceCard) {
            return enums.codeType.experienceCard;
        }
        else if (prefix == 'DPEP' || cType == enums.codeTypeNum.eventPass) {
            return enums.codeType.eventPass;
        } else if (prefix == 'DPTP') {
            //disneyTicket门票
            return enums.codeType.photoPass;
        }
        else if (couponTypes.indexOf(cType) > -1) {
            return enums.codeType.coupon;
        }
        else if (prefix == 'DPVP' || PPPTypes.indexOf(cType) > -1) {
            return enums.codeType.photoPassPlus;
        } else {
            return enums.codeType.invalid;
        }


    } else if (code.length >= 8 && code.length < 32) {
        return enums.codeType.photoPass;
    } else {
        return enums.codeType.invalid;
    }
}

function getUpdateUserInfo(params) {
    var updateInfo = {};
    if (params.disabled == 1) {
        updateInfo.disabled = true;
    }
    if (params.disabled == 0) {
        updateInfo.disabled = false;
    }
    if (params.name && params.name.toString().trim() != '') {
        updateInfo.name = params.name.trim();
    }
    if (params.country && params.country.toString().trim() != '') {
        updateInfo.country = params.country.trim();
    }
    if (params.qq && params.qq.toString().trim() != '') {
        updateInfo.qq = params.qq.trim();
    }
    if (params.birthday && params.birthday.toString().trim() != '') {
        if (new Date(params.birthday.toString().trim()).toString() != "Invalid Date") {
            updateInfo.birthday = new Date(params.birthday.trim());
        } else {
            return errInfo.updateUser.birthdayError;
        }
    }
    if (params.gender && params.gender.toString().trim() != '') {
        if (params.gender.toString().trim() == 'male' || params.gender.toString().trim() == 'female') {
            updateInfo.gender = params.gender.trim();
        } else {
            return errInfo.updateUser.genderError;
        }
    }
    if (params.guideYear && common.isPositiveNumber(params.guideYear) != false) {
        updateInfo.guideYear = parseInt(params.guideYear);
    }

    if (params.IDCard) {
        updateInfo.IDCard = params.IDCard;
    }
    if (params.travelAgency) {
        updateInfo.travelAgency = params.travelAgency;
    }
    if (params.guideCard) {
        updateInfo.guideCard = params.guideCard;
    }
    if (params.alipayAccount) {
        updateInfo.alipayAccount = params.alipayAccount;
    }
    //steve 8.8
    if (params.systemMessagePush) {
        updateInfo.systemMessagePush = params.systemMessagePush;
    }
    var isEmail = false;
    if (params.email && params.email.trim() != '') {

        var regEmail = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
        if (!regEmail.exec(params.email.trim())) {
            return errInfo.updateUser.genderError;
        }
        isEmail = true;
        updateInfo.email = params.email.trim();
        updateInfo.email = updateInfo.email.toLowerCase();
    }
    var isMobile = false;
    if (params.mobile && params.mobile.trim() != '') {
        isMobile = true;
        updateInfo.mobile = params.mobile.trim();
    }

    return [updateInfo, isEmail, isMobile];
}

exports.contactUs = function (req, res, next) {
    var params = req.ext.params;
    var subject = 'contact us';
    var content = params.name + params.feedback;
    if(!req.ext.checkExistProperty(params, ['name', 'EmailAddress', 'parkName', 'feedback'])){
        return res.ext.json(errInfo.contactUs.paramsError);
    }
    Promise.resolve()
        .then(function () {
            return sendEmail(params.EmailAddress, subject, content);
        })
        .then(function () {
            //存入mongo
            var date = new Date();
            var contactMsg=new contactModel();
            contactMsg.name=params.name;
            contactMsg.EmailAddress=params.EmailAddress;
            contactMsg.subject=subject;
            contactMsg.content=content;
            contactMsg.parkName=params.parkName;
            contactMsg.createdBy=params.userId || params.token.userId || 'Guest';
            contactMsg.dataOfVisit=params.dataOfVisit || date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
            contactMsg.orderId=params.orderId || '';
            contactMsg.operatingSystem=params.operatingSystem || '';
            contactMsg.feedback=params.feedback;
            contactMsg.code=params.token ? params.token.lg : 'zh-cn';
            contactMsg.sendFrom=params.EmailAddress;
            contactMsg.sendTo="PictureAir.com";
            return contactMsg.save();
        })
        .then(function () {
            return res.ext.json();
        })
        .catch(function (error) {
            console.log(error);
            return res.ext.json(errInfo.contactUs.promiseError);
        })
}

exports.modifyUserPwd = function (req, res, next) {
    var params = req.ext.params;
    var audience = params.token.audience;
    if(!req.ext.checkExistProperty(params, ['oldPwd', 'newPwd']) || params.oldPwd == params.newPwd){
        return res.ext.json(errInfo.modifyUserPwd.paramsError);
    }
    Promise.resolve()
        .then(function () {
            //修改Mongo中的信息
            return userModel.findOneAsync({"_id": params.token.userId})
                .then(function (user) {
                    if(!user){
                        return Promise.reject(errInfo.modifyUserPwd.notFind);
                    }else {
                        return userModel.updateAsync({"password": params.newPwd});
                    }
                })
                .catch(function (err) {
                    return Promise.reject(errInfo.modifyUserPwd.userError);
                })
        })
        .then(function () {
            //修改redis中的信息
            return redisclient.get("access_token:"+audience)
                .then(function (data) {
                    if(params.oldPwd.length !== 32 || data.user.password !== params.oldPwd){
                        return Promise.reject(errInfo.modifyUserPwd.oldPwdError);
                    }else {
                        data.user.password = params.newPwd;
                        return data;
                    }
                })
                .then(function (data) {
                    return redisclient.set("access_token:"+audience, data);
                })
                .catch(function (err) {
                    return Promise.reject(errInfo.modifyUserPwd.redisError);
                })
        })

        .then(function () {
            return res.ext.json();
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                return res.ext.json(errInfo.modifyUserPwd.promiseError);
            }
        })
}