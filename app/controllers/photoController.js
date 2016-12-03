/**
 * Created by xueting-bo on 16/11/17.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;
var photoModel = require('../mongodb/Model/photoModel');
var userModel = require('../mongodb/Model/userModel');
var common = require('../tools/common.js');
var async = require('async');
var socketController = require('../controllers/socketController.js');
var pushMsgType = require('../tools/enums.js').pushMsgType;
var pubScribeList = require('../tools/socketApi.js').pubScribeList;
var config = require('../../config/config.js').config;
var request = require('request');
var utilFun = require('../lib/util/util.js');
var enums = require('../tools/enums.js');

/* Bo 查询图片
 * @param {condition type: Array} 查询条件
 * must have [locationId, userId]
 * */
exports.getPhotosByConditions = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.haveOwnproperty(params, params.conditon)){
        return res.ext.json(errInfo.getPhotosByConditions.paramsError);
    }
    var conditions = getCondition(params);
    var options = getOptions(params);
    var fields = {
        presetId: 1,
        customerIds: 1,
        photoCode: 1,
        userIds: 1,
        // name: 1,
        shootOn: 1,
        extractOn: 1,
        description: 1,
        downloadCount: 1,
        visitedCount: 1,
        shareInfo: 1,
        editCount: 1,
        likeCount: 1,
        orderHistory: 1,
        comments: 1,
        //  albumId: 1,
        //  tagBy: 1,
        originalInfo: 1,
        thumbnailTypes: 1,
        thumbnail: 1,
        //GPS: 1,
        locationId: 1,
        parentId: 1,
        disabled: 1,
        //rawFileName: 1,
        isFree: 1,
        isVIP: 1,
        targetPoint: 1,
        allowDownload: 1,
        // engineInfo: 1,
        // tokenBy: 1,
        siteId: 1,
        createdBy: 1,
        // modifiedBy: 1,
        // createdOn: 1,
        modifiedOn: 1,
        mobileEditActive: 1,
        mimeType: 1,
        bundleWithPPP: 1,
        adInfo: 1
    }
    var paidCondition = false;
    var isPaid = false;
    if(params.isPaid || params.isPaid == 0){
        paidCondition = true;
        if(params.isPaid == 0){
            isPaid = false;
        }else if(params.isPaid == 1){
            isPaid = true;
        }
    }
    var t = new Date().getTime();
    var locationStockMedia = config.locationStockMedia;
    var userId = params.userId || '';

    photoModel.findAsync(conditions, fields, options)
        .then(function (list) {
            var result = [];
            var pps = [];
            var resultObj = errInfo.success;
            if (list && list.length > 0) {
                userModel.findById(userId, {likePhotos: 1, favoritePhotos: 1})
                    .then(function (user) {
                    if (user != null) {
                        for (var i = 0; i < list.length; i++) {
                            list[i]._doc.strShootOn = utilFun.customFormat(list[i].shootOn, 'yyyy-MM-dd hh:mm:ss');
                            list[i]._doc.shootDate = utilFun.customFormat(list[i].shootOn, 'yyyy-MM-dd');
                            list[i]._doc.isPaid = common.checkExistByArrayProperty('userId', list[i].orderHistory, userId);
                            if (list[i]._doc.isFree == true) {
                                list[i]._doc.isPaid = true;
                            }
                            //防盗操作:
                            list[i].thumbnail.x1024.path = '';
                            list[i].thumbnail.x512.path = '';
                            list[i].thumbnail.x128.path = '';
                            list[i].originalInfo.path = '';
                            list[i].originalInfo.originalName = '';
                            //新增文件类型 steve
                            // list[i].mimeType = list[i].mimeType;
                            // list[i].bundleWithPPP

                            // if (list[i]._doc.isFree == false && list[i]._doc.isPaid == false && req.query.terminal != enums.terminal.android && req.query.terminal != enums.terminal.ios) {
                            list[i]._doc.enImage = false;
                            //true 已经加密了,需要解密,网页加模糊处理

                            //手机端
                            if (list[i]._doc.isFree == false && list[i]._doc.isPaid == false
                                && (params.terminal == enums.terminal.android || params.terminal == enums.terminal.ios)
                            ) {

                                if (list[i].mimeType == 'mp4') {
                                    //视频处理
                                    list[i].thumbnail.x1024 = list[i].thumbnail.x512;
                                } else {
                                    //如果加密图片存在,则未付款的预览图手机端返回加密图,否则返回512图片
                                    if (list[i].thumbnail.en1024) {
                                        list[i]._doc.enImage = true;

                                        list[i].thumbnail.en1024.path = '';
                                        // list[i].thumbnail.en512.path='';
                                        list[i].thumbnail.x512 = list[i].thumbnail.en1024;
                                        list[i].thumbnail.x1024 = list[i].thumbnail.en1024;
                                    }
                                    else {
                                        list[i].thumbnail.x1024 = list[i].thumbnail.x512;
                                    }
                                }
                            }

                            //网页端
                            if (list[i]._doc.isFree == false && list[i]._doc.isPaid == false && params.terminal != enums.terminal.android && params.terminal != enums.terminal.ios) {
                                //如果水印图片存在,则未付款的预览图返回水印图,网页不做touchClear,,否则返回512图片,网页上需要做touchclear
                                if (list[i].thumbnail.wk512) {
                                    list[i]._doc.enImage = true;
                                    list[i].thumbnail.wk512.path = '';
                                    list[i].thumbnail.x512 = list[i].thumbnail.wk512;
                                    list[i].thumbnail.x1024 = list[i].thumbnail.wk512;
                                }
                                else {
                                    list[i].thumbnail.x1024 = list[i].thumbnail.x512;
                                }

                            }
                            // list[i].originalInfo.url = list[i].thumbnail.x1024.url; //原来是缩略图,现在换原图地址 steve
                            if (list[i]._doc.isPaid != true) {
                                //list[i].originalInfo.url = list[i].thumbnail.x1024.url;
                                list[i].originalInfo.url = "";
                            } else {
                                try {
                                    if (params.isDownload) {
                                        photoModel.update({_id: list[i]._id}, {
                                            $inc: {downloadCount: 1}
                                        }, function (err) {
                                            if (err) {
                                                console.log(err);
                                                //log.error('getPhotosByConditions download photos count', err);
                                            }
                                        });
                                    }
                                } catch (e) {
                                    console.log('getPhotosByConditions download photos count', e.toString());
                                }
                            }

                            if (user.likePhotos && user.likePhotos.indexOf(list[i]._id) > -1) {
                                list[i]._doc.isLike = true;
                            } else {
                                list[i]._doc.isLike = false;
                            }
                            if (user.favoritePhotos && user.favoritePhotos.indexOf(list[i]._id) > -1) {
                                list[i]._doc.isFavorite = true;
                            } else {
                                list[i]._doc.isFavorite = false;
                            }
                            //去除不需要返回的的字段
                            delete list[i]._doc.orderHistory;

                            delete list[i]._doc.userIds;

                            //只返回当前用户的pplist
                            // console.log('before---');
                            // console.log(list[i].customerIds);

                            pps = [];
                            for (var c = 0; c < list[i].customerIds.length; c++) {
                                if (list[i].customerIds[c].userIds.indexOf(userId) > -1) {
                                    pps.push(list[i].customerIds[c]);
                                }
                            }
                            list[i].customerIds = pps;
                            // console.log('after---');
                            // console.log(list[i].customerIds);


                            var isPush = true;

                            if (paidCondition) {
                                if (isPaid != list[i]._doc.isPaid) {
                                    isPush = false;
                                }
                            }
                            if (params.isLike == 0 || params.isLike == 1) {
                                if ((params.isLike == 0 && list[i]._doc.isLike == true) || (params.isLike == 1 && list[i]._doc.isLike == false)) {
                                    isPush = false;
                                }
                            }
                            if (params.isFavorite == 0 || params.isFavorite == 1) {
                                if ((params.isFavorite == 0 && list[i]._doc.isFavorite == true) || (params.isFavorite == 1 && list[i]._doc.isFavorite == false)) {
                                    isPush = false;
                                }
                            }
                            if (list[i].mobileEditActive) {
                                list[i]._doc.presetId = "000000000000000000000000";
                            } else {
                                list[i]._doc.presetId = "111111111111111111111111";
                            }
                            if (list[i].locationId == null || list[i].locationId.length == 0) {
                                list[i].locationId = 'others';
                            } else { // give free stock content // Johnny Loke
                                for (var s in locationStockMedia) {
                                    if (s == list[i].locationId) {

                                        locationStockMedia[s].forEach(function (s1, i, a) {
                                            console.log('*************************', s1);
                                            var stockImg = JSON.parse(JSON.stringify(list[i]));
                                            stockImg._id = s1._id;
                                            stockImg.name = s1.originalInfo.originalName;
                                            //stockImg.userIds.push(userId);
                                            stockImg.isPresent = true;
                                            stockImg.originalInfo = s1.originalInfo;
                                            stockImg.thumbnail = s1.thumbnail;
                                            stockImg.photoSource = 'stock';
                                            stockImg.isFree = true;
                                            stockImg.allowDownload = true;
                                            stockImg.photoCode = list[i].photoCode + 'S';
                                            stockImg.parentId = list[i]._id;

                                            result.push(stockImg);
                                            console.warn(stockImg);
                                        })
                                        delete locationStockMedia[s];
                                    }
                                }
                            }


                            if ((utilFun.customDateDiff('s', list[i].shootOn, Date.now()) / (24 * 60 * 60 )) >= 30 && list[i]._doc.isPaid == false) {
                                isPush = false;
                            }
                            if (isPush) {
                                result.push(list[i]);
                            }


                        }
                        resultObj.result = {photos: result, time: t};
                        return res.ext.json(resultObj);
                    } else {
                        resultObj.result = {photos: result, time: t};
                        return res.ext.json(resultObj);
                    }
                })
                    .catch(function (err) {
                        console.log(err);
                        //log.error('getPhotoByConditions', err);
                        return Promise.reject(errInfo.getPhotosByConditions.userError);
                });
            } else {
                resultObj.result = {photos: result, time: t};
                return res.ext.json(resultObj);
            }
        })
        .catch(function(error){
            console.log(error);
            //log.error('getPhotoByConditions', error);
            if(error.status){
                return res.ext.json(JSON.parse(error.message));
            }else {
                return res.ext.json(errInfo.getPhotosByConditions.photoError);
            }
    });
}

function getCondition(params) {
    var condition = {};
    for(var i in params){
        var cdt = params[i];
        switch (true){
            case /^id/.test(i):
                var idArr = cdt.split(',');
                condition._id = {'$in': idArr};
                break;
            case /^gteID$/.test(i):
                condition._id = {'$gt': cdt};
                break;
            case /^lteID$/.test(i):
                condition._id = {'$lt': cdt};
                break;
            case /^userId/.test(i):
                var userIdArr = cdt.split(',');
                condition.userIds = {'$in': userIdArr};
                break;
            case /^locationId/.test(i):
                var locationIdArr = cdt.split(',');
                condition.locationId = {'$in': locationIdArr};
                break;
            case /^customerId/.test(i):
                var ppCodesArr = cdt.split(',');
                var ppCodes = [];
                ppCodesArr.forEach(function (ppCode) {
                    ppCodes.push(ppCode.toUpperCase().replace(/-/g, ''));
                });
                condition['customerIds.code'] = {'$in': ppCodes};
                break;
            case/^shootDate$/.test(i):
                if(cdt.length == 10){
                    condition['shootOn'] = {
                      '$gte': new Date(cdt + ' 00:00:00'),
                      '$lt': new Date(cdt + ' 23:59:59')
                    };
                }
                break;
            case/^lastUpdateTime$/.test(i):
                var lastUpdateTime = '';
                if(cdt.indexOf('-') == -1 && parseFloat(cdt)){
                    lastUpdateTime = new Date(parseFloat(cdt));
                } else if(new Date(cdt) != 'Invalid Date'){
                    lastUpdateTime = new Date(cdt);
                }
                condition.modifiedOn = {'$gte': lastUpdateTime};
                break;
            default:
                break;
        }
    }
    condition.locationId = {'$ne': null};
    condition.disabled = false;
    return condition;
}

function getOptions(params) {
    var options = {};
    options.sort = {};
    options.limit = 50;
    options.sort['_id'] = -1;
    if(!params.gteID && !params.lteID){
        options.sort = {'shootOn': -1};
    }
    if(params.sortField && params.sortField.length > 0){
        var sortField = params.sortField;
        if(params.order){
            options.sort[sortField] = parseInt(params.order);
        }else {
            options.sort[sortField] = 1;
        }
    }
    if(params.limit){
        options.limit = parseInt(params.limit);
    }
    return options;
}

exports.removePhotosFromPP = function (req, res, next) {
    var params = req.ext.params;
    if (!req.ext.haveOwnproperty(params, ['ids', 'pp'])) {
        res.ext.json(errInfo.removePhotosFromPP.paramsError);
    }
    var customerId = params.pp;

    var ids = [];
    try {
        ids = JSON.parse(params.ids);
    } catch (e) {
        ids = params.ids;
    }
    var userId = '';
    if (params.userId) {
        userId = params.userId;
    }
    var photoIds = [];
    photoModel.findAsync({'customerIds.code': customerId, _id: {$in: ids}})
        .then(function (list) {
            var count = 0;
            var flag = false;
            Promise.mapSeries(list, function (item) {
                var index = -1;
                var pushUserIds = [];
                photoIds.push(item.photoId);

                var addUserIds = [];//其他卡号的用户Id

                for (var i = 0; i < item.customerIds.length; i++) {
                    if (item.customerIds[i].code != customerId) {
                        for (var t = 0; t < item.customerIds[i].userIds.length; t++) {
                            if (addUserIds.indexOf(item.customerIds[i].userIds[t]) == -1) {
                                addUserIds.push(item.customerIds[i].userIds[t]);
                            }
                        }

                    }
                    if (item.customerIds[i].code == customerId) {
                        index = i;
                        pushUserIds = item.customerIds[i].userIds;
                    }

                }
                item.userIds = addUserIds;
                item.customerIds.splice(index, 1);
                item.modifiedOn = Date.now();
                var pUserIds = [];
                var pNewUserIds = [];//如果有另一张卡也存在信息则推送修改后的数据到手机端
                for (var p = 0; p < pushUserIds.length; p++) {
                    if (item.userIds.indexOf(pushUserIds[p]) == -1) {
                        pUserIds.push(pushUserIds[p]);
                    } else {
                        pNewUserIds.push(pushUserIds[p]);
                    }
                }
                item.save(function (err) {
                    if (err) {
                        console.log('unBindCodeFromUser', err);
                    }

                    socketController.pushToUsers(pushMsgType.delPhotos, pUserIds, pubScribeList.pushDelPhotos,
                        {
                            id: item._id
                        }, function () {

                        });

                    socketController.pushToUsers(pushMsgType.photoSend, pNewUserIds, pubScribeList.pushNewPhotoCount,
                        {
                            c: 1
                        }, function () {

                        });

                    count++;
                    if (count == list.length) {

                        flag = true;
                    }
                })
            });
            if(flag){
                return true;
            }else {
                return  Promise.reject(errInfo.removePhotosFromPP.saveError);
            }
        })
        .then(function (result) {
            if(result){
                request.post({
                    url: config.MasterAPIList.removePhotosFromPP,
                    body: {photoIds: photoIds, pp: customerId},
                    json: true
                });
                return res.ext.json();
            }else {
                return res.ext.json(result);;
            }
        })
        .catch(function (err) {
            return res.ext.json(errInfo.removePhotosFromPP.promiseError);
        });
}

