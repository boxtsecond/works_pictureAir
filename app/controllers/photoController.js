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
var filterPhoto = require('../resfilter/resfilter.js').photo.filterPhoto;

/* Bo 查询图片
 * @param {condition type: Array} 查询条件
 * must have [locationId, userId]
 * */
exports.getPhotosByConditions = function (req, res, next) {
    var params = req.ext.params;
    var photos = [];
    if(!req.ext.checkExistProperty(params, params.condition)){
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

    photoModel.findAsync(conditions, fields, options)
        .then(function (list) {
            if (list && list.length > 0) {
                return Promise.each(list, function (pto) {
                    var pushPhoto = new filterPhoto(pto);
                    photos.push(pushPhoto);
                })
            }else {
                return Promise.reject(errInfo.getPhotosByConditions.notFind);
            }
        })
        .then(function () {
            if(photos.length > 0){
                var resultObj = errInfo.success;
                resultObj.result = {};
                resultObj.result.photos = photos;
                return res.ext.json(resultObj);
            }else {
                return res.ext.json(errInfo.getPhotosByConditions.notFind);
            }
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.getPhotosByConditions.promiseError);
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
    if (!req.ext.checkExistProperty(params, ['ids', 'pp'])) {
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
                return res.ext.json(errInfo.removePhotosFromPP.saveError);;
            }
        })
        .catch(function (err) {
            return res.ext.json(errInfo.removePhotosFromPP.promiseError);
        });
}

