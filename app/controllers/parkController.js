/**
 * Created by xueting-bo on 16/11/20.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;
var parkModel = require('../mongodb/Model/parkModel');
var common = require('../tools/common.js');
var redisclient=require('../rq').redisclient;
var config = require('../../config/config.js').config;
var util=require('../../config/util.js');
var request = require('request');

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
    var result = [];
    Promise.resolve()
        .then(function () {
            //查询redis是否有缓存
            return redisclient.get(config.redis.parkName)
                .then(function (parkCache) {
                    if(parkCache){
                        resultObj.result.parks = JSON.parse(parkCache);
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
            return Promise.mapSeries(parks, function (onePark) {
                var parkInfo = {};
                parkInfo.park = onePark;
                return redisclient.incr(config.redis.parkVersionName + onePark.siteId)
                    .then(function (version) {
                        parkInfo.version = version;
                        result.push(parkInfo);
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getAllParks.redisSetError)
                    });
            });
        })
        .then(function () {
            return redisclient.set(config.redis.parkName, JSON.stringify(result))
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
                console.log(error);
                return res.ext.json(errInfo.getAllParks.promiseError);
            }
        });
}

exports.getParksVersionBySiteId = function(req, res, next){
    var params = req.ext.params;
    var siteIdArr = [];
    var parksInfo = [];
    if (!req.ext.haveOwnproperty(params, 'siteId')) {
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
            if(!(/^(A|a)ll$/.test(siteIdArr[0]))){
                return Promise.each(siteIdArr, function (siteId) {
                    var park = {};
                    if(siteId){
                        return redisclient.get(config.redis.parkVersionName+siteId)
                            .then(function (version) {
                                if(version){
                                    park.siteId = siteId;
                                    park.version = version;
                                    parksInfo.push(park);
                                }
                            })
                    }else {
                        return Promise.reject(errInfo.getParksVersionBySiteId.paramsError);
                    }
                });
            }else {
                return redisclient.get(config.redis.parkName)
                    .then(function (parks) {
                        if(JSON.parse(parks)){
                            return Promise.each(JSON.parse(parks), function (pk) {
                                var park = {};
                                park.siteId = pk.park.siteId;
                                park.version = pk.version;
                                parksInfo.push(park);
                            })
                        }
                    })
                    .catch(function (error) {
                        return Promise.reject(errInfo.getParksVersionBySiteId.redisGetError);
                    });
            }
        })
        .then(function () {
            //从Mongo里获取
            console.log(parksInfo);
            if(!parksInfo && !(/^(A|a)ll$/.test(siteIdArr[0]))){
                var condition = {'$in': siteIdArr};
                return parkModel.findAsync(condition)
                    .then(function (pks) {
                        return Promise.each(pks, function (pk) {
                            var park = {};
                            park.siteId = pk.siteId;
                            park.version = pk.version;
                            parksInfo.push(park);
                        });
                        redisclient.del(config.redis.parkName);
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getParksVersionBySiteId.parkError);
                    })
            }else if(!parksInfo && (/^(A|a)ll$/.test(siteIdArr[0]))){
                return parkModel.findAsync({})
                    .then(function (pks) {
                        return Promise.each(pks, function (pk) {
                            var park = {};
                            park.siteId = pk.siteId;
                            park.version = pk.version;
                            parksInfo.push(park);
                        });
                        redisclient.del(config.redis.parkName);
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getParksVersionBySiteId.parkError);
                    });
            }else if(parksInfo){
                var resultObj = errInfo.success;
                resultObj.result.parks = parksInfo;
                return res.ext.json(resultObj);
            } else {
                return Promise.reject(errInfo.getParksVersionBySiteId.promiseError);
            }
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
    var siteIdArr = [];
    if (!req.ext.haveOwnproperty(params, 'siteId')) {
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
            return redisclient.get(config.redis.parkName)
                .then(function (parkCache) {
                    var pks = JSON.parse(parkCache);
                    if(pks && pks.length > 0){
                        return Promise.each(siteIdArr, function (siteId) {
                            return Promise.each(pks, function (pk) {
                                if(pk.park.siteId == siteId){
                                    var park = {};
                                    park.park = pk.park;
                                    park.version = pk.version;
                                    parksInfo.push(park);
                                }
                            })
                        })
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
        .then(function () {
            if(parksInfo.length > 0){
                resultObj.result.parks = parksInfo;
                return Promise.reject(resultObj);
            }
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
            return Promise.mapSeries(parks, function (onePark) {
                var parkInfo = {};
                parkInfo.park = onePark;
                return redisclient.incr(config.redis.parkVersionName+onePark.siteId)
                    .then(function (version) {
                        parkInfo.version = version;
                        parksInfo.push(parkInfo);
                    })
                    .catch(function (err) {
                        return Promise.reject(errInfo.getParkBySiteId.redisSetError)
                    });
            });
        })
        .then(function () {
            pullAllParksCacheIntoRedis();
            if(parksInfo && parksInfo.length > 0){
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

function pullAllParksCacheIntoRedis() {
    Promise.resolve()
        .then(function () {
            //先把redis里存在的缓存删除
            return redisclient.del(config.redis.parkName);
        })
        .then(function () {
            console.log('begin pull parks cache into redis');
            return request('http://localhost:'+config.port+'/park/getAllParks');
        })
        .catch(function (error) {
            console.log(error);
        });
}