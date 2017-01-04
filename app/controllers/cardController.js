/**
 * Created by xueting-bo on 16/11/21.
 */
var async = require('async');
var errInfo = require('../resfilter/resInfo.js').errInfo;
var common = require('../tools/common.js');
var userModel = require('../mongodb/Model/userModel');
var photoModel = require('../mongodb/Model/photoModel');
var pppModel = require('../mongodb/Model/photoPassPlusModel');
var pppTypeModel = require('../mongodb/Model/photoPassPlusTypeModel');
var codeType = require('../tools/enums.js').codeType;
var util = require('../lib/util/util.js');
var filterPhoto = require('../resfilter/photo.js').filterPhoto;
var cardTools = require('../tools/cardTools.js');
var cardCodeModel = require('../mongodb/Model/cardCodeModel.js');
var redisclient=require('../redis/redis').redis;
var filterUserToredis=require('../rq.js').resfilter_user.filterUserToredis;

function getListByUserIdAndOType(oType, userId) {
    var result = [];
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
            if (collection && collection.length > 0) {
                var count = 0;
                var countType = {type: false};
                Promise.each(collection, function (ppp) {
                    ppp._doc.isExpired = false;
                    if (ppp.expiredOn && ppp.expiredOn < Date.now()) {
                        ppp._doc.isExpired = true;
                    }
                    ppp._doc.isUsed = false;
                    if (ppp.bindOn) {
                        ppp._doc.isUsed = true;
                    }
                    return pppTypeModel.findOneAsync({typeCode: ppp.PPPType})
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
                            if (count == collection.length){
                                result[0] = 1;
                                result[1] = collection;
                            }
                        })
                        .catch(function (err) {
                            return Promise.reject(errInfo.getCouponsByUserId.pppTypeError);
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
                    result[0] = 0;
                    result[1] = {couponList: list};
                } else {
                    result[0] = 0;
                    result[1] = {PPPList: collection};
                }
            }
        })
        .then(function () {
            var resultObj = errInfo.success;
            resultObj.result = {};
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
                            if ((util.customDateDiff('s', baklist[i].expiredOn, new Date()) / (24 * 60 * 60 )) < 30) {
                                expiredList.push(baklist[i]);
                            }
                            continue;
                        }
                        if (baklist[i]._doc.isExpired == false && baklist[i]._doc.isUsed) {
                            if ((util.customDateDiff('s', baklist[i].expiredOn, new Date()) / (24 * 60 * 60 )) < 30) {
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
                if(JSON.stringify(result[1]) !== '{}'){
                    resultObj.result = result[1];
                    return resultObj;
                }else {
                    return errInfo.getCouponsByUserId.countError;
                }
            }
        })
        .catch(function (error) {
            if(error.status){
                return error;
            }else {
                console.log(error);
                return errInfo.getCouponsByUserId.pppError;
            }
        });
}

//优惠券
exports.getCouponsByUserId = function (req, res, next) {
    var params = req.ext.params;
    Promise.resolve()
        .then(function () {
            return getListByUserIdAndOType(codeType.coupon, params.userId);
        })
        .then(function (result){
            return res.ext.json(result);
        })
        .catch(function (error) {
            return res.ext.json(errInfo.getCouponsByUserId.promiseError);
        });
}

//查询用户所拥有的卡
exports.getPPsByUserId = function (req, res, next) {
    var params = req.ext.params;
    var userId = params.userId;
    var PPList = [];    //白卡
    var PPPList = [];   //付费卡
    var customerIds, PPPCodes;

    userModel.findOneAsync({_id: userId}, {customerIds: 1, hiddenPPList: 1, _id: 0})
        .then(function (user) {
            if(!user){
                return Promise.reject(errInfo.getPPsByUserId.userError);
            }else {
                return user;
            }
        })
        .then(function (user) {
            user.customerIds ? customerIds = user.customerIds : customerIds = [];
            user.PPPCodes ? PPPCodes = user.PPPCodes : PPPCodes = [];
            return Promise.each(customerIds, function (csId) {
                return photoModel.findAsync({disabled: false, userIds: userId},
                    {"customerIds.code": csId.code, shootOn: 1}, {sort: {shootOn: -1},limit:875})
                    .then(function (list) {
                        var ppInfo = {};
                        var photos = [];
                        Promise.each(list, function (pto) {
                            console.log(pto);
                            var photo = new filterPhoto(pto);
                            photos.push(photo);
                        })
                        ppInfo.code = csId.code;
                        ppInfo.photos = photos;
                        PPList.push(ppInfo);
                    })
            })
        })
        .then(function () {
            return Promise.each(PPPCodes, function (ppp) {
                return photoModel.findAsync({disabled: false, userIds: userId},
                    {"orderHistory.prepaidId": ppp.PPPCode, shootOn: 1}, {sort: {shootOn: -1},limit:875})
                    .then(function (list) {
                        var pppInfo = {};
                        var photos = [];
                        Promise.each(list, function (pto) {
                            var photo = new filterPhoto(pto);
                            photos.push(photo);
                        });
                        pppInfo.code = ppp.PPPCode;
                        pppInfo.photos = photos;
                        PPPList.push(pppInfo);
                    });
            });
        })
        .then(function () {
            var resultObj = errInfo.success;
            resultObj.result = {};
            resultObj.result.PPList = PPList;
            resultObj.result.PPPList = PPPList;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.getPPsByUserId.pppError);
            }
        })
        

}

//解绑卡
exports.removePPFromUser = function (req, res, next) {
    var params = req.ext.params;
    if (!req.ext.checkExistProperty(params, 'customerId')) {
        return res.ext.json(errInfo.removePPFromUser.paramsError);
    }
    var userId = params.userId;
    var customerId = params.customerId;
    var cType = 'ppCard';
    var findObj;

    cardTools.validatePPType(customerId)
        .then(function (code) {
            if(!code){
                return Promise.reject(errInfo.removePPFromUser.invalidCode);
            }
        })
        .then(function () {
            return cardCodeModel.findOneAsync({PPPCode:customerId})
                .then(function (card) {
                    //付费卡
                    if(card){
                        cType = card.PPPType;
                        findObj = {_id: userId, 'pppCodes.code': customerId};
                        return card;
                    }else {
                        findObj = {_id: userId, 'customerIds.code': customerId};
                        return card;
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    return Promise.reject(errInfo.removePPFromUser.invalidCode);
                });
        })
        .then(function () {
            return userModel.findOneAsync(findObj)
                .then(function (user) {
                    if(user){
                        if(cType == 'ppCard'){
                            if(user.userPP == customerId){
                                return Promise.reject(errInfo.removePPFromUser.notRemove);
                            }else {
                                return userModel.findByIdAndUpdateAsync(userId, {$pull: {'customerIds': {code:customerId}}});
                            }
                        }else if(cType == 'OneDayPass'){
                            return userModel.findByIdAndUpdateAsync(userId, {$pull: {'pppCodes': {PPPCode:customerId}}});
                        }
                    }else {
                        return Promise.reject(errInfo.removePPFromUser.notFind);
                    }
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        return Promise.reject(errInfo.removePPFromUser.userError);
                    }
                });
        })
        // .then(function () {
        //     if(cType == 'ppCard'){
        //         return photoModel.findAsync({userIds: userId, "customerIds.code": customerId})
        //             .then(function (photos) {
        //                 if(photos && photos.length > 0){
        //                     return Promise.each(photos, function (pt) {
        //                         return photoModel.findByIdAndUpdateAsync(pt._id, {$pull: {'customerIds':{code:customerId}}})
        //                             // .then(function () {
        //                             //     return photoModel.findByIdAndUpdateAsync(pt._id, {$pull: {'customerIds': {userId: userId}}})
        //                             //         // .then(function (data) {
        //                             //         //     if(data.userIds.length == 0 && data.customerIds.length == 1){
        //                             //         //         return photoModel.removeAsync({_id: data._id});
        //                             //         //     }
        //                             //         // })
        //                             // })
        //                             .catch(function (err) {
        //                                 console.log(err);
        //                                 return Promise.reject(errInfo.removePPFromUser.photoError);
        //                             });
        //                     })
        //                 }
        //             })
        //             .catch(function (err) {
        //                 if(err.status){
        //                     return Promise.reject(err);
        //                 }else {
        //                     console.log(err);
        //                     return Promise.reject(errInfo.removePPFromUser.photoError);
        //                 }
        //             });
        //     }
        // })
        .then(function () {
            //更改缓存
            return userModel.findByIdAsync(userId)
                .then(function (user) {
                    var urInfo = new filterUserToredis(user);
                    return redisclient.set('access_token:'+ params.token.audience, JSON.stringify(urInfo));
                })
                .then(function () {
                    return res.ext.json();
                })
                .catch(function (err) {
                    console.log(err);
                    return Promise.reject(errInfo.removePPFromUser.redisError);
                })
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.removePPFromUser.promiseError);
            }
        });
}
