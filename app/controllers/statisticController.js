/**
 * Created by tianlisa on 15-2-3.
 */
var redis= require('../redis/redis.js').redis;
var errInfo = require('../filters/errorFilter.js').ENInfo;
var statistics = require('../tools/enums.js').statistics;
var config = require('../../config/config.js');
var log = config.logger('statisticsController');
var async = require('async');
//var io=require('socket.io-emitter')(redis);

//拍摄的图片数photoCount
//更新图片数，包括点的
exports.addPhotoCount = function (num, locationId, callback) {
    if (num == 0) {
        return callback({photoCount: 0});
    }
    if (locationId.length > 0) {
        locationId = ":" + locationId;
    }
//    io.emit('ppp.123456','hello world');
//    var opKey = statistics.photoCount + locationId;
    var opKey = statistics.photoCount;
    redis.select(1, function () {

        redis.get(opKey, function (err, photoCount) {
            if (err) {
                log.error('addPhotoCount', err);
//                return res.send(errInfo.errRedisGet);
                return callback({photoCount: 0});
            }
            ;
            if (photoCount) {
                redis.set(opKey, parseInt(photoCount) + num, function (err) {
                    if (err) {
                        log.error('addPhotoCount', err);
//                       return res.send(errInfo.send)
                        return callback({photoCount: 0});
                    }
                    return callback({photoCount: parseInt(photoCount) + num});
                })
            } else {
                redis.set(opKey, num, function (err) {
                    if (err) {
                        log.error('addPhotoCount', err);
//                       return res.send(errInfo.send)
                        return callback({photoCount: 0});
                    }
                    return callback({photoCount: num});
                })
            }

        })
    })
}


//新增付费的图片数量
exports.addPaidPhotoCount = function (num, locationId, callback) {
    if (num == 0) {
        return callback({paidPhotoCount: 0});
    }
    if (locationId.length > 0) {
        locationId = ":" + locationId;
    }
//    var opKey = statistics.paidPhotoCount + locationId;
    var opKey = statistics.paidPhotoCount;
    redis.select(1, function () {

        redis.get(opKey, function (err, photoCount) {
            if (err) {
                log.error('addPaidPhotoCount', err);
//                return res.send(errInfo.errRedisGet);
                return callback({paidPhotoCount: 0});
            }
            ;
            if (photoCount) {
                redis.set(opKey, parseInt(photoCount) + num, function (err) {
                    if (err) {
                        log.error('addPaidPhotoCount', err);
//                       return res.send(errInfo.send)
                        return callback({paidPhotoCount: 0});
                    }
                    return callback({paidPhotoCount: parseInt(photoCount) + num});
                })
            } else {
                redis.set(opKey, num, function (err) {
                    if (err) {
                        log.error('addPaidPhotoCount', err);
//                       return res.send(errInfo.send)
                        return callback({paidPhotoCount: 0});
                    }
                    return callback({paidPhotoCount: num});
                })
            }

        })
    })
}

exports.addSales = function (sales, callback) {
    if (sales == 0) {
        return callback({totalSales: 0});
    }
    var opKey = statistics.revenue;
    redis.select(1, function () {

        redis.get(opKey, function (err, totalSales) {
            if (err) {
                log.error('addSales', err);
//                return res.send(errInfo.errRedisGet);
                return callback({totalSales: 0});
            }
            ;
            if (totalSales) {
                redis.set(opKey, parseFloat(totalSales) + sales, function (err) {
                    if (err) {
                        log.error('addSales', err);
//                       return res.send(errInfo.send)
                        return callback({totalSales: 0});
                    }
                    return callback({totalSales: parseFloat(totalSales) + sales});
                })
            } else {
                redis.set(opKey, sales, function (err) {
                    if (err) {
                        log.error('addSales', err);
//                       return res.send(errInfo.send)
                        return callback({totalSales: 0});
                    }
                    return callback({totalSales: sales});
                })
            }

        })
    })
}

//pp数
exports.addPPCount = function (pp, locationId, callback) {
//    if (!req.body || !req.body.pp || !req.body.locationId) {
//        return res.send(errInfo.incomplete);
//    }
//    var pp = req.body.pp;
//    var locationId = req.body.locationId;
    if (locationId.length > 0) {
        locationId = ":" + locationId;
    }
//    var opKey = statistics.ppCount + locationId;
    var opKey = statistics.ppCount;
    redis.select(1, function () {
        redis.SMEMBERS(opKey, function (err, ppList) {
            if (err) {
                log.error('addPPCount', err);
//                return res.send(errInfo.errRedisGet);
                return callback({ppCount: 0});
            }
            redis.SADD(opKey, pp, function (err, i) {
                if (err) {
                    log.error('addPPCount', err);
//                       return res.send(errInfo.send)
                    return callback({ppCount: 0});
                }
                return callback({ppCount: ppList.length + i});

            })


        })

    })
}


//ppp数
exports.addPPPCount = function (ppp, callback) {

//    var num = req.body.ppp;
//    var locationId = req.body.locationId;
//    if(locationId.length>0){
//        locationId=":"+locationId;
//    }
    var opKey = statistics.pppCount;
    redis.select(1, function () {
        redis.SMEMBERS(opKey, function (err, pppList) {
            if (err) {
                log.error('addPPPCount', err);
//                return res.send(errInfo.errRedisGet);
                return callback({pppCount: 0});
            }
            redis.SADD(opKey, ppp, function (err, i) {
                if (err) {
                    log.error('addPPPCount', err);
                    return callback({pppCount: 0});
//                       return res.send(errInfo.send)
                }
                return callback({pppCount: pppList.length + i});
            })


        })

    })
}


//获取图片的数量
exports.getPhotoCount = function (locationId, callback) {

    if (locationId.length > 0) {
        locationId = ":" + req.query.locationId;
    }
    var opKey = statistics.photoCount + locationId;
    redis.select(1, function () {
        redis.get(opKey, function (err, photoCount) {
            if (err) {
                log.error('getPhotoCount', err);
                return callback({photoCount: photoCount})
            }
            if (photoCount) {
                return callback({photoCount: photoCount});
            } else {
                return callback({photoCount: 0});
            }
        })
    })
}


//新增付费的图片数量
exports.getPaidPhotoCount = function (locationId, callback) {

    if (locationId.length > 0) {
        locationId = ":" + locationId;
    }
    var opKey = statistics.paidPhotoCount + locationId;
    redis.select(1, function () {
        redis.get(opKey, function (err, photoCount) {
            if (err) {
                log.error('getPaidPhotoCount', err);
                return callback({paidPhotoCount: photoCount})
            }
            if (photoCount) {
                return callback({paidPhotoCount: photoCount});
            } else {
                return callback({paidPhotoCount: 0});
            }
        })
    })
}

exports.getSales = function (callback) {

    var opKey = statistics.revenue;
    redis.select(1, function () {
        redis.get(opKey, function (err, revenue) {
            if (err) {
                log.error('getSales', err);
                return callback({totalSales: revenue})
            }
            if (revenue) {
                return callback({totalSales: revenue});
            } else {
                return callback({totalSales: 0});
            }
        })
    })
}

//pp数
exports.getPPCount = function (locationId, callback) {

    if (locationId.length > 0) {
        locationId = ":" + locationId;
    }
    var opKey = statistics.ppCount + locationId;
    redis.select(1, function () {
        redis.SMEMBERS(opKey, function (err, ppList) {
            if (err) {
                log.error('getPPCount', err);
//                return res.send(errInfo.errRedisGet);
                return callback({ppCount: 0});
            }

            return callback({ppCount: ppList.length});
        })

    })
}


//ppp数
exports.getPPPCount = function (callback) {

//    var num = req.body.ppp;
//    var locationId = req.body.locationId;
//    if(locationId.length>0){
//        locationId=":"+locationId;
//    }
    var opKey = statistics.pppCount;
    redis.select(1, function () {
        redis.SMEMBERS(opKey, function (err, pppList) {
            if (err) {
                log.error('getPPPCount', err);
//                return res.send(errInfo.errRedisGet);
                return callback({pppCount: 0});
            }
            return callback({pppCount: pppList.length})

        })

    })
}
