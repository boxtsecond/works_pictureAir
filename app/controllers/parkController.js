/**
 * Created by xueting-bo on 16/11/20.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;
var parkModel = require('../mongodb/Model/parkModel');
var common = require('../tools/common.js');
var redisclient=require('../rq').redisclient;
var config = require('../../config/config.js').config;

exports.getAllLocations = function (req, res, next) {
    var condition = {isDel: false, active: true};
    Promise.resolve()
        .then(function () {
            return getLocationsByCondition(condition);
        })
        .then(function (locations) {
            if(locations){
                for(var i=0;i<locations.length;i++){
                    locations[i]._doc.locations=locations[i].locations;
                    for(var j= 0;j<locations[i].locations.length;j++){
                        locations[i]._doc.locations[j]._doc.subjects=locations[i].locations[j].locations;
                    }
                }
                return locations;
            }else {
                return Promise.reject(errInfo.getAllLocations.notFind);
            }
        })
        .then(function (result) {
            var resultObj = errInfo.success;
            resultObj.result.lands = result;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            console.log(error);
            if(error.status){
                return res.ext.json(error);
            }else {
                return res.ext.json(errInfo.getAllLocations.APIError);
            }
        })
}

exports.getLocationsByConditions = getLocationsByCondition;

function getLocationsByCondition(condition) {
    var locations=[];
    return parkModel.findAsync(condition, {_id: 0, 'locations': 1})
        .then(function (list) {
            if(list && list.length > 0){
                list.forEach(function(park){
                    if(park){
                        if (park.locations && park.locations.length > 0) {
                            locations=locations.concat(getChildren("0",park.locations
                                ,{locations:[],childrenIds:[]}));
                        }
                    }
                })
                return locations;
            }else {
                return Promise.reject(errInfo.getAllLocations.notFind);
            }
        })
        .then(function (locations) {
            //升序排序
            locations = locations.sort(function (a, b) {
                if (a.orderNo > b.orderNo) {
                    return 1;
                }
                if (a.orderNo < b.orderNo) {
                    return -1;
                }
                return 0;
            })
            return locations;
        })
        .catch(function (err) {
            if(err.status){
                return Promise.reject(err);
            }else {
                return Promise.reject(errInfo.getAllLocations.parkError);
            }
        });
}

function getChildren(parentId,data,results){

    var list=common.getListByPropertiesFromArray([{"field":"parentId","value":parentId},{"field":"isDel","value":false}],data);
    list.forEach(function(location){
        location.locations=[];
        location.childrenIds=[];
        results.locations.push(location);
        results.childrenIds.push(location.locationId);
        getChildren(location._id.toString(),data,location);
    })

    return results.locations;
}

exports.getAllParks = function (req, res, next) {
    var resultObj = errInfo.success;
    Promise.resolve()
        .then(function () {
            //查询redis是否有缓存
            return redisclient.get(config.redis.parkName)
                .then(function (parkCache) {
                    if(parkCache && parkCache.parks.length > 0){
                        resultObj.result = parkCache;
                        return Promise.reject(resultObj);
                    }else {
                        console.log("Can't find parks cache in Redis, pull parks from Mongo now.");
                        return parkCache;
                    }
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        return Promise.reject(errInfo.getAllParks.redisGetError);
                    }
                });
        })
        .then(function () {
            //redis里无缓存，从Mongo里获取
            console.log('Get parks from Mongo...');
            var condition = {isDel: false, active: true};
            return parkModel.findAsync(condition)
                .then(function (parks) {
                    if(parks && parks.length > 0){
                        return parks;
                    }else {
                        return Promise.reject(errInfo.getAllParks.notFind);
                    }
                })
        })
        .then(function (parks) {
            var result = [];
            var parkObj = {};
            var parkInfo = {};
            Promise.mapSeries(parks, function (onePark) {
                parkInfo.park = onePark;
                redisclient.incr(config.redis.parkVersionName+onePark.siteId)
                    .then(function (version) {
                        parkInfo.version = version;
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getAllParks.redisSetError)
                    });
                result.push(parkInfo);
            });
            parkObj.parks = result;
            return parkObj;
        })
        .then(function (result) {
            return redisclient.set(config.redis.parkName, result)
                .then(function () {
                    if(result.length > 0){
                        var resultObj = errInfo.success;
                        resultObj.parks = result
                        return res.ext.json(resultObj);
                    }else {
                        return Promise.reject(errInfo.getAllParks.promiseError);
                    }
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        return Promise.reject(errInfo.getAllParks.redisSetError);
                    }
                })
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                return res.ext.json(errInfo.getAllParks.promiseError);
            }
        });
}

exports.getParksVersionBySiteId = function(req, res, next){
    var params = req.ext.params;
    var siteIdArr = [];
    var parksInfo = [];
    var park = {};
    if (!req.ext.haveOwnproperty(params, 'siteId')) {
        return res.ext.json(errInfo.getParksVersionBySiteId.paramsError);
    }
    if(isstring(params.siteId)){
        siteIdArr = params.siteId.split(',');
    }else {
        siteIdArr = params.siteId;
    }

    Promise.resolve()
        .then(function () {
            //从redis里获取
            if(!(/^(A|a)ll$/.test(siteIdArr[0]))){
                Promise.each(siteIdArr, function (siteId) {
                    if(siteId){
                        redisclient.get(config.redis.parkVersionName+siteId)
                            .then(function (version) {
                                park.siteId = siteId;
                                park.version = version;
                                parksInfo.push(park);
                            })
                    }else {
                        return Promise.reject(errInfo.getParksVersionBySiteId.paramsError);
                    }
                })
                return parksInfo;
            }else {
                redisclient.get(config.redis.parkName)
                    .then(function (parks) {
                        parks = parks.parks;
                        Promise.each(parks, function (pk) {
                            park.siteId = pk.siteId;
                            park.version = pk.version;
                            parksInfo.push(park);
                        })
                    })
                    .catch(function (error) {
                        return Promise.reject(errInfo.getParksVersionBySiteId.redisGetError);
                    });
                return parksInfo;
            }
        })
        .then(function (pksInfo) {
            //从Mongo里获取
            if(!pksInfo && !(/^(A|a)ll$/.test(siteIdArr[0]))){
                var condition = {'$in': siteIdArr};
                return parkModel.findAsync(condition)
                    .then(function (pks) {
                        Promise.each(pks, function (pk) {
                            park.siteId = pk.siteId;
                            park.version = pk.version;
                            parksInfo.push(park);
                        });
                        redisclient.del(config.redis.parkName);
                        return parksInfo;
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getParksVersionBySiteId.parkError);
                    })
            }else if(!pksInfo && (/^(A|a)ll$/.test(siteIdArr[0]))){
                return parkModel.findAsync({})
                    .then(function (pks) {
                        Promise.each(pks, function (pk) {
                            park.siteId = pk.siteId;
                            park.version = pk.version;
                            parksInfo.push(park);
                        });
                        redisclient.del(config.redis.parkName);
                        return parksInfo;
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getParksVersionBySiteId.parkError);
                    })
            }else {
                return Promise.reject(errInfo.getParksVersionBySiteId.promiseError);
            }
        })
        .then(function (parks) {
            var resultObj = errInfo.success;
            resultObj.result.parks = parks;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                return res.ext.json(errInfo.getParksVersionBySiteId.promiseError);
            }
        });
}

exports.getParkBySiteId = function (req, res, next) {
    var params = req.ext.params;
    var resultObj = errInfo.success;
    var parksInfo = [];
    var park = {};
    var siteIdArr = [];
    if (!req.ext.haveOwnproperty(params, 'siteId')) {
        return res.ext.json(errInfo.getParkBySiteId.paramsError);
    }
    if(isstring(params.siteId)){
        siteIdArr = params.siteId.split(',');
    }else {
        siteIdArr = params.siteId;
    }

    Promise.resolve()
        .then(function () {
            //查询redis是否有缓存
            return redisclient.get(config.redis.parkName)
                .then(function (parkCache) {
                    if(parkCache && parkCache.parks.length > 0){
                        var pks = parkCache.parks;
                        Promise.each(siteIdArr, function (siteId) {
                            Promise.each(pks, function (pk) {
                                if(pk.siteId == siteId){
                                    park.park = pk.park;
                                    park.version = pk.version;
                                    parksInfo.push(park);
                                }
                            })
                        })
                        resultObj.result.parks = parksInfo;
                        return Promise.reject(resultObj);
                    }else {
                        console.log("Can't find parks cache in Redis, pull parks from Mongo now.");
                        return parkCache;
                    }
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        return Promise.reject(errInfo.getParkBySiteId.redisGetError);
                    }
                });
        })
        .then(function () {
            //redis里无缓存，从Mongo里获取
            console.log('Get parks from Mongo...');
            var condition = {isDel: false, active: true};
            condition.siteId = {'$in': siteIdArr};
            return parkModel.findAsync(condition)
                .then(function (parks) {
                    if(parks && parks.length > 0){
                        return parks;
                    }else {
                        return Promise.reject(errInfo.getParkBySiteId.notFind);
                    }
                })
        })
        .then(function (parks) {
            var result = [];
            var parkObj = {};
            var parkInfo = {};
            Promise.mapSeries(parks, function (onePark) {
                parkInfo.park = onePark;
                redisclient.incr(config.redis.parkVersionName+onePark.siteId)
                    .then(function (version) {
                        parkInfo.version = version;
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getParkBySiteId.redisSetError)
                    });
                result.push(parkInfo);
            });
            parkObj.parks = result;
            return parkObj;
        })
        .then(function (result) {
            return redisclient.set(config.redis.parkName, result)
                .then(function () {
                    if(result.length > 0){
                        var resultObj = errInfo.success;
                        resultObj.result = result;
                        return res.ext.json(resultObj);
                    }else {
                        return Promise.reject(errInfo.getParkBySiteId.promiseError);
                    }
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        return Promise.reject(errInfo.getParkBySiteId.redisSetError);
                    }
                })
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                return res.ext.json(errInfo.getParkBySiteId.promiseError);
            }
        });
}