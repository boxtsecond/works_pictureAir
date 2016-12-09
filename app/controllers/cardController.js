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
var pushMsgType = require('../tools/enums.js').pushMsgType;
var pppController = require('./photoPassPlusController.js');
var socketController = require('./socketController.js');
var pubScribeList = require('../tools/socketApi.js').pubScribeList;
var util = require('../lib/util/util.js');

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
    var PPList = [];
    var emptyPPs = [];
    var flag = false;

    Promise.resolve()
        .then(function () {
            return userModel.findOneAsync({_id: userId}, {customerIds: 1, hiddenPPList: 1, _id: 0})
                .then(function (user) {
                    if (user && user.customerIds && user.customerIds.length > 0) {
                        return [user.customerIds, user.hiddenPPList];
                    }else {
                        return Promise.reject(errInfo.getPPsByUserId.userError);
                    }
                })
                .catch(function (err) {
                    return Promise.reject(errInfo.getPPsByUserId.userError);
                });
            })
        .then(function (result) {
            var customerIds = result[0];
            var hiddenList = result[1];
            if (hiddenList == null) {
                hiddenList = [];
            }
            if (customerIds == null) {
                customerIds = [];
            }
            return photoModel.findAsync({disabled: false, userIds: userId},
                {customerIds: 1, shootOn: 1}, {sort: {shootOn: -1},limit:875})
                .then(function (list) {
                    var DateList = [];
                    var list2 = [];
                    var codeList = [];
                    //获取有图片数量的code-shootDate列表
                    for (var i = 0; i < list.length; i++) {
                        var date = util.customFormat(list[i].shootOn, 'yyyy-MM-dd');
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


                    var count = 0;
                    var isHidden = 0;


                    return Promise.each(list, function (item) {
                        return pppModel.findAsync({
                            bindInfo: {$elemMatch: {customerId: item.code, bindDate: item.shootDate}},
                            active: true})
                            .then(function (ppplist) {
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
                                    flag = true;
                                }
                            })
                            .catch(function (err) {
                                console.log(err);
                                return Promise.reject(errInfo.getPPsByUserId.pppError);
                            })
                    })
                })
                .then(function () {
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
                })
        })
        .then(function () {
            var resultObj = errInfo.success;
            resultObj.result = {};
            resultObj.result.PPList = PPList;
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
    var userId = params.userId;
    if (!req.ext.checkExistProperty(params, ['customerId'])) {
        res.ext.json(errInfo.removePPFromUser.paramsError);
    }
    var customerId = params.customerId.trim() || '';
    customerId = customerId.toUpperCase().replace(/-/g, "");
//    customerId=customerId.replace('http://140.206.125.194:3001/downloadApp.html?','');
    //判断customerId是否有效
    var cType = pppController.getCodeTypeByCode(customerId);
    if (cType != codeType.photoPass && cType != codeType.eventPass) {
        res.ext.json(errInfo.removePPFromUser.paramsInvalid);
    }
    //如果codeType是PP，需要判断当前PP是否已经绑定到用户，已经绑定则不能再绑定
    Promise.resolve()
        .then(function () {
            return userModel.findByIdAsync(userId);
        })
        .then(function (usr) {
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
                    usr.save();
                    return usr;
                } else {
                    return usr;
                }
            } else {
                return Promise.reject(errInfo.removePPFromUser.notFind)
            }
        })
        .then(function (usr) {
            var pp = customerId;
            return pppModel.updateAsync({'bindInfo.customerId': pp}, {
                $pull: {'bindInfo.$.userIds': userId},
                modifiedOn: Date.now(),
                modifiedBy: userId
            }, {multi: true});
        })
        .then(function () {
            return photoModel.updateAsync({'customerIds.code': customerId}, {$pull: {"customerIds.$.userIds": userId}}, {multi: true})
                        .then(function () {
                            return photoModel.updateAsync({'customerIds.code':customerId,'customerIds.userIds':{$ne:userId}},{$pull:{userIds:userId}},{multi:true});
                        })
                        .catch(function (err) {
                            console.log('update', err);
                            return Promise.reject(errInfo.removePPFromUser.photoError);
                        });
                })
        .then(function () {
            return socketController.pushToUsers(pushMsgType.delPhotos, [userId], pubScribeList.pushDelPhotos,
                {
                    customerId: customerId
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
                return res.ext.json(errInfo.removePPFromUser.promiseError);
            }
        });
}

