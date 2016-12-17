/**
 * Created by xueting-bo on 16/11/17.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;
var photoModel = require('../mongodb/Model/photoModel');
var parkModel = require('../mongodb/Model/parkModel');
var userModel = require('../mongodb/Model/userModel');
var cardCodeModel=require("../mongodb/Model/cardCodeModel");
var common = require('../tools/common.js');
var async = require('async');
var config = require('../../config/config.js').config;
var request = require('request');
var enums = require('../tools/enums.js');
var filterPhoto = require('../resfilter/resfilter.js').photo.filterPhoto;
var resTools = require('../resfilter/resTools');
var redisclient=require('../redis/redis').redis;
var fs = require('fs');
var util=require('../../config/util.js');

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

//flag true---login
function findPhotos(conditions, fields, options, flag) {
    var photos = [];
    return photoModel.findAsync(conditions, fields, options)
        .then(function (list) {
            var isPaid = false;
            if (list && list.length > 0) {
                return Promise.each(list, function (pto) {
                    //判断 isPaid
                    if(flag){
                        return Promise.each(pto.orderHistory, function (pp) {
                            return cardCodeModel.findOneAsync({PPPCode: pp.prepaidId, active: true, userId: conditions.userIds})
                                .then(function (card) {
                                    if(card){
                                        isPaid = true;
                                    }
                                })
                                .then(function () {
                                    var pushPhoto = new filterPhoto(pto, isPaid);
                                    return parkModel.findOneAsync({siteId: pto.siteId})
                                        .then(function (park) {
                                            //从park表中获取其他字段(coverHeaderImage, avatarUrl, pageUrl)
                                            pushPhoto.coverHeaderImage = park.coverHeaderImage;
                                            pushPhoto.logoUrl = park.logoUrl;
                                            pushPhoto.pageUrl = park.pageUrl;
                                            pushPhoto.parkName = park.name;
                                            photos.push(pushPhoto);
                                        })
                                })
                        })
                    }else {
                        var pushPhoto = new filterPhoto(pto, false);
                        return parkModel.findOneAsync({siteId: pto.siteId})
                            .then(function (park) {
                                //从park表中获取其他字段(coverHeaderImage, avatarUrl, pageUrl)
                                pushPhoto.coverHeaderImage = park.coverHeaderImage;
                                pushPhoto.logoUrl = park.logoUrl;
                                pushPhoto.pageUrl = park.pageUrl;
                                pushPhoto.parkName = park.name;
                                photos.push(pushPhoto);
                            })
                    }
                })
            }
        })
        .then(function () {
            return photos;
        })
        .catch(function (error) {
            console.log(error);
            return errInfo.findPhotos.photoError;
        });
}

/* Bo 查询图片
 * @param {condition type: Array} 查询条件
 * must have [locationId, userId]
 * */
exports.getPhotosByConditions = function (req, res, next) {
    var params = req.ext.params;
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
        originalInfo: 1,
        thumbnailTypes: 1,
        thumbnail: 1,
        locationId: 1,
        parentId: 1,
        disabled: 1,
        isFree: 1,
        isVIP: 1,
        targetPoint: 1,
        allowDownload: 1,
        siteId: 1,
        createdBy: 1,
        modifiedOn: 1,
        mobileEditActive: 1,
        mimeType: 1,
        bundleWithPPP: 1,
        adInfo: 1
    };
    var flag;
    params.userId ? flag = true : flag = false;

    Promise.resolve()
        .then(function () {
            return findPhotos(conditions, fields, options, flag);
        })
        .then(function (photos) {
            if(photos.status){
                return res.ext.json(photos);
            }else {
                var resultObj = errInfo.success;
                resultObj.result = {};
                resultObj.result.photos = photos;
                return res.ext.json(resultObj);
            }
        })
        .catch(function (error) {
            console.log(error);
            return res.ext.json(errInfo.getPhotosByConditions.promiseError);
        });
}

exports.removePhotosFromPP = function (req, res, next) {
    var params = req.ext.params;
    if (!req.ext.checkExistProperty(params, ['ids', 'pp', 'userId'])) {
        res.ext.json(errInfo.removePhotosFromPP.paramsError);
    }
    var customerId = params.pp;

    var ids = [];
    try {
        ids = JSON.parse(params.ids);
    } catch (e) {
        ids = params.ids;
    }
    var userId = params.userId;
    var photoIds = [];
    
    photoModel.findAsync({'customerIds.code': customerId, "_id": {"$in": ids}})
        .then(function (list) {
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
                item.save();
            });
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
            if(err.status){
                return res.ext.json(err);
            }else {
                console.log(err);
                return res.ext.json(errInfo.removePhotosFromPP.promiseError);
            }
        });
}

exports.quickDownloadPhotosParam = function (req, res, next) {
    var params = req.ext.params;
    var photoIds = params.photoIds;
    if(util.isstring(photoIds)){
        photoIds = photoIds.split(',');
    }
    if(!req.ext.checkExistProperty(params, ['photoIds', 'userId', 'userName'])){
        return res.ext.json(errInfo.quickDownloadPhotosParam.paramsError);
    }

    var photoIdIndex = 'download_' + params.userId + '_' + resTools.convertDateToStr(new Date().getTime()) + '';
    photoIdIndex = photoIdIndex.replace(/\s+/g, '');
    var config = {};
    config.photoIds = photoIds;
    config.userId = params.userId;
    config.userName = params.userName;
    var multi = redisclient.multi();
    multi.set(photoIdIndex, JSON.stringify(config));
    multi.expire(photoIdIndex, 60 * 60 * 24) ;
    multi.exec(function (err, replies) {
        if (err) {
            return res.ext.json(errInfo.quickDownloadPhotosParam.redisSetError);
        } else {
            var resultObj = errInfo.success;
            resultObj.result = {key: photoIdIndex};
            return res.ext.json(resultObj);
        }
    });
}

exports.quickDownloadPhotos = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, 'key')){
        return res.ext.json(errInfo.quickDownloadPhotos.paramsError);
    }
    var redisKey = params.key;

    Promise.resolve()
        .then(function () {
            return redisclient.get(redisKey)
                .then(function (info) {
                    if(!info){
                        return Promise.reject(errInfo.quickDownloadPhotos.redisNotFind);
                    }else {
                        return JSON.parse(info);
                    }
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        return Promise.reject(errInfo.quickDownloadPhotos.redisGetError);
                    }
                });
        })
        .then(function (photoObj) {
            var Archiver = require('archiver');
            var zipArchiver = Archiver('zip');
            var havePhoto = false;
            var nameStr = resTools.convertDateToStr(new Date()).replace(/\s+/g, '');
            var downloadName = photoObj.userName + '_' + nameStr + '.zip';
            var photoIds = photoObj.photoIds;
            return photoModel.findAsync({_id: {$in: photoIds}, $or: [{'orderHistory.userId': photoObj.userId}, {isFree: true}]})
                .then(function (photos) {
                    return photoModel.updateAsync({_id: {$in: photoIds}, $or: [{'orderHistory.userId': photoObj.userId}, {isFree: true}]}, {$inc: {downloadCount: 1}}, {multi: true})
                        .then(function () {
                            return Promise.each(photos, function (pt) {
                                if(photoExists(pt.originalInfo.path)){
                                    havePhoto = true;
                                    var photoPath = pt.originalInfo.path;
                                    var photoName = photoPath.substring(photoPath.lastIndexOf('/') - 1);
                                    return zipArchiver.append(fs.createReadStream(photoPath), {name: photoName});
                                }
                            })
                        })
                        .then(function () {
                            if(havePhoto){
                                res.attachment(downloadName);
                                zipArchiver.pipe(res);
                                return zipArchiver.finalize();
                            }else {
                                return Promise.reject(errInfo.quickDownloadPhotos.photoNotFind);
                            }
                        })
                        .catch(function (err) {
                            if(err.status){
                                return Promise.reject(err);
                            }else {
                                console.log(err);
                                return Promise.reject(errInfo.quickDownloadPhotos.photoError);
                            }
                        })
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        console.log(err);
                        return Promise.reject(errInfo.quickDownloadPhotos.photoError);
                    }
                })
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.quickDownloadPhotos.promiseError);
            }
        })
}

function photoExists(path) {
    try {
        var stats = fs.lstatSync(path);
        return stats.isFile();
    } catch (e) {
        //console.log(e);
        return false;
    }
}