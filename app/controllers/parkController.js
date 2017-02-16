/**
 * Created by xueting-bo on 16/11/20.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;
var parkModel = require('../mongodb/Model/parkModel');
var common = require('../tools/common.js');
var redisclient=require('../rq').redisclient;
var config = require('../../config/config.js').config.configJSONData;
var util=require('../../config/util.js');
var request = require('request');
var parkFilter = require('../resfilter/park.js').filterPark;

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
    var result = [];
    Promise.resolve()
        .then(function () {
            //查询redis是否有缓存
            return redisclient.hgetall(config.redis.parkName)
                .then(function (parkCache) {
                    if(JSON.stringify(parkCache) !== '{}'){
                        for(var i in parkCache){
                            result.push(JSON.parse(parkCache[i]));
                        }
                    }else {
                        console.log("Can't find parks cache in Redis, pull parks from Mongo now.");
                        return parkCache;
                    }
                })
                .then(function () {
                    if(result.length > 0){
                        var resultObj = errInfo.success;
                        resultObj.result = {};
                        resultObj.result.parks = result;
                        return Promise.reject(resultObj);
                    }
                })
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        console.log(err);
                        return Promise.reject(errInfo.getAllParks.redisGetError);
                    }
                });
        })
        .then(function () {
            //redis里无缓存，从Mongo里获取
            console.log('Get parks from Mongo...');
            return parkModel.findAsync({isDel: false, active: true})
                .then(function (parks) {
                    if(parks && parks.length > 0){
                        return parks;
                    }else {
                        return Promise.reject(errInfo.getAllParks.notFind);
                    }
                })
        })
        .then(function (parks) {
            return Promise.mapSeries(parks, function (onePark) {
                var pushPark = new parkFilter(onePark);
                return redisclient.hset(config.redis.parkName, onePark.siteId, JSON.stringify(pushPark))
                    .then(function () {
                        return redisclient.hset(config.redis.parkVersionName, onePark.siteId, onePark.modifiedOn)
                            .then(function () {
                                result.push(pushPark);
                            })
                            .catch(function (err) {
                                return Promise.reject(errInfo.getAllParks.redisSetError)
                            });
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getAllParks.redisSetError)
                    });
            });
        })
        .then(function () {
            if(result.length > 0){
                var resultObj = errInfo.success;
                resultObj.result = {};
                resultObj.result.parks = result;
                return res.ext.json(resultObj);
            }else {
                return Promise.reject(errInfo.getAllParks.promiseError);
            }
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.getAllParks.promiseError);
            }
        });
}

exports.getAllParksVersion = function (req, res, next) {
    var park = {};
    Promise.resolve()
        .then(function () {
            //从redis里获取
            return redisclient.hgetall(config.redis.parkVersionName)
                .then(function (parks) {
                    park = parks;
                })
                .catch(function (err) {
                    console.log(err);
                    return Promise.reject(errInfo.getAllParksVersion.redisGetError);
                });
        })
        .then(function () {
            //从Mongo里获取
            if(JSON.stringify(park) === '{}'){
                return parkModel.findAsync({})
                    .then(function (pks) {
                        return Promise.each(pks, function (pk) {
                            park[pk.siteId] = pk.modifiedOn;
                            redisclient.hset(config.redis.parkVersionName, pk.siteId, pk.modifiedOn);
                        });
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getAllParksVersion.parkError);
                    });
            }
        })
        .then(function () {
            var resultObj = errInfo.success;
            resultObj.result = park;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.getAllParksVersion.promiseError);
            }
        })
}

exports.getParksVersionBySiteId = function(req, res, next){
    var params = req.ext.params;
    var siteIdArr = [];
    var parksInfo = {};
    if (!req.ext.checkExistProperty(params, 'siteId')) {
        return res.ext.json(errInfo.getParksVersionBySiteId.paramsError);
    }
    if(util.isstring(params.siteId)){
        siteIdArr = params.siteId.split(',');
    }else {
        siteIdArr = params.siteId;
    }

    Promise.resolve()
        .then(function () {
            //从redis里获取
            return Promise.each(siteIdArr, function (siteId) {
                return redisclient.hget(config.redis.parkVersionName, siteId)
                    .then(function (parks) {
                        if(parks){
                            parksInfo[siteId] = parks;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        return Promise.reject(errInfo.getParksVersionBySiteId.redisGetError);
                    });
            });
        })
        .then(function () {
            //从Mongo里获取
            if(JSON.stringify(parksInfo) === '{}'){
                var condition = {siteId:{'$in': siteIdArr}};
                return parkModel.findAsync(condition)
                    .then(function (pks) {
                        return Promise.each(pks, function (pk) {
                            parksInfo[pk.siteId] = pk.modifiedOn;
                            redisclient.hset(config.redis.parkVersionName, pk.siteId, pk.modifiedOn);
                        });
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getParksVersionBySiteId.parkError);
                    });
                return Promise.reject(errInfo.getParksVersionBySiteId.promiseError);
            }
        })
        .then(function () {
            var resultObj = errInfo.success;
            resultObj.result = parksInfo;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                console.log(error);
                return res.ext.json(errInfo.getParksVersionBySiteId.promiseError);
            }
        });
}

exports.getParkBySiteId = function (req, res, next) {
    var params = req.ext.params;
    var parksInfo = [];
    var siteIdArr = [];
    var resultObj = errInfo.success;
    if (!req.ext.checkExistProperty(params, 'siteId')) {
        return res.ext.json(errInfo.getParkBySiteId.paramsError);
    }
    if(util.isstring(params.siteId)){
        siteIdArr = params.siteId.split(',');
    }else {
        siteIdArr = params.siteId;
    }

    Promise.resolve()
        .then(function () {
            //查询redis是否有缓存
            return Promise.each(siteIdArr, function (siteId) {
                return redisclient.hget(config.redis.parkName, siteId)
                    .then(function (parkCache) {
                        var pks = JSON.parse(parkCache);
                        if(pks && parkCache !== '{}'){
                            parksInfo.push(pks);
                        }else {
                            console.log("Can't find parks cache in Redis, pull parks from Mongo now.");
                            return parkCache;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        return Promise.reject(errInfo.getParkBySiteId.redisGetError);
                    });
            })
        })
        .then(function () {
            if(parksInfo.length > 0){
                resultObj.result = {};
                resultObj.result.parks = parksInfo;
                return Promise.reject(resultObj);
            }
        })
        .then(function () {
            //redis里无缓存，从Mongo里获取
            console.log('Get parks from Mongo...');
            redisclient.del(config.redis.parkName);
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
                .catch(function (err) {
                    if(err.status){
                        return Promise.reject(err);
                    }else {
                        return Promise.reject(errInfo.getParkBySiteId.parkError);
                    }
                })
        })
        .then(function (parks) {
            return Promise.each(parks, function (onePark) {
                var pushPark = new parkFilter(onePark);
                parksInfo.push(pushPark);
            })
        })
        .then(function () {
            if(parksInfo && parksInfo.length > 0){
                resultObj.result = {};
                redisclient.del(config.redis.parkName);
                resultObj.result.parks = parksInfo;
                return res.ext.json(resultObj);
            }else {
                return res.ext.json(errInfo.getParkBySiteId.notFind);
            }
        })
        .catch(function (error) {
            if(error.status){
                return res.ext.json(error);
            }else {
                return res.ext.json(errInfo.getParkBySiteId.promiseError);
            }
        });

}

