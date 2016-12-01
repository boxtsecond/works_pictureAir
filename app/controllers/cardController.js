/**
 * Created by xueting-bo on 16/11/21.
 */
var async = require('async');
var errInfo = require('../filters/errorFilter.js').errInfo;
var common = require('../tools/common.js');
var userModel = require('../mongodb/Model/userModel');
var photoModel = require('../mongodb/Model/photoModel');
var pppModel = require('../mongodb/Model/photoPassPlusModel');
var pppTypeModel = require('../mongodb/Model/photoPassPlusTypeModel');
var codeType = require('../tools/enums.js').codeType;
var pushMsgType = require('../tools/enums.js').pushMsgType;
var pppController = require('./photoPassPlusController.js');
var socketController = require('./socketController.js');
var pubScribeList = require('../tools/socketApi.js').pubScribeList;
var newError = require('../lib/util/util.js').newError;

exports.getCouponsByUserId = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.haveOwnproperty(params, 'userId')){
        res.ext.json(errInfo.getCouponsByUserId.paramsError);
    }
    Promise.resolve()
        .then(function () {
            return getListByUserIdAndOType(codeType.coupon, params.userId);
        })
        .then(function (result){
            return res.ext.json(result);
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }
            return res.ext.json(errInfo.getCouponsByUserId.promiseError);
        });
}

exports.getPPsByUserId = function (req, res, next) {
    var params = req.ext.params(req, res);
    if(!req.ext.haveOwnproperty(params, ['userId'])){
        res.ext.json(errInfo.getPPsByUserId.paramsError);
    }
    var userId = params.userId;
    async.auto({
        getPPList: function (callback) {
            userModel.findOne({_id: userId}, {customerIds: 1, hiddenPPList: 1, _id: 0}, function (err, user) {
                if (err) {
                    log.error('getPPsByUserId', err);
                    return callback(errInfo.getPPsByUserId.userError);
                }
                if (user && user.customerIds && user.customerIds.length > 0) {
                    return callback(null, user.customerIds, user.hiddenPPList);
                }
                return callback(null, []);
            })
        },
        getPhotoCount: ['getPPList', function (callback, results) {
            console.log('=================3');
            var customerIds = results.getPPList[0];
            var hiddenList = results.getPPList[1];
            if (hiddenList == null) {
                hiddenList = [];
            }
            if (customerIds == null) {
                customerIds = [];
            }

            console.log('=================2',customerIds.length,'***********',hiddenList.length,userId);
            photoModel.find({disabled: false, userIds: userId},
                {customerIds: 1, shootOn: 1}, {sort: {shootOn: -1},limit:875}, function (err, list) {
                    if (err) {
                        log.error('getPPsByUserId', err);
                        return callback(errInfo.getPPsByUserId.photoError);
                    }
                    var DateList = [];
                    var list2 = [];
                    var codeList = [];
                    //获取有图片数量的code-shootDate列表
                    for (var i = 0; i < list.length; i++) {
                        var date = list[i].shootOn.customFormat('yyyy-MM-dd');
                        for (var j = 0; j < list[i].customerIds.length; j++) {
                            if (common.checkExistByArrayProperty('code', customerIds, list[i].customerIds[j].code)) {
                                if (codeList.indexOf(list[i].customerIds[j].code) == -1) {
                                    codeList.push(list[i].customerIds[j].code);
                                }
                                if (DateList.indexOf(date + list[i].customerIds[j].code) == -1) {
                                    list2.push({
                                        data: 1,
                                        shootDate: date,
                                        code: list[i].customerIds[j].code,
                                        shootOn: list[i].shootOn
                                    });
                                    DateList.push(date + list[i].customerIds[j].code);

                                } else {
                                    list2[DateList.indexOf(date + list[i].customerIds[j].code)].data++;
                                }
                            }

                        }

                    }

                    var list = [];
                    list = list.concat(list2);

                    //将没有照片的code加入到列表中
                    for (var t = 0; t < customerIds.length; t++) {
                        if (codeList.indexOf(customerIds[t].code) == -1) {
                            codeList.push(customerIds[t].code);
                            list.push({
                                data: 0,
                                shootDate: '',
                                code: customerIds[t].code
                            })
                        }
                    }


                    var PPList = [];
                    var count = 0;
                    var isHidden = 0;
                    var emptyPPs = [];
                    async.each(list, function (item, callback) {
                        console.log('=================4');
                        pppModel.find({
                            bindInfo: {$elemMatch: {customerId: item.code, bindDate: item.shootDate}},
                            active: true
                        }, function (err2, ppplist) {
                            if (err2) {
                                log.error('getPPsByUserId', err2);
                                return callback(errInfo.getPPsByUserId.pppError);
                            }
                            var hiddenCondition = [
                                {field: 'code', value: item.code}
                            ];
                            if (common.getObjByPropertiesFromArray(hiddenCondition, hiddenList) == null) {
                                isHidden = 0;
                            } else {
                                isHidden = 1;
                            }

                            if (ppplist && ppplist.length > 0) {
                                if (item.data == 0) {
                                    emptyPPs.push({
                                        customerId: item.code,
                                        shootDate: item.shootDate,
                                        photoCount: item.data,
                                        isUpgrade: 1,
                                        isHidden: isHidden,
                                        shootOn: item.shootOn

                                    });
                                } else {
                                    PPList.push({
                                        customerId: item.code,
                                        shootDate: item.shootDate,
                                        photoCount: item.data,
                                        isUpgrade: 1,
                                        isHidden: isHidden,
                                        shootOn: item.shootOn

                                    });
                                }

                            } else {
                                if (item.data == 0) {
                                    emptyPPs.push({
                                        customerId: item.code,
                                        shootDate: item.shootDate,
                                        photoCount: item.data,
                                        isUpgrade: 0,
                                        isHidden: isHidden,
                                        shootOn: item.shootOn

                                    });
                                } else {
                                    PPList.push({
                                        customerId: item.code,
                                        shootDate: item.shootDate,
                                        photoCount: item.data,
                                        isUpgrade: 0,
                                        isHidden: isHidden,
                                        shootOn: item.shootOn

                                    });
                                }

                            }
                            count++;
                            if (count == list.length) {
                                return callback(1);
                            }

                        })
                    }, function (err) {
//                console.log(PPList);
                        PPList = PPList.sort(function (a, b) {
                            if (a.shootOn > b.shootOn) {
                                return -1;
                            }
                            if (a.shootOn < b.shootOn) {
                                return 1;
                            }
                            return 0;
                        });
                        PPList = PPList.concat(emptyPPs);
                        if (err == 1) {
                            return callback(null, PPList);
                        }
                        if (err) {
                            return callback(err);
                        }
                        return callback(null, PPList);
                    })

                });
        }]


    }, function (err, results) {
        if (err) {
            res.ext.json(err);
        }

        res.ext.json(errInfo.success);
    })
}

exports.removePPFromUser = function (req, res, next) {
    var params = req.ext.params(req, res);
    if (!req.haveOwnproperty(params, ['customerId'])) {
        res.ext.json(errInfo.removePPFromUser.paramsError);
    }
    var customerId = params.customerId.trim() || '';
    customerId = customerId.toUpperCase().replace(/-/g, "");
//    customerId=customerId.replace('http://140.206.125.194:3001/downloadApp.html?','');
    var userId = params.userId.trim() || '';
    //判断customerId是否有效
    var cType = pppController.getCodeTypeByCode(customerId);
    if (cType != codeType.photoPass && cType != codeType.eventPass) {
        res.ext.json(errInfo.removePPFromUser.paramsInvalid);
    }
    //如果codeType是PP，需要判断当前PP是否已经绑定到用户，已经绑定则不能再绑定
    async.auto({
        updateUserInfo: function (callback) {
            userModel.findById(userId, function (err, usr) {
                if (err) {
                    log.error('unBindCodeFromUser', err);
                    return callback(errInfo.removePPFromUser.userError);
                }
                if (usr) {
                    var index = -1;
                    for (var i = 0; i < usr.customerIds.length; i++) {
                        if (usr.customerIds[i].code == customerId) {
                            index = i;
                            break;
                        }
                    }
                    if (index != -1) {
                        usr.customerIds.splice(index, 1);
                        usr.save(function (err) {
                            if (err) {
                                log.error('unBindCodeFromUser', err);
                                return callback(errInfo.removePPFromUser.userActionError);
                            }
                            return callback(null, usr);

                        })
                    } else {
                        return callback(null, usr);
                    }

                } else {
                    return callback(errInfo.removePPFromUser.userActionError);
                }

            })
        },
        updatePPPInfo: ['updateUserInfo', function (callback, results) {
            //如果是eventPass就直接使用userPass
            var pp = customerId;
            //修改pp+中的bindInfo.userIds
            pppModel.update({'bindInfo.customerId': pp}, {
                $pull: {'bindInfo.$.userIds': userId},
                modifiedOn: Date.now(),
                modifiedBy: userId
            }, {multi: true}, function (err, n) {
                if (err) {
                    log.error('unBindCodeFromUser', err);
                    return callback(errInfo.removePPFromUser.pppError);
                }
                return callback(null, true);
            })

        }],
        updatePhotos: ['updatePPPInfo', function (callback, results) {

            //先将当前pp卡信息中的用户信息去掉,
            // db.photos.update({'customerIds.code':'DPUP05C534237990'},{$pull:{"customerIds.$.userIds":"575cecf1ae3b05c534237990"}},{multi:true})
            photoModel.update({'customerIds.code': customerId}, {$pull: {"customerIds.$.userIds": userId}}, {multi: true}, function (err, i) {
                    if(err){
                        log.error('unBindCodeFromUser', err);
                        return callback();
                    }
                    //再判断其他pp卡是否有用户信息,如果没有就删掉userIds中的userId,如果有,就不操作,写条件来修改
                    //db.photos.update({'customerIds.code':'DPUP05C534237990','customerIds.userIds':{$ne:'575cecf1ae3b05c534237990'}},{$pull:{userIds:"575cecf1ae3b05c534237990"}},{multi:true})
                    photoModel.update({'customerIds.code':customerId,'customerIds.userIds':{$ne:userId}},{$pull:{userIds:userId}},{multi:true}, function (err, i) {
                        if (err) {
                            log.error('unBindCodeFromUser', err);
                            return callback(errInfo.removePPFromUser.photoError);
                        }
                        return callback(null, true);
                    });

                }
            )

            //再判断其他pp卡是否有用户信息,如果没有就删掉userIds中的userId,如果有,就不操作,写条件来修改
            //db.photos.update({'customerIds.code':'DPUP05C534237990','customerIds.userIds':{$ne:'575cecf1ae3b05c534237990'}},{$pull:{userIds:"575cecf1ae3b05c534237990"}},{multi:true})
            /*
             photoModel.find({'customerIds.code': customerId}, function (err, list) {
             if (err) {
             log.error('unBindCodeFromUser', err);
             return callback(errInfo.errQueryPhoto);
             }
             var count = 0;
             async.each(list, function (item, cb) {
             item.userIds.splice(item.userIds.indexOf(userId), 1);
             for (var i = 0; i < item.customerIds.length; i++) {
             if (item.customerIds[i].code != customerId && item.customerIds[i].userIds.indexOf(userId) > -1) {
             item.userIds.push(userId);

             }
             if (item.customerIds[i].code == customerId && item.customerIds[i].userIds.indexOf(userId) > -1) {
             item.customerIds[i].userIds.splice(item.customerIds[i].userIds.indexOf(userId), 1);

             }
             }

             var orderHistory = [];
             for (var i = 0; i < item.orderHistory.length; i++) {
             if (!(item.orderHistory.userId == userId && item.orderHistory.customerId == customerId)) {
             orderHistory.push(item.orderHistory[i]);
             }
             }
             item.orderHistory = orderHistory;
             item.save(function (err) {
             if (err) {
             log.error('unBindCodeFromUser', err);
             return cb(errInfo.errUpdatePhoto);
             }
             count++;
             if (count == list.length) {

             return cb(true);

             }
             })

             }, function (err) {
             if (err == true) {
             return callback(null, true);
             } else {
             return callback(err);
             }
             })
             })
             */

        }],

        pushDelInfo: ["updatePhotos", function (callback, results) {
            socketController.pushToUsers(pushMsgType.delPhotos, [userId], pubScribeList.pushDelPhotos,
                {
                    customerId: customerId
                }, function () {
                    return callback(null, true);
                })
        }]

    }, function (err, results) {
        if (err) {
            res.ext.json(err);
        }
        res.ext.json(errInfo.success);
    });

}


function getListByUserIdAndOType(oType, userId) {
    return pppModel.findAsync({userId: userId, oType: oType}, {
        _id: 1,
        PPPCode: 1,
        capacity: 1,
        days: 1,
        bindInfo: 1,
        PPList: 1,
        bindOn: 1,
        expiredOn: 1,
        ownOn: 1,
        PPPType: 1,
        photoCount: 1,
        locationIds: 1,
        productIds: 1,
        effectiveOn: 1
    })
        .then(function (collection) {
            if (collection) {
                var count = 0;
                var countType = {type: false};
                return Promise.each(collection, function (ppp) {
                    ppp._doc.isExpired = false;
                    if (ppp.expiredOn && ppp.expiredOn < Date.now()) {
                        ppp._doc.isExpired = true;
                    }
                    ppp._doc.isUsed = false;
                    if (ppp.bindOn) {
                        ppp._doc.isUsed = true;
                    }
                    pppTypeModel.findOneAsync({typeCode: ppp.PPPType})
                        .then(function (pType) {
                            if (pType && pType.cardBg && pType.cardBg.url) {
                                ppp._doc.cardBg = pType.cardBg.url;
                            }
                            if (pType && pType.codeName) {
                                ppp._doc.codeName = pType.codeName;
                            }
                            if (pType && pType.codeDesc) {
                                ppp._doc.codeDesc = pType.codeDesc;
                            }
                            count++;
                            if (count == collection.length) {
                                flag = 1;
                            }
                            return [flag, collection];
                        })
                        .catch(function (err) {
                            throw new newError(JSON.stringify(errInfo.getCouponsByUserId.pppTypeError));
                        });
                })
            }else {
                if (oType == codeType.coupon) {
                    var baklist = collection.sort(function (a, b) {
                        if (a.ownOn > b.ownOn) {
                            return 1;
                        }
                        if (a.ownOn < b.ownOn) {
                            return -1;
                        }
                        return 0;
                    })
                    var usedList = [];
                    var expiredList = [];
                    var list = [];
                    for (var i = 0; i < baklist.length; i++) {
                        if (baklist[i]._doc.isExpired && baklist[i].bindOn == null) {
                            expiredList.push(baklist[i]);
                            continue;
                        }
                        if (baklist[i]._doc.isExpired == false && baklist[i].bindOn != null) {
                            usedList.push(baklist[i]);
                            continue;
                        }
                        list.push(baklist[i]);

                    }
                    list = list.concat(usedList);
                    list = list.concat(expiredList);
                    console.log('******************');
                    console.log(list);

                    return [false, {result: {couponList: list}}];
                    // return cb(null, {couponList: collection});
//                    return response(res, errInfo.ok.code, '', {couponList: collection});
                } else {
//                    return response(res, errInfo.ok.code, '', {PPPList: collection});
                    return [0, {result: {PPPList: collection}}];
                }
            }
        })
        .then(function (result) {
            var resultObj = errInfo.success;
            if(result[0]){
                if (oType == codeType.coupon) {
//                            return response(res, errInfo.ok.code, '', {couponList: collection});
                    var baklist = (result[1]).sort(function (a, b) {
                        if (a.ownOn > b.ownOn) {
                            return -1;
                        }
                        if (a.ownOn < b.ownOn) {
                            return 1;
                        }
                        return 0;
                    })
                    var usedList = [];
                    var expiredList = [];
                    var list = [];
                    for (var i = 0; i < baklist.length; i++) {
                        if (baklist[i]._doc.isExpired) {
                            if ((baklist[i].expiredOn.customDateDiff('s', new Date()) / (24 * 60 * 60 )) < 30) {
                                expiredList.push(baklist[i]);
                            }
                            continue;
                        }
                        if (baklist[i]._doc.isExpired == false && baklist[i]._doc.isUsed) {
                            if ((baklist[i].bindOn.customDateDiff('s', new Date()) / (24 * 60 * 60 )) < 30) {
                                usedList.push(baklist[i]);
                            }
                            continue;
                        }
                        list.push(baklist[i]);

                    }
                    list = list.concat(usedList);
                    list = list.concat(expiredList);

                    resultObj.result = {couponList: list};
                } else {
                    resultObj.result = {PPPList: result[1]};
                }
                return resultObj;
            }else {
                if(result[1].result){
                    resultObj.result = result[1].result;
                    return resultObj;
                }
                return errInfo.getCouponsByUserId.countError;
            }
        })
        .catch(function (error) {
            if(error.name == errInfo.errorType){
                return JSON.parse(error.message);
            }else {
                console.log(error);
                return errInfo.getCouponsByUserId.pppError;
            }
        });
}