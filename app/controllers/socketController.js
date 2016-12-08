/**
 * Created by tianlisa on 15-2-5.
 */
var socketApi = require('../tools/socketApi.js');
var onList = socketApi.onList;
var emitList = socketApi.emitList;
var pubScribeList = socketApi.pubScribeList;
var statisticController = require('./statisticController.js');
var pubClient;
//var subClient = require('../databases/redisdb.js').subClient;
var redis = require('../redis/redis.js');
var redisClient = redis.redis;
var errInfo = require('../resfilter/resInfo.js').errInfo;
var async = require('async');
var common = require('../tools/common.js');
var config = require('../../config/config.js');
var apnsPrefix = 'APNS_Token_';
var androidPrefix = 'Android_Token_';
var userPrefix = 'Socket_UserId_';
var pushMsgType = require('../tools/enums.js').pushMsgType;
//使用path模块
var path = require('path');
var APNS = require('../tools/apns.js');
var util = require("util");
//var apnsConn = require('../tools/apns.js').connection;
var socketController=require('./socketController');

exports.connect = function (socket, io) {
    // console.log(socket.id);
    socket.on('getNewPhotosCountOfUser', function (t) {

        var room = io.sockets.manager.roomClients[socket.id];
        if (room.name != t) {
            socket.leave(room.name, function () {
                saveSocketToRedis(socket, t,io);
            });
        } else {
            saveSocketToRedis(socket, t,io);
        }


    })
//    dashboardHandle(socket);
    //   buildDashBoardSocket(socket);
}

function saveSocketToRedis(socket, tokenId,io, next) {
    redisClient.get(tokenId, function (err, reply) {
        if (err) {
            console.log('saveSocketToRedis', err);
        }
        //验证token是否存在
        if (reply) {
            var tokenInfo = JSON.parse(reply);
            //验证用户是否登录了
            if (tokenInfo.user == null) {
                console.log('saveSocketToRedis: user not login');
            } else {
                if(tokenInfo.baseInfo.socketId){
                    io.sockets.socket(tokenInfo.baseInfo.socketId).leave(tokenInfo.user._id);
                }
                tokenInfo.baseInfo.socketId = socket.id;
                setSocketIdOfUser(socket, tokenInfo.user._id);
                redisClient.set(tokenId, JSON.stringify(tokenInfo), function (err, reply) {
                    if (err) {
                        console.log('saveSocketToRedis', err);
                    }
                })
            }

        }
    })
}

function setSocketIdOfUser(socket, userId) {
    //console.log('---------------socketId+userId' + userId);
    socket.join(userId);


}
//发布事件
exports.publishEvents =function(eventName, data) {
    pubClient.publish(eventName, data);
}

//订阅事件
exports.subscribeEvents = function (io, pub, sub) {
    //指定发布的client
    pubClient = pub;

////订阅事件
    sub.subscribe(pubScribeList.pushNewPhotoCount);
    sub.subscribe(pubScribeList.pushNewOrderInfo);
    sub.subscribe(pubScribeList.pushDashBoardUpdate);
    sub.subscribe(pubScribeList.pushNewPhotoCountBySocketId);
    sub.subscribe(pubScribeList.pushNewOrderInfoBySocketId);
    sub.subscribe(pubScribeList.pushGuideAccountChange);
    sub.subscribe(pubScribeList.pushGuideAccountChangeBySocketId);
    sub.subscribe(pubScribeList.pushVideoGenerate);
    sub.subscribe(pubScribeList.pushVideoGenerateBySocketId);
    sub.subscribe(pubScribeList.pushUpgradedPhotos);
    sub.subscribe(pubScribeList.pushUpgradedPhotosBySocketId);

    sub.subscribe(pubScribeList.pushDoneOrderPay);
    sub.subscribe(pubScribeList.pushDoneOrderPayBySocketId);
    sub.subscribe(pubScribeList.pushDelPhotos);
    sub.subscribe(pubScribeList.pushDelPhotosBySocketId);
//
////监听订阅事件
    sub.on('message', function (eventName, data) {

        var jData = {};
        try {
            jData = JSON.parse(data);
        } catch (e) {
            jData = data;
        }
        switch (eventName) {
            //推送订单
            case pubScribeList.pushNewOrderInfo:
                io.sockets.in(jData.userId).emit(emitList.catchOrderInfoOf + jData.userId, {info: jData.info });
                break;
            case pubScribeList.pushNewOrderInfoBySocketId:
                var jData = JSON.parse(data);
                var info = 'You have a new order!';
                if (jData.orderInfos && jData.orderInfos.length == 1) {
                    info = jData.orderInfos[0];
                }
                ;
                io.sockets.socket(jData.socketId).emit(emitList.catchOrderInfoOf + jData.userId, {info: info });
                break;

            //推送新照片
            case pubScribeList.pushNewPhotoCount:
                io.sockets.in(jData.userId).emit(emitList.sendNewPhotosCountOf + jData.userId, {c: jData.c });
                break;
            case pubScribeList.pushNewPhotoCountBySocketId:
                io.sockets.socket(jData.socketId).emit(emitList.sendNewPhotosCountOf + jData.userId, {c: jData.c });
                break;

            //推送dashbaord更新数据
            case  pubScribeList.pushDashBoardUpdate:
                require('../dashBoard/dashBoard.js').getDashBoardData(function (err, r) {
                    io.sockets.in(config.dashboard.dashBoardRoom).emit(emitList.dashBoardData, r);
                })
                break;

            //推送导游账户变更信息
            case pubScribeList.pushGuideAccountChange:
                io.sockets.in(jData.userId).emit(emitList.sendGuideAccountChange + jData.userId, {c: jData.c });
                break;
            case pubScribeList.pushGuideAccountChangeBySocketId:
                io.sockets.socket(jData.socketId).emit(emitList.sendGuideAccountChange + jData.userId, {c: jData.c });
                break;

            //推送新视频信息
            case pubScribeList.pushVideoGenerate:
                io.sockets.in(jData.userId).emit(emitList.videoGenerate, {c: jData.c });
                break;
            case pubScribeList.pushVideoGenerateBySocketId:
                io.sockets.socket(jData.socketId).emit(emitList.videoGenerate, {c: jData.c });
                break;

            //图片清晰后推送清晰的图片数据
            case pubScribeList.pushUpgradedPhotos:
                io.sockets.in(jData.userId).emit(emitList.upgradedPhotos, {c: jData.c });
                break;
            case pubScribeList.pushUpgradedPhotosBySocketId:
                io.sockets.socket(jData.socketId).emit(emitList.upgradedPhotos, {c: jData.c });
                break;


            //订单异步支付完成后推送清晰的图片数据
            case pubScribeList.pushDoneOrderPay:
                io.sockets.in(jData.userId).emit(emitList.doneOrderPay, {c: jData.c });
                break;
            case pubScribeList.pushDoneOrderPayBySocketId:
                io.sockets.socket(jData.socketId).emit(emitList.doneOrderPay, {c: jData.c });
                break;

            //删除图片后推送删除的图片数据
            case pubScribeList.pushDelPhotos:
                io.sockets.in(jData.userId).emit(emitList.delPhotos, {c: jData.c });
                break;
            case pubScribeList.pushDelPhotosBySocketId:
                io.sockets.socket(jData.socketId).emit(emitList.delPhotos, {c: jData.c });
                break;

        }


    })
}
//iphone使用

exports.APNSConnect = function (req, res) {
    var params = req.ext.params;
    var userId = params.userId;;
//    var iphoneToken = req.query.iphoneToken;
    var appName = 'photoPass';
    if (params.appName) {
        appName = params.appName;
    }
    var tokenKey = params.iphoneToken || params.androidToken;
    var keyPrefix = apnsPrefix;
    if (params.androidToken) {
        keyPrefix = androidPrefix;
    }
//    console.log(appName);
//    console.log(keyPrefix + tokenKey);

    async.auto({
        getTokenUserId: function (callback) {
            redisClient.get(keyPrefix + tokenKey, function (err, reply) {
                if (err) {
                    console.log('APNSConnect', err);
                    return callback(errInfo.socketController.redisGetError);
                }
                var tokenInfo = JSON.parse(reply);
                //如果当前用户Id与token对应的userId不一致，则要做操作
                if (tokenInfo && tokenInfo.userId == userId) {
                    return callback(null, true, userId);
                }
                else if (!tokenInfo) {
                    return callback(null, false, userId);
                } else {
                    return callback(null, false, tokenInfo.userId);
                }
            })
        },
        setTokenUserId: ['getTokenUserId', function (callback, results) {
            if (results.getTokenUserId[0] == false) {
                redisClient.set(keyPrefix + tokenKey, JSON.stringify({userId: userId}), function (err, reply) {
                    if (err) {
                        console.log('APNSConnect', err);
                        return callback(errInfo.socketController.redisSetError);
                    }
                    if (reply) {
                        redisClient.expire(keyPrefix + tokenKey, config.redis.expireTime);
                        return callback(null, errInfo.success);
                    } else {
                        return callback(null, errInfo.success);
                    }
                })
            } else {
                return callback(null, errInfo.success);
            }
        }],
        removeToken: ['getTokenUserId', function (callback, results) {
            if (results.getTokenUserId[1] != userId) {
                redisClient.get(userPrefix + results.getTokenUserId[1], function (err, reply) {
                    if (err) {
                        console.log('APNSConnect', err);
                        return callback(errInfo.socketController.redisGetError);
                    }
                    var tokenInfo = JSON.parse(reply);
                    if (tokenInfo && tokenInfo.tokenList) {
                        for (var i = 0; i < tokenInfo.tokenList.length; i++) {
                            if ((tokenInfo.tokenList[i].iphoneToken == tokenKey && tokenInfo.tokenList[i].appName == appName) || tokenInfo.tokenList[i].androidToken == tokenKey) {
                                tokenInfo.tokenList.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        tokenInfo = {tokenList: []};
                    }
                    redisClient.set(userPrefix + results.getTokenUserId[1], JSON.stringify({tokenList: tokenInfo.tokenList}), function (err, reply) {
                        if (err) {
                            console.log('APNSConnect', err);
                            return callback(errInfo.socketController.redisSetError);
                        }
                        if (reply) {
                            redisClient.expire(userPrefix + results.getTokenUserId[1], config.redis.expireTime);

                        }
                        return callback(null, errInfo.success);
                    })

                });
            } else {
                return callback(null, errInfo.success);
            }
        }],
        addToken: ['getTokenUserId', function (callback, results) {
            // if (results.getTokenUserId[0] == false) {
            redisClient.get(userPrefix + userId, function (err, reply) {
                if (err) {
                    console.log('APNSConnect', err);
                    return callback(errInfo.socketController.redisGetError);
                }
                var tokenInfo = JSON.parse(reply);
                if (tokenInfo && tokenInfo.tokenList) {
                    var isContain = false;
                    for (var i = 0; i < tokenInfo.tokenList.length; i++) {
                        if ((tokenInfo.tokenList[i].iphoneToken == tokenKey && tokenInfo.tokenList[i].appName == appName) || tokenInfo.tokenList[i].androidToken == tokenKey) {

                            isContain = true;
                        }
                    }

                    if (isContain == false) {
                        if (keyPrefix == androidPrefix) {
                            tokenInfo.tokenList.push({androidToken: tokenKey, photoCount: 0});
                        } else if (keyPrefix == apnsPrefix) {
                            tokenInfo.tokenList.push({iphoneToken: tokenKey, photoCount: 0, appName: appName});
                        }

                    }
                } else {
                    tokenInfo = {tokenList: []};
                    if (keyPrefix == androidPrefix) {
                        tokenInfo.tokenList.push({androidToken: tokenKey, photoCount: 0});
                    } else if (keyPrefix == apnsPrefix) {
                        tokenInfo.tokenList.push({iphoneToken: tokenKey, photoCount: 0, appName: appName});
                    }
//                        console.log(keyPrefix + tokenKey);
//                        console.log(tokenInfo);
                }
                redisClient.set(userPrefix + userId, JSON.stringify(tokenInfo), function (err, reply) {
                    if (err) {
                        console.log('APNSConnect', err);
                        return callback(errInfo.socketController.redisSetError);
                    }
                    if (reply) {
                        redisClient.expire(userPrefix + userId, config.redis.expireTime);

                    }
                    return callback(null, errInfo.success);
                })

            });
        }]

    }, function (err, results) {
        if (err) {
            return res.ext.json(err);
        }
        else {
            return res.ext.json(errInfo.success);
        }
    });
}

//iphone使用
exports.APNSDisconnect = function (req, res) {
    var params = req.ext.params;
    var userId = params.userId;
//    var iphoneToken = req.query.iphoneToken;
    var tokenKey = params.iphoneToken || params.androidToken;
    var keyPrefix = apnsPrefix;
    if (params.androidToken) {
        keyPrefix = androidPrefix;
    }
    var appName = 'photoPass';
    if (params.appName) {
        appName = params.appName;
    }
    async.auto({
        getTokenUserId: function (callback) {
            redisClient.get(keyPrefix + tokenKey, function (err, reply) {
                if (err) {
                    console.log('APNSConnect', err);
                    return callback(errInfo.socketController.redisGetError);
                }
                if (reply) {
                    redisClient.expire(keyPrefix + tokenKey, 0);
                    return callback(null, errInfo.success);
                }
                return callback(null, errInfo.success);
            })
        },
        removeToken: function (callback, results) {

            redisClient.get(userPrefix + userId, function (err, reply) {
                if (err) {
                    console.log('APNSConnect', err);
                    return callback(errInfo.socketController.redisGetError);
                }
                var tokenInfo = JSON.parse(reply);
                if (tokenInfo && tokenInfo.tokenList) {
                    for (var i = 0; i < tokenInfo.tokenList.length; i++) {
                        if ((tokenInfo.tokenList[i].iphoneToken == tokenKey && tokenInfo.tokenList[i].appName == appName) || tokenInfo.tokenList[i].androidToken == tokenKey) {
                            tokenInfo.tokenList.splice(i, 1);
                            break;
                        }
                    }
                    redisClient.set(userPrefix + userId, JSON.stringify({tokenList: tokenInfo.tokenList}), function (err, reply) {
                        if (err) {
                            console.log('APNSConnect', err);
                            return callback(errInfo.socketController.redisSetError);
                        }
                        if (reply) {
                            redisClient.expire(userPrefix + userId, config.redis.expireTime);

                        }
                        redisClient.set(userPrefix + userId, JSON.stringify({tokenList: tokenInfo.tokenList}), function (err, reply) {
                            if (err) {
                                console.log('APNSConnect', err);
                                return callback(errInfo.socketController.redisSetError);
                            }
                            if (reply) {
                                redisClient.expire(userPrefix + userId, config.redis.expireTime);

                            }
                            return callback(null, errInfo.success);
                        })

                    })

                } else {
                    return callback(null, errInfo.success);
                }

            });

        }

    }, function (err, results) {
        if (err) {
            return res.ext.json(err);
        }
        else {
            return res.ext.json(errInfo.success);
        }
    });
}


exports.clearSocketData = function (req, res) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, ['userId'])) {
        return res.ext.json(errInfo.socketController.clearSocketData);
    }

    var userId = params.userId;
    var appName = 'photoPass';
    if (params.appName) {
        appName = params.appName;
    }
//    var iphoneToken = req.query.iphoneToken;
    var sType = pushMsgType.photoSend;
    if (params.clearType && params.clearType != pushMsgType.photoSend) {
        sType = params.clearType;
    }
    var tokenKey = params.iphoneToken || params.androidToken;
    var keyPrefix = apnsPrefix;
    if (params.androidToken) {
        keyPrefix = androidPrefix;
    }

    redisClient.get(userPrefix + userId, function (err, reply) {
        if (err) {
            console.log('clearSocketData', err);
            return res.ext.json(errInfo.socketController.redisGetError);
        }
        var tokenInfo = JSON.parse(reply);
        if (tokenInfo && tokenInfo.tokenList) {
            for (var i = 0; i < tokenInfo.tokenList.length; i++) {
                if ((tokenInfo.tokenList[i].iphoneToken == tokenKey && tokenInfo.tokenList[i].appName == appName) || tokenInfo.tokenList[i].androidToken == tokenKey) {
                    if (sType == pushMsgType.photoSend) {
                        tokenInfo.tokenList[i].photoCount = 0;
                    } else if (sType == pushMsgType.orderSend) {
                        tokenInfo.tokenList[i].orderInfos = [];
                    } else if (sType == pushMsgType.accountChange) {
                        tokenInfo.tokenList[i].accountChanges = [];
                    } else if (sType == pushMsgType.videoGenerate) {
                        tokenInfo.tokenList[i].videoCount = 0;
                    }
                    else if (sType == pushMsgType.upgradedPhoto) {
                        tokenInfo.tokenList[i].upgradedPhotos = [];
                    }
                    else if (sType == pushMsgType.doneOrderPay) {
                        tokenInfo.tokenList[i].donePayOrders = [];
                    }
                    else if (sType == pushMsgType.delPhotos) {
                        tokenInfo.tokenList[i].delPhotos = [];
                    }
                    break;
                }
            }
            redisClient.set(userPrefix + userId, JSON.stringify(tokenInfo), function (err, reply) {
                if (err) {
                    console.log('clearSocketData', err);
                    return res.ext.json(errInfo.socketController.redisSetError);
                }
                return res.ext.json();
            });
        } else {
            return res.ext.json();
        }

    });
}


exports.getSocketData=function(req,res){
    var params = req.ext.params(req, res);
    if(!req.ext.checkExistProperty(params, ['userId'])) {
        return res.ext.json(errInfo.socketController.getSocketData);
    }
    var userId = params.userId;
    var appName = 'photoPass';
    if (params.appName) {
        appName = params.appName;
    }
//    var iphoneToken = req.query.iphoneToken;

    var tokenKey = params.iphoneToken || params.androidToken;
    var keyPrefix = apnsPrefix;
    if (params.androidToken) {
        keyPrefix = androidPrefix;
    }

    redisClient.get(userPrefix + userId, function (err, reply) {
        if (err) {
            console.log('clearSocketData', err);
            return res.ext.json(errInfo.socketController.redisGetError);
        }
        var tokenInfo = JSON.parse(reply);
        var pushMsgs=null;
        if (tokenInfo && tokenInfo.tokenList) {
            for (var i = 0; i < tokenInfo.tokenList.length; i++) {
                if ((tokenInfo.tokenList[i].iphoneToken == tokenKey && tokenInfo.tokenList[i].appName == appName) || tokenInfo.tokenList[i].androidToken == tokenKey) {
                    pushMsgs=tokenInfo.tokenList[i];
                    tokenInfo.tokenList.splice(i, 1);
                    if (keyPrefix == androidPrefix) {
                        tokenInfo.tokenList.push({androidToken: tokenKey, photoCount: 0});
                    } else if (keyPrefix == apnsPrefix) {
                        tokenInfo.tokenList.push({iphoneToken: tokenKey, photoCount: 0, appName: appName});
                    }
                    break;
                }
            }
            redisClient.set(userPrefix + userId, JSON.stringify(tokenInfo), function (err, reply) {
                if (err) {
                    console.log('clearSocketData', err);
                    return res.ext.json(errInfo.socketController.redisSetError);
                }
                var resultObj = errInfo.success;
                resultObj.result.result = pushMsgs
                return res.ext.json(resultObj);
            });
        } else {
            return res.ext.json();
        }

    });
}

exports.sendNotification = function(userId, c, fn, pushType) {
    redisClient.get(userPrefix + userId, function (err, reply) {
        var type = pushType || pushMsgType.photoSend;
        if (err) {
            console.log('sendNotification', err);
            fn();
        }
        var tokenInfo = JSON.parse(reply);
        if (tokenInfo && tokenInfo.tokenList) {
            var bak_c = c;
//            var connection = apnsConn;
            var count = 0;
            var words = "";
            var aps={};
            if (tokenInfo.tokenList.length > 0) {
                async.each(tokenInfo.tokenList, function (token, cb) {
                    switch (type) {
                        case pushMsgType.photoSend:
                            bak_c = c;
                            if (token.photoCount) {
                                bak_c = bak_c + token.photoCount;
                                token.photoCount = bak_c;
                            } else {
                                token.photoCount = bak_c;
                            }
                            if (bak_c == 1) {
                                words = "有新的迪士尼乐拍通照片等着你！You have new Disney PhotoPass photo!";
                            }
                            break;

                        case pushMsgType.orderSend:
                            if (!token.orderInfos) {
                                token.orderInfos = [];
                            }
                            token.orderInfos.push(c);
                            words = c;
                            break;

                        case pushMsgType.accountChange:
                            if (!token.accountChanges) {
                                token.accountChanges = [];
                            }
                            token.accountChanges.push(c);
                            words = c;
                            break;
                        case pushMsgType.videoGenerate:
                            bak_c = c;
                            if (token.videoCount) {
                                bak_c = bak_c + token.videoCount;
                                token.videoCount = bak_c;
                            } else {
                                token.videoCount = bak_c;
                            }
                            if (bak_c == 1) {
                                words = "You have new video!";
                            }else{
                                words="You have new videos!"
                            }

                            break;
                        case pushMsgType.upgradedPhoto:
                            if (!token.upgradedPhotos) {
                                token.upgradedPhotos = [];
                            }
                            token.upgradedPhotos.push(c);

                            words = "";
                            aps=c;
                            break;
                        case pushMsgType.doneOrderPay:
                            if (!token.donePayOrders) {
                                token.donePayOrders = [];
                            }
                            token.donePayOrders.push(c);
                            words="";
                            aps=c;
                            aps.badge=1;
                            break;
                        case pushMsgType.delPhotos:
                            if (!token.delPhotos) {
                                token.delPhotos = [];
                            }
                            token.delPhotos.push(c);
                            words="";
                            aps=c;
                            break;
                    }

                    if (token.iphoneToken && token.iphoneToken != '(null)') {

                        var notification = new APNS.apns.Notification();
                        notification.device = new APNS.apns.Device(token.iphoneToken);
                        notification.alert = words;
                        notification.sound = 'default';
                        aps.pushType=pushType;
                        notification.payload.aps=aps;
                        APNS.sendNotification(notification, token.appName);
                        count++;
                        if (count == tokenInfo.tokenList.length) {
                            cb(true);
                        }
                        for (var t = 0; t < 80000; t++) {
                            t++;
                        }
                    } else {
                        count++;
                        if (count == tokenInfo.tokenList.length) {
                            cb(true);
                        }
                    }
                }, function (result) {
                    redisClient.set(userPrefix + userId, JSON.stringify(tokenInfo), function (err, reply) {
                        if (err) {
                            console.log('sendNotification', err);
                        }
//
                        fn();

                    });
                })
            } else {
                fn();
            }


        } else {
            fn();
        }


    });


}

//test APNS send
//e987201868c7a51e1349f58d7feb4a796cc50c6dec4be99da8f938dcd2908a0f
//pushAPNSMessage('ae45b92998600d4382e4b984a0fc1c3f87ae278a741710bee08213aba495a079',pushMsgType.videoGenerate,'1','photoPass');
//
// //
// var notification = new APNS.apns.Notification();
//
// notification.device = new APNS.apns.Device('d7255320 3272f5bd 3ffde64e 18ce784f bfa2924e 160307fd 5d131300 88fbe31c');
// //var c='guide Rebate:'+'royalty'+' RMB '+9*3;
//        notification.sound = 'default';
//        notification.alert ="you have new photos";
// //notification.badge=1;
// notification.payload.aps={pushType:'photoSend'};
//
// APNS.sendNotification(notification,'photoPass');

//APNS.sendNotification(notification,'photoPass');

//function pushAPNSMessage(iphoneToken, pushType, content, appName) {
//
//    var notification = new APNS.apns.Notification();
//
//    notification.device = new APNS.apns.Device(iphoneToken);
//    notification.sound = 'default';
//    var aps={};
//    var words="";
//    switch (pushType) {
//        case pushMsgType.photoSend:
//
//            words= "you have new photos!";
//            break;
//        case pushMsgType.orderSend:
//
//            if (content && content.length == 1) {
//                words= content[0];
//            } else {
//                words= 'you have new orders!';
//            }
//
//            break;
//        case pushMsgType.accountChange:
//
//            if (content && content.length == 1) {
//                words = content[0];
//            } else {
//                words= 'you have several trades messages';
//            }
//            break;
//        case pushMsgType.videoGenerate:
//
//            words= "you have new videos!";
//            break;
//        case pushMsgType.upgradedPhoto:
//
//            words = '';
//            aps=content;
//            break;
//        case pushMsgType.doneOrderPay:
//            words = '';
//            aps=content;
//            aps.badge=1;
//            break;
//        default:
//            words='you have new photos!';
//    }
//    aps.pushType=pushType;
//    notification.alert = words;
//    notification.payload.aps=aps;
//    APNS.sendNotification(notification, appName);
//
//}


//function pushAndroidMessage(socketId, pushType, params) {
//    switch (pushType) {
//        case pushMsgType.photoSend:
//            pubClient.publish(pubScribeList.pushNewPhotoCountBySocketId, JSON.stringify({socketId: socketId, userId: params.userId, c: params.c}));
//            break;
//        case pushMsgType.orderSend:
//            pubClient.publish(pubScribeList.pushNewOrderInfoBySocketId, JSON.stringify({socketId: socketId, userId: params.userId, c: params.orderInfos}));
//            break;
//        case pushMsgType.accountChange:
//            pubClient.publish(pubScribeList.pushGuideAccountChangeBySocketId, JSON.stringify({socketId: socketId, userId: params.userId, c: params.accountChanges}));
//            break;
//        case pushMsgType.videoGenerate:
//            pubClient.publish(pubScribeList.pushVideoGenerateBySocketId, JSON.stringify({socketId: socketId, userId: params.userId, c: params.c}));
//            break;
//        case pushMsgType.upgradedPhoto:
//            pubClient.publish(pubScribeList.pushUpgradedPhotosBySocketId, JSON.stringify({socketId: socketId, userId: params.userId, c: params.c}));
//            break;
//        case pushMsgType.doneOrderPay:
//            pubClient.publish(pubScribeList.pushDoneOrderPayBySocketId, JSON.stringify({socketId: socketId, userId: params.userId, c: params.donePayOrders}));
//            break;
//    }
//}

//function pushAndroidByUserId(userId, pushType, params) {
//    switch (pushType) {
//        case pushMsgType.photoSend:
//            pubClient.publish(pubScribeList.pushNewPhotoCount, JSON.stringify({userId: userId, c: params.c}));
//            break;
//        case pushMsgType.orderSend:
//            pubClient.publish(pubScribeList.pushNewOrderInfo, JSON.stringify({userId: userId, c: params.orderInfos}));
//            break;
//        case pushMsgType.accountChange:
//            pubClient.publish(pubScribeList.pushGuideAccountChange, JSON.stringify({userId: userId, c: params.accountChanges}));
//            break;
//        case pushMsgType.videoGenerate:
//            pubClient.publish(pubScribeList.pushVideoGenerate, JSON.stringify({userId: userId, c: params.c}));
//            break;
//        case pushMsgType.upgradedPhoto:
//            pubClient.publish(pubScribeList.pushUpgradedPhotos, JSON.stringify({userId: userId, c: params.c}));
//            break;
//        case pushMsgType.doneOrderPay:
//            pubClient.publish(pubScribeList.pushDoneOrderPay, JSON.stringify({userId: userId, c: params.donePayOrders}));
//            break;
//    }
//}

exports.pushToUsersHttp=function(req,res){
    var pushType, userIds, pubScribe,content;
    var params = req.ext.params;
    userIds=params.userIds;
    pubScribe=params.pubScribe;
    pushType=params.pushType;
    content=params.content;
    async.auto({
        pushIOS: function (callback) {
            var count = 0;
            async.each(userIds, function (userId, cb) {
                socketController.sendNotification(userId, content, function () {

                    count++;
                    if (count == userIds.length) {

                        return cb(true);
                    }
                }, pushType);


            }, function (err) {

                return callback(null, true);
            })

        },
        pushAndroid: ['pushIOS', function (callback, results) {
            var count = 0;
            async.each(userIds, function (userId, cb) {

                socketController.publishEvents(pubScribe, JSON.stringify({userId: userId, c: content}));

                return callback(null, true);
            })


        }]
    }, function (err, results) {
        if (err) {
            console.log('pushToUsersHttp', err);
        }
        return res.ext.json();
    })
}

exports.pushToUsers = function (pushType, userIds, pubScribe,content,fn) {
//    console.log(userIds);
    async.auto({
        pushIOS: function (callback) {
            var count = 0;
            async.each(userIds, function (userId, cb) {
                socketController.sendNotification(userId, content, function () {

                    count++;
                    if (count == userIds.length) {

                        return cb(true);
                    }
                }, pushType);


            }, function (err) {

                return callback(null, true);
            })

        },
        pushAndroid: ['pushIOS', function (callback, results) {
            var count = 0;
            async.each(userIds, function (userId, cb) {

                socketController.publishEvents(pubScribe, JSON.stringify({userId: userId, c: content}));

                return callback(null, true);
            })


        }]
    }, function (err, results) {
        if (err) {
            console.log('pushNewPhotoCount', err);
        }
        fn();
    })
}

//数据统计相关处理
function dashboardHandle(socket) {
    socket.on(onList.getAllStatistics, function () {
        statisticController.getPhotoCount('', function (c) {
            socket.emit(emitList.photoCount, c);
        });
        statisticController.getPPCount('', function (c) {
            socket.emit(emitList.ppCount, c);
        })
        statisticController.getPaidPhotoCount('', function (c) {
            socket.emit(emitList.paidPhotoCount, c);
        })
        statisticController.getSales(function (c) {
            socket.emit(emitList.totalSales, c);
        })
        statisticController.getPPPCount(function (c) {
            socket.emit(emitList.pppCount, c);
        })

    })
    //更新拍摄的照片数
    socket.on(onList.tokenPhotos, function (params) {
        var num = 0;
        var locationId = '';

        if (params) {
            if (params.num != null) {
                num = parseInt(params.num);
            }
            if (params.locationId) {
                locationId = params.locationId.toString().trim();
            }
        }
        statisticController.addPhotoCount(num, locationId, function (data) {
            if (parseInt(data.photoCount) > 0) {
                if (locationId.length > 0) {
                    locationId = '.' + locationId;
                }

                socket.broadcast.emit(emitList.photoCount + '.' + '54f11c4495ac13e43b72b1cc' + locationId, data);
            }
        });
    });
    //更新扫描的pp数
    socket.on(onList.bindPhotosToPP, function (params) {
        var locationId = '';
        var pp = '';
        var buyCount = 0;
        if (params) {
            if (params.pp) {
                pp = params.pp.toString().trim();
            }
            if (params.locationId) {
                locationId = params.locationId.toString().trim();
            }
            if (params.buyCount != null) {
                buyCount = parseInt(params.buyCount);
            }
        }
        if (pp.length > 0) {
            statisticController.addPPCount(pp, locationId, function (data) {
                    if (parseInt(data.ppCount) > 0) {
                        if (locationId.length > 0) {
                            locationId = '.' + locationId;
                        }
                        socket.broadcast.emit(emitList.ppCount + locationId, data);
                    }

                }
            )
            if (buyCount == 1) {
                statisticController.addPaidPhotoCount(1, locationId.replace('.', ''), function (data) {
                    if (data.paidPhotoCount > 0) {
                        socket.broadcast.emit(emitList.paidPhotoCount + locationId, data);
                    }
                })
            }

        }

    })

    //购买照片更新收入总数
    socket.on(onList.paidForPhotos, function (params) {
        var sales = 0;
        var buyCount = 0;
        if (params) {
            if (params.sales != null) {
                sales = parseFloat(params.sales);
            }
            if (params.buyCount != null) {
                buyCount = parseInt(params.buyCount);
            }
        }
        if (sales > 0) {
            statisticController.addSales(sales, function (data) {
                    if (parseInt(data.totalSales) > 0) {
                        socket.broadcast.emit(emitList.totalSales, data);
                    }

                }
            )
            if (buyCount == 1) {
                statisticController.addPaidPhotoCount(1, '', function (data) {
                    socket.broadcast.emit(emitList.paidPhotoCount, data);
                })
            }
        }

    })

    //购买PP+，增加收入总数
    socket.on(onList.paidForPPP, function (params) {
        var sales = 0;
        var ppp = '';
        if (params) {
            if (params.sales != null) {
                sales = parseFloat(params.sales);
            }
            if (params.ppp != null) {
                ppp = params.ppp;
            }
        }
        if (sales > 0) {
            statisticController.addSales(sales, function (data) {
                    if (parseInt(data.totalSales) > 0) {
                        socket.broadcast.emit(emitList.totalSales, data);
                    }

                }
            )
            if (ppp.length > 0) {
                statisticController.addPPPCount(ppp, function (data) {
                    socket.broadcast.emit(emitList.pppCount, data);
                })
            }
        }

    })

    socket.on(onList.bindPPToPPP, function (params) {
        var paidPhotoCount = 0;
//        var buyCount=0;
        if (params) {
            if (params.paidPhotoCount != null) {
                paidPhotoCount = parseInt(params.paidPhotoCount);
            }
//            if (params.buyCount!=null) {
//                buyCount =parseInt(params.buyCount);
//            }
        }
        if (paidPhotoCount > 0) {
            statisticController.addPaidPhotoCount(paidPhotoCount, function (data) {
                    if (parseInt(data.paidPhotoCount) > 0) {
                        socket.broadcast.emit(emitList.paidPhotoCount, data);
                    }
                }
            )
//            if(buyCount==1){
//                statisticController.addPaidPhotoCount(1,'',function(data){
//                    socket.broadcast.emit(emitList.paidPhotoCount, data);
//                })
//            }
        }
    })
}
