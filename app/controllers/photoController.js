/**
 * Created by xueting-bo on 16/11/17.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;
var photoModel = require('../mongodb/Model/photoModel');
var storePhotoModel = require('../mongodb/Model/storePhotoModel');
var parkModel = require('../mongodb/Model/parkModel');
var userModel = require('../mongodb/Model/userModel');
var cardCodeModel=require("../mongodb/Model/cardCodeModel");
var common = require('../tools/common.js');
var async = require('async');
var config = require('../../config/config.js').config;
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);
var enums = require('../tools/enums.js');
var filters = require('../resfilter/resfilter.js');
var resTools = require('../resfilter/resTools');
var redisclient=require('../redis/redis').redis;
var fs = require('fs');
var util=require('../../config/util.js');
var uuid = require('../rq').uuid;
var findInfo = require('../resfilter/cacheTools.js').findInfo;

function getCondition(req, params) {
    var condition = {};
    for(var i in params){
        var cdt = params[i];
        switch (true){
            case /^id/.test(i):
                if(req.ext.isArray(cdt)){
                    condition._id = {'$in': cdt};
                }else if(req.ext.isstring(cdt)){
                    var idArr = cdt.split(',');
                    condition._id = {'$in': idArr};
                }
                break;
            case /^gteID$/.test(i):
                condition._id.$gt = cdt;
                break;
            case /^lteID$/.test(i):
                condition._id.$lt = cdt;
                break;
            case /^userId$/.test(i):
                // if(req.ext.isArray(cdt)){
                //     condition.userIds = {'$in': cdt};
                // }else {
                //     var userIdArr = cdt.split(',');
                //     condition.userIds = {'$in': userIdArr};
                // }
                condition.userIds = cdt;
                break;
            case /^locationId/.test(i):
                var locationIdArr = cdt.split(',');
                condition.locationId = {'$in': locationIdArr};
                break;
            case /^customerId/.test(i):
                if(req.ext.isArray(cdt)){
                    condition['customerIds.code'] = {'$in': cdt};
                }else if(req.ext.isstring(cdt)){
                    var ppCodesArr = cdt.split(',');
                    var ppCodes = [];
                    ppCodesArr.forEach(function (ppCode) {
                        ppCodes.push(ppCode.toUpperCase().replace(/-/g, ''));
                    });
                    condition['customerIds.code'] = {'$in': ppCodes};
                }
                break;
            case/^shootDate$/.test(i):
                if(cdt.length == 10){
                    condition['shootOn'] = {
                        '$gte': new Date(cdt),
                        '$lte': new Date(new Date(cdt)+ 86400000)
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
    //options.limit = 50;
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
    if(params.page){
        if(!params.limit) options.limit = 50;
        options.skip = parseInt((params.page - 1)*options.limit)
    }
    return options;
}

//flag true---login
function findPhotos(conditions, fields, options, flag, audience) {
    var photos = [];
    var userPP;
    var codeIds = [];
    var parkInfo = {};

    return findInfo('hgetall', config.configJSONData.redis.parkName, 'park', {isDel: false, active: true})
        .then(function (info) {
            if (info && info.redis) {
                for(var i in info.redis){
                    parkInfo[i] = JSON.parse(info.redis[i]);
                }
            } else if (info && info.mongo) {
                return Promise.each(info.mongo, function (parks) {
                    var pushPark = new filters.park.filterPark(parks);
                    parkInfo[parks.siteId] = pushPark;
                    return redisclient.hset(config.configJSONData.redis.parkName, parks.siteId, JSON.stringify(pushPark))
                        .then(function () {
                            return redisclient.hset(config.configJSONData.redis.parkVersionName, parks.siteId, parks.modifiedOn);
                        })
                })
            }
        })
        .then(function () {
            if(!flag){
                return photoModel.findAsync(conditions, fields, options)
                    .then(function (list) {
                        if (list && list.length > 0) {
                            codeIds.push(conditions['customerIds.code']);
                            return Promise.each(list, function (pto) {
                                var isPaid = false;
                                var pushPhoto = new filters.photo.filterPhoto(pto, isPaid, conditions['customerIds.code'], flag);
                                if(parkInfo[pto.siteId]){
                                    pushPhoto.coverHeaderImage = parkInfo[pto.siteId].coverHeaderImage;
                                    pushPhoto.logoUrl = parkInfo[pto.siteId].logoUrl;
                                    pushPhoto.pageUrl = parkInfo[pto.siteId].pageUrl;
                                    pushPhoto.lawUrl = parkInfo[pto.siteId].lawUrl;
                                    pushPhoto.parkName = parkInfo[pto.siteId].parkName;
                                }
                                photos.push(pushPhoto);
                            })
                        }
                    })
            }else {
                return findInfo('get' ,'access_token:'+audience, 'user', {_id: conditions.userIds})
                    .then(function (info) {
                        if (info && info.redis) {
                            userPP = info.redis.user.userPP;
                            return Promise.each(info.redis.user.customerIds, function (ctId) {
                                if(ctId.code){
                                    codeIds.push(ctId.code);
                                }
                            });
                        } else if (info && info.mongo) {
                            userPP = info.mongo.userPP;
                            return Promise.each(info.mongo.customerIds, function (ctId) {
                                if(ctId.code){
                                    codeIds.push(ctId.code);
                                }
                            });
                        } else {
                            return Promise.reject(errInfo.findPhotos.notFind);
                        }
                    })
                    .then(function () {
                        if (codeIds && codeIds.length > 0) {
                            conditions["customerIds.code"] = {$in: codeIds};
                            //conditions["orderHistory.customerId"] = code;
                            return photoModel.findAsync(conditions, fields, options)
                                .then(function (list) {
                                    if (list && list.length > 0) {
                                        return Promise.each(list, function (pto) {
                                            var isPaid = false;
                                            return Promise.resolve()
                                                .then(function () {
                                                    return Promise.each(pto.orderHistory, function (odh) {
                                                        return Promise.each(codeIds, function (code) {
                                                            if(odh.customerId == code){
                                                                isPaid = true;
                                                            }
                                                        })
                                                    })
                                                    // pto.orderHistory.map(function (orderItem) {
                                                    //     codeIds.map(function (idItem) {
                                                    //         if(orderItem.customerId == idItem){
                                                    //             isPaid = true;
                                                    //         }
                                                    //     })
                                                    // });

                                                })
                                                .then(function () {
                                                    var pushPhoto = new filters.photo.filterPhoto(pto, isPaid, conditions['customerIds.code'], flag);
                                                    if(parkInfo[pto.siteId]){
                                                        pushPhoto.coverHeaderImage = parkInfo[pto.siteId].coverHeaderImage;
                                                        pushPhoto.logoUrl = parkInfo[pto.siteId].logoUrl;
                                                        pushPhoto.pageUrl = parkInfo[pto.siteId].pageUrl;
                                                        pushPhoto.parkName = parkInfo[pto.siteId].parkName;
                                                    }
                                                    photos.push(pushPhoto);
                                                })
                                        })
                                    }
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    return Promise.reject(errInfo.findPhotos.promiseError);
                                });
                        }
                    })
            }
        })
        .then(function () {
            return {photos: photos, userPP: userPP, code: codeIds};
        })
        .catch(function (error) {
            if(error.status){
                return error;
            }else {
                console.log(error);
                return errInfo.findPhotos.photoError;
            }
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
    var conditions = getCondition(req, params);
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
    var flag = false, audience = '';
    if(params.userId){
        flag = true
        audience = params.token.audience;
    }

    return Promise.resolve()
        .then(function () {
            //用户个人的照片
            return findPhotos(conditions, fields, options, flag, audience);
        })
        .then(function (photos) {
            //storePhotos
            if(flag){
                if(photos.status){
                    return Promise.reject(photos);
                }else if(photos.code && photos.code.length > 1){
                    var allPhotos = photos.photos;
                    //var siteInfo = config.configJSONData.siteIds;
                    var siteInfo = {};
                    return cardCodeModel.findAsync({PPCode: {$in: photos.code}, active: true})
                        .then(function (cardCode) {
                            if(cardCode && cardCode.length > 0){
                                return Promise.each(cardCode, function (card) {
                                    return Promise.each(card.siteIds, function (site) {
                                        var le = filters.card.getLevelsByCardType(card.PPPType);
                                        siteInfo[le] = [];
                                        siteInfo[le].push(site);
                                    })
                                })
                            }
                        })
                        .then(function () {
                            if(siteInfo && siteInfo.toString() !== '{}'){
                                for(var le in siteInfo){
                                    return storePhotoModel.findAsync({siteId: {$in: siteInfo[le]}, belongslevels:{$lte: le}})
                                        .then(function (storePhotos) {
                                            if(storePhotos && storePhotos.length > 0){
                                                return Promise.each(storePhotos, function (ph) {
                                                    var newStorePhotos = new filters.photo.filterStorePhoto(ph, photos.userPP);
                                                    allPhotos.push(newStorePhotos);
                                                })
                                            }
                                        })
                                }
                            }
                        })
                        .then(function () {
                            return allPhotos;
                        })

                }else {
                    return photos.photos;
                }
            }else {
                return photos.photos;
            }
        })
        .then(function (photos) {
            var resultObj = errInfo.success;
            resultObj.result = {};
            resultObj.result.photos = photos;
            //console.log(photos);
            return res.ext.json(resultObj);
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

exports.removePhotosFromPP = function (req, res, next) {
    var params = req.ext.params;
    if (!req.ext.checkExistProperty(params, ['pp', 'userId'])) {
        res.ext.json(errInfo.removePhotosFromPP.paramsError);
    }
    var userId = params.userId;
    var conditions = getCondition(req, params);

    photoModel.findAsync(conditions)
        .then(function (list) {
            if(list && list.length > 0){
                return Promise.each(list, function (photo) {
                    return photoModel.findByIdAndUpdateAsync(photo._id, {$pull: {'userIds': userId}})
                        .then(function () {
                            return photoModel.findByIdAndUpdateAsync(photo._id, {$pull: {'customerIds': {userId: userId}}});
                        })
                        .catch(function (err) {
                            console.log(err);
                            return Promise.reject(errInfo.removePhotosFromPP.photoError);
                        });
                });
            }else {
                return Promise.reject(errInfo.removePhotosFromPP.notFind);
            }
        })
        .then(function () {
            return res.ext.json();
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
    multi.expire(photoIdIndex, 60*3) ;
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
            //return photoModel.findAsync({$or: [{_id: {$in: photoIds}}, {'orderHistory.userId': photoObj.userId}, {isFree: true}]})
            return photoModel.findAsync({_id: {$in: photoIds}})
                .then(function (photos) {
                    return photoModel.updateAsync({_id: {$in: photoIds}}, {$inc: {downloadCount: 1}}, {multi: true})
                        .then(function () {
                            return Promise.each(photos, function (pt) {
                                if(photoExists(pt.originalInfo.path)){
                                    havePhoto = true;
                                    var photoPath = pt.originalInfo.path;
                                    var photoName = uuid.v1() + '.' +path.extname(photoPath);
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
        console.log(e);
        return false;
    }
}

exports.getPhotosForWeb = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, params.condition)){
        return res.ext.json(errInfo.getPhotosByConditions.paramsError);
    }
    var conditions = getCondition(req, params);
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
    var sendPhotos = [];
    var flag = false, audience = '';
    if(params.userId){
        flag = true
        audience = params.token.audience;
    }

    Promise.resolve()
        .then(function () {
            return findPhotos(conditions, fields, options, flag, audience);
        })
        .then(function (photos) {
            if(photos.status) {
                return Promise.reject(photos);
            }else if(photos.photos && photos.photos.length > 0){
                return Promise.each(photos.photos, function (pt) {
                    if(pt.isPaid){
                        sendPhotos.push(pt);
                    }
                })
            }
        })
        .then(function () {
            var resultObj = errInfo.success;
            resultObj.result = {};
            resultObj.result.photos = sendPhotos;
            return res.ext.json(resultObj);
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

exports.getPhotoByOldSys = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, 'photoCode')){
        return res.ext.json(errInfo.getPhotoByOldSys.paramsError);
    }
    var photo= [];

    request.getAsync({
        url: 'http://www2.pictureair.com/api/importphoto.php?photocode=' + params.photoCode,
        json: true
    }).then(function (data) {
        if(data.body && data.body.photos && data.body.photos.length > 0){
            return Promise.each(data.body.photos, function (pto) {
                var pushphoto = new filters.photo.filterPhotoFromOldSys(pto);
                var siteId = pto.site_id;
                return parkModel.findOneAsync({siteId: siteId.toUpperCase()})
                    .then(function (park) {
                        pushphoto.logoUrl = park.logoUrl;
                        pushphoto.pageUrl = park.pageUrl;
                        pushphoto.parkName = park.name;
                        photo.push(pushphoto);
                    })
            })
        }
    })
        .then(function () {
            var resultObj = errInfo.success;
            resultObj.result = {};
            resultObj.result.photos = photo;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            console.log(error);
            return res.ext.json(errInfo.getPhotoByOldSys.promiseError);
        });
};

exports.addPhotoFromOldSys = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, 'photoCode')){
        return res.ext.json(errInfo.addPhotoFromOldSys.paramsError);
    }
    var createPhoto;
    var photosNum = 0;
    var bindedNum = 0;
    var bindedCode = [];

    request.getAsync({
        url: 'http://www2.pictureair.com/api/importphoto.php?photocode=' + params.photoCode,
        json: true
    }).then(function (data) {
        if(data.body && data.body.photos && data.body.photos.length > 0){
            return findInfo('get', 'access_token:'+params.token.audience, 'user', {_id: params.userId})
                .then(function (info) {
                    if(info && info.redis){
                        return {customerId: info.redis.user.userPP, photos: data.body.photos};
                    }else if(info && info.mongo){
                        return {customerId: info.mongo.userPP, photos: data.body.photos};
                    }
                })
        }
    })
        .then(function (info) {
            if(info && info.customerId){
                return Promise.each(info.photos, function (pto) {
                    createPhoto = false;
                    return photoModel.findOneAsync({photoCode: pto.code, 'customerIds.code': info.customerId})
                        .then(function (photo) {
                            if(!photo){
                                var pushphoto = new filters.photo.addPhotoFromOldSys(pto, params.userId, info.customerId);
                                return photoModel.createAsync(pushphoto)
                                    .then(function () {
                                        createPhoto = true;
                                        photosNum ++;
                                    });
                            }else {
                                bindedNum ++;
                                bindedCode.push(pto.code);
                            }
                        })
                })
            }else {
                createPhoto = false;
                return res.ext.json(errInfo.addPhotoFromOldSys.customerIdError);
            }
        })
        .then(function () {
            if(createPhoto && photosNum){
                var resultObj = errInfo.success;
                resultObj.result = {addNum: photosNum, bindedNum: bindedNum, bindedCode: bindedCode};
                return res.ext.json(resultObj);
            }
        })
        .catch(function (error) {
            console.log(error);
            return res.ext.json(errInfo.addPhotoFromOldSys.promiseError);
        });
}

exports.removeRealPhotos = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, ['interval', 'delDB', 'delPhotos'])){
        return res.ext.json(errInfo.removeRealPhotos.paramsError);
    }
}
