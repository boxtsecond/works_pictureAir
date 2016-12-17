/**
 * Created by xueting-bo on 16/11/23.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;
var shareModeEnum = require('../tools/enums.js').shareModeEnum;
var config = require('../../config/config.js').config;
var util = require('../lib/util/util.js');
var rq = require('../rq.js');
var Promise = require('bluebird');
var enums = require('../tools/enums.js');
var userModel = require('../mongodb/Model/userModel.js');
var contactModel = require('../mongodb/Model/contactModel.js');
var cardCodeModel = require('../mongodb/Model/cardCodeModel.js');
var photoModel = require('../mongodb/Model/photoModel.js');
var async = require('async');
var common = require('../tools/common.js');
var sendEmail = require('../tools/sendMsg.js').sendEmailTO;
var filterUserToredis=require('../rq.js').resfilter_user.filterUserToredis;
var redisclient=require('../redis/redis').redis;
var cardTools = require('../tools/cardTools.js');
var verifyreg=require('../rq.js').verifyreg;
var filterCard = require('../resfilter/card.js');

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
                "userId": params.userId,
                "key": key,
                "ids": shareContent.ids
            })
            fullUrl = url.resolve(config.serverIP, 'f/share?'+ urlParams);
            secretKey = util.shortUrlGenerate(fullUrl);
        })
        .then(function(){
            if (!targetDataModel) {
                return Promise.reject(errInfo.getShareUrl.paramsError);
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
            return shareModel.findOneAsync({"sharerId": params.userId, "shareContent.ids": shareContent.ids.split(",")});
        })
        .then(function (shareData) {
            var info = {};
            if (shareData) {
                info.shareId = shareData._id;
                info.shareUrl = (params.isUseShortUrl) ? shareData.shareShortUrl : shareData.shareUrl;
                return info;
            }else {
                shareData = new shareModel({
                    shareDomain: config.serverIP,
                    sharerId: params.userId,
                    shareUrl: fullUrl,
                    shareShortUrl: url.resolve(config.serverIP, 'f/share/' + secretKey),
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
                return info;
            }

        })
        .then(function (result) {
            var resultObj = errInfo.success;
            resultObj.result = {};
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

exports.getShareInfoByFullUrl = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, ['userId', 'key', 'ids'])){
        return res.ext.json(errInfo.getShareUrl.paramsError);
    }
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

//激活（购买）卡
//SN 验证码        customerId 被激活卡的卡号      cardId 激活卡的卡号
exports.activeCodeToUser = function (req, res, next) {
    var params = req.ext.params;
    if (!req.ext.checkExistProperty(params, ['customerId', 'userId', 'cardId'])) {
        return res.ext.json(errInfo.activeCodeToUser.paramsError);
    }
    var customerId = params.customerId;
    customerId = customerId.toUpperCase().replace(/-/g, "");
    var userId = params.userId;
    var cardType, flag = {exist: false, needActive: false};
    var updateInfo = [];

    //验证卡是否有效
    cardTools.validatePPType(params.cardId)
        .then(function (card) {
            if(!card){
                return Promise.reject(errInfo.activeCodeToUser.invalidCard);
            }else {
                return cardCodeModel.findOneAsync({PPPCode: params.cardId})
                    .then(function (obj) {
                        if (!obj) return Promise.reject(errInfo.activeCodeToUser.invalidCard);
                        else if(obj.active) return Promise.reject(errInfo.activeCodeToUser.repeatBound);
                        else if (!obj.active && (obj.expiredOn - new Date() > 0)) {
                            return obj;
                        } else return Promise.reject(errInfo.activeCodeToUser.invalidCard);
                    })
                    .catch(function (err) {
                        if(err.status){
                            return Promise.reject(err);
                        }else {
                            return Promise.reject(errInfo.activeCodeToUser.invalidCard);
                        }
                    })
            }
        })
        .then(function (obj) {
            cardType = obj.PPPType;
            //修改用户信息
            return userModel.findByIdAsync(userId)
                .then(function (user) {
                    if (!user) {
                        return Promise.reject(errInfo.activeCodeToUser.notFind);
                    } else {
                        if (user.pppCodes && user.pppCodes.length > 0) {
                            return Promise.each(user.pppCodes, function (code) {
                                if (code.PPPCode == params.cardId) {
                                    flag.exist = true;
                                    if (!code.active) {
                                        code.active = true;
                                        flag.needActive = true;
                                    }
                                }
                                updateInfo.push(code);
                            });
                        }
                    }
                })
                .then(function () {
                    //没有绑定直接激活
                    if (!flag.exist) {
                        var saveInfo = new filterCard.filterPPPCardToUserDB(obj);
                        saveInfo.active = true;
                        var updateObj = {$push: {pppCodes: saveInfo}};
                        updateObj.modifiedOn = Date.now();
                        return userModel.findByIdAndUpdateAsync(userId, updateObj)
                            .catch(function (err) {
                                console.log(err);
                                return Promise.reject(errInfo.activeCodeToUser.userUpdateError);
                            });
                    } else if (flag.needActive) {
                        return userModel.findByIdAndUpdateAsync(userId, {pppCodes: updateInfo})
                            .catch(function (err) {
                                console.log(err);
                                return Promise.reject(errInfo.activeCodeToUser.userUpdateError);
                            });
                    }
                })
                .catch(function (err) {
                    if (err.status) {
                        return Promise.reject(err);
                    } else {
                        return Promise.reject(errInfo.activeCodeToUser.userError);
                    }
                })
        })
        .then(function () {
            //修改照片信息
            return photoModel.findAsync({'customerIds.code': customerId, 'userIds':userId})
                .then(function (list) {
                    if (list && list.length > 0) {
                        return Promise.each(list, function (photo) {
                            return Promise.resolve()
                                .then(function () {
                                    //更改 photo.orderHistory
                                    if (photo.orderHistory && photo.orderHistory.length > 0) {
                                        return Promise.each(photo.orderHistory, function (odh) {
                                            // tips: && odh.productId
                                            if(odh.prepaidId == params.cardId){
                                                return Promise.reject(errInfo.activeCodeToUser.repeatBound);
                                            }
                                        });
                                    }
                                })
                                .then(function () {
                                    var photoId = photo._id;
                                    var newOrderHistory = { //购买信息
                                        customerId: params.customerId,  //被激活卡 code
                                        productId: params.productId ? params.productId : 'photo',  //对应产品Id（照片，杯子，钥匙扣）
                                        prepaidId: params.cardId,  //激活卡 code
                                        userId: userId,  //用户Id
                                        createdOn: Date.now()  //创建时间
                                    };
                                    return photoModel.findByIdAndUpdateAsync(photoId, {$push:{orderHistory:newOrderHistory}});
                                })
                        });
                    }
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        return Promise.reject(errInfo.activeCodeToUser.photoSaveError);
                    }
                });
        })
        .then(function () {
            //更新缓存
            return userModel.findByIdAsync(userId)
                .then(function (user) {
                    var update = new filterUserToredis(user);
                    return redisclient.set('access_token:'+req.ext.md5(user.userName), JSON.stringify(update));
                })
                .catch(function (err) {
                    console.log(err);
                    return Promise.reject(errInfo.activeCodeToUser.userError);
                })
        })
        .then(function () {
            //修改卡状态(激活)
            return Promise.resolve()
                .then(function () {
                    return cardTools.activeCard(params.cardId, userId);
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        return Promise.reject(errInfo.activeCodeToUser.invalidCard);
                    }
                })
        })
        .then(function () {
            return res.ext.json();
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.activeCodeToUser.promiseError);
            }
        });
}

//修改用户信息
exports.updateUser = function (req, res, next) {
    var params = req.ext.params;
    if (!req.ext.checkExistProperty(params, ['userName', 'userId'])) {
        return res.ext.json(errInfo.updateUser.paramsError);
    }
    var userId = params.userId;
    var userName = params.userName;

    Promise.resolve()
        .then(function () {
            var result={
                isEmail:false,
                isMobile:false
            };
            if(verifyreg.isEmail(userName.trim().toLowerCase())){
                result.isEmail=true; return result;
            }
            else if(verifyreg.isMobile(userName.trim().toLowerCase())) {
                result.isMobile = true;
                return result;
            }
        })
        .then(function(pms){
            if(pms.isEmail){
                params.isEmail = true;
            }
            if(pms.isMobile){
                params.isMobile = true;
            }
            return getUpdateUserInfo(params);
        })
        .then(function(result){
            if(result.status){
                return Promise.reject(result);
            }
            var updateInfo = result;
            return userModel.findByIdAndUpdateAsync(userId, updateInfo)
                .then(function (ur) {
                    if(!ur){
                        return Promise.reject(errInfo.updateUser.notFind);
                    }
                })
                .catch(function(err){
                    console.log(err);
                    return Promise.reject(errInfo.updateUser.userError);
                });
        })
        .then(function () {
            return userModel.findByIdAsync(userId)
                .then(function (ur) {
                    var user = new filterUserToredis(ur);
                    var md5Useranme =req.ext.md5(userName);
                    return redisclient.set("access_token:"+md5Useranme, JSON.stringify(user));
                })
        })
        .then(function () {
            return res.ext.json();
        })
        .catch(function (error) {
            console.log(error);
            if(error.status){
                return res.ext.json(error);
            }else {
                return res.ext.json(errInfo.updateUser.promiseError);
            }
        });
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
    if (params.birthday && params.birthday.toString() != '') {
        if (rq.verifyreg.verifyDateStr(params.birthday)) {
            updateInfo.birthday = rq.util.convertStrToDate(params.birthday);
        } else {
            return errInfo.updateUser.birthdayError;
        }
    }
    if (params.gender && params.gender.toString().trim() != '') {
        if (params.gender == -1 || params.gender == 0 || params.gender == 1) {
            updateInfo.gender = params.gender;
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
    if (params.email && params.email.trim() != '') {
        if(params.isMobile){
            var regEmail = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
            if (!regEmail.exec(params.email.trim())) {
                return errInfo.updateUser.emailError;
            }
            updateInfo.email = params.email.trim();
            updateInfo.email = updateInfo.email.toLowerCase();
        }else {
            return errInfo.updateUser.updateEmailError;
        }
    }
    if (params.mobile && params.mobile.trim() != '') {
        if(params.isEmail){
            updateInfo.mobile = params.mobile.trim();
        }else {
            return errInfo.updateUser.updateMobileError;
        }
    }

    return updateInfo;
}

//联系我们
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
            contactMsg.createdBy=params.userId || 'Guest';
            contactMsg.dataOfVisit=rq.util.convertStrToDate(params.dataOfVisit);
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

//修改用户密码
exports.modifyUserPwd = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, ['oldPwd', 'newPwd'])){
        return res.ext.json(errInfo.modifyUserPwd.paramsError);
    }
    if(params.oldPwd == params.newPwd){
        return res.ext.json(errInfo.modifyUserPwd);
    }
    Promise.resolve()
        .then(function () {
            //修改Mongo中的信息
            return userModel.findByIdAsync(params.userId)
                .then(function (user) {
                    if(!user){
                        return Promise.reject(errInfo.modifyUserPwd.notFind);
                    }else {
                        if(params.oldPwd.length !== 32 || params.newPwd.length !== 32 || user.password !== params.oldPwd){
                            return Promise.reject(errInfo.modifyUserPwd.oldPwdError);
                        }else {
                            return userModel.updateAsync({"_id": params.userId}, {"password": params.newPwd})
                                .then(function () {
                                    return user;
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    return Promise.reject(errInfo.modifyUserPwd.userError);
                                });
                        }
                    }
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        console.log(err);
                        return Promise.reject(errInfo.modifyUserPwd.userError);
                    }
                })
        })
        .then(function (user) {
            //修改redis中的信息
            var audience = params.token.audience;
            console.log(audience)
            return redisclient.set("access_token:"+audience, filterUserToredis(user))
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
                console.log(error);
                return res.ext.json(errInfo.modifyUserPwd.promiseError);
            }
        })
}

//绑定卡
exports.addCodeToUser = function (req, res, next) {
    var params = req.ext.params;
    if (!req.ext.checkExistProperty(params, ['customerId', 'userId'])) {
        return res.ext.json(errInfo.addCodeToUser.paramsError);
    }
    var customerId = params.customerId;
    var userId = params.userId;
    var cType = 'ppCard';
    var findPhotoObj = {};
    var flag;

    //验证卡是否有效
    cardTools.validatePPType(customerId)
        .then(function (code) {
            if(!code){
                return Promise.reject(errInfo.addCodeToUser.invalidCode);
            }
        })
        .then(function () {
            return cardCodeModel.findOneAsync({PPPCode:customerId})
                .then(function (card) {
                    //绑定付费卡
                    if(card){
                        cType = card.PPPType;
                        return card;
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    return Promise.reject(errInfo.addCodeToUser.invalidCode);
                });
        })
        .then(function (card) {
            if(cType === 'ppCard'){
                //白卡绑定到用户
                findPhotoObj = {'customerIds.code': customerId};
                return userModel.findByIdAsync(userId)
                    .then(function (user) {
                        if(user){
                            if(user.customerIds && user.customerIds.length > 0){
                                return Promise.each(user.customerIds, function (cst) {
                                    if(cst.code == customerId){
                                        flag = true;
                                    }
                                });
                            }
                        }else {
                            return Promise.reject(errInfo.addCodeToUser.notFind);
                        }
                    })
                    .then(function () {
                        if(flag){
                            return Promise.reject(errInfo.addCodeToUser.repeatBound);
                        }else {
                            var updateObj = {$push: {customerIds:[]}};
                            var newCustomerIds = {
                                code: customerId
                            };
                            updateObj.$push.customerIds = newCustomerIds
                            updateObj.modifiedOn = Date.now();
                            return userModel.findByIdAndUpdateAsync(userId, updateObj);
                        }
                    })
                    .catch(function (err) {
                        if(err.status){
                            return Promise.reject(err);
                        }else {
                            console.log(err);
                            return Promise.reject(errInfo.addCodeToUser.userError);
                        }
                    })
            }else {
                //付费卡绑定到用户
                findPhotoObj = {'pppCodes.code': customerId};
                var cardInfo = new filterCard.filterPPPCardToUserDB(card);
                return userModel.findByIdAsync(userId)
                    .then(function (user) {
                        if(user){
                            if(user.pppCodes && user.pppCodes.length > 0){
                                return Promise.each(user.pppCodes, function (code) {
                                    if(customerId == code.PPPCode){
                                        flag = true;
                                    }
                                })
                            }
                        }else {
                            return Promise.reject(errInfo.addCodeToUser.notFind);
                        }
                    })
                    .then(function () {
                        if(flag){
                            return Promise.reject(errInfo.addCodeToUser.repeatBound);
                        }else {
                            var updateObj = {$push:{pppCodes: cardInfo}};
                            updateObj.modifiedOn = Date.now();
                            return userModel.findByIdAndUpdateAsync(userId, updateObj);
                        }
                    })
                    .catch(function (err) {
                        if(err.status){
                            return Promise.reject(err);
                        }else {
                            console.log(err);
                            return Promise.reject(errInfo.addCodeToUser.userError);
                        }
                    })
            }
        })
        .then(function () {
            //修改照片信息
            return photoModel.findAsync(findPhotoObj)
                .then(function (photoList) {
                    if(photoList && photoList.length > 0){
                        if(cType == 'ppCard'){
                            return Promise.mapSeries(photoList, function (photo) {
                                var userIds = [];
                                return Promise.resolve()
                                    .then(function () {
                                        return Promise.each(photo.customerIds, function (pt) {
                                            pt.userIds.length > 0 ? userIds = pt.userIds : userIds = [];
                                            return Promise.each(pt.userIds, function (ptid) {
                                                if (ptid == userId) {
                                                    return Promise.reject(errInfo.addCodeToUser.repeatBound);
                                                }
                                            });
                                        });
                                    })
                                    .then(function () {
                                        userIds.push(userId);
                                        photo.customerIds = [
                                            {
                                                code: customerId,
                                                //cType: params.cType ? params.cType : 'photoPass',
                                                userIds: userIds
                                            }
                                        ];
                                        photo.userIds = userIds;
                                        photo.modifiedOn = Date.now();
                                        photo.save();
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                        return Promise.reject(errInfo.addCodeToUser.promiseError);
                                    });

                            });
                        }else if(cType == 'pppCard'){
                            return Promise.mapSeries(photoList, function (photo) {
                                //var userIds = [];
                                return Promise.resolve()
                                    .then(function () {
                                        return Promise.each(photo.orderHistory, function (pt) {
                                            if(pt.userId == userId){
                                                return Promise.reject(errInfo.addCodeToUser.repeatBound);
                                            }
                                        });
                                    })
                                    .then(function () {
                                        photo.modifiedOn = Date.now();
                                        photo.orderHistory = [
                                            {
                                                prepaidId: customerId,
                                                productId: params.productId ? params.productId : 'photo',
                                                userIds: userId,
                                                createdOn: Date.now()
                                            }
                                        ];
                                        photo.save();
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                        return Promise.reject(errInfo.addCodeToUser.promiseError);
                                    })
                            });
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        console.log(err);
                        return Promise.reject(errInfo.addCodeToUser.promiseError);
                    }
                })
        })
        .then(function () {
            return userModel.findById(userId)
                .then(function (ur) {
                    var user = new filterUserToredis(ur);
                    var md5Useranme =req.ext.md5(ur.userName);
                    return redisclient.set("access_token:"+md5Useranme, JSON.stringify(user));
                })
        })
        .then(function () {
            var resultObj = errInfo.success;
            resultObj.result = {};
            resultObj.result.cType = cType;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.addCodeToUser.promiseError);
            }
        })
}
