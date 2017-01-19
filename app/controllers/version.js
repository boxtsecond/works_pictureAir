/**
 * Created by meteor on 16/11/22.
 */
var rq=require('../rq');
var Promise=rq.Promise;
var versionModel=rq.versionModel;
var redisclient=rq.redisclient;
var configData=rq.configData;
var errInfo=rq.resInfo.errInfo;
// 先从redis 删除
// 然后从mongodb 同步到redis
function  geIosUp(req,res) {
    // 从redis里面取
    //从mongodb 里面取
    Promise.resolve(req.ext.params).then(function (obj) {
        return redisclient.get("version:-ios").then(function(access_token){
            if(!access_token){
                return obj;
            }else {
               return Promise.reject([200,'success',JSON.parse(access_token)]);
            }
        }).catch(function(err){
            if(req.ext.isArray(err)) return  Promise.reject(err);
            else  return  Promise.reject(errInfo.userRegisterRedisGetTokenError);
        });

    }).then(function (obj) {
        return versionModel.findOneAsync({"versionOS":"ios"},{versionOS:1,_id:0,version:1,appName:1,downloadChannel:1,content:1,mandatory:1})
            .catch(function(err){
                return  Promise.reject(errInfo.userRegisterRedisGetTokenError);
            });
    }).then(function (obj) {
        // 缓存redis
        return redisclient.setex("version:-ios",configData.expireTime.versionExpireTime,
            JSON.stringify(obj)).then(function(err){
            return  obj
        }).catch(function(err){
            return obj
        });
    }).then(function (obj) {
        res.ext.json([200,'success',obj]);
    })
        .catch(function(err){
        res.ext.json(err);
    });
}


function  geAndroidUp(req,res) {
    // 从redis里面取
    //从mongodb 里面取
    Promise.resolve(req.ext.params).then(function (obj) {
        return redisclient.get("version:-android").then(function(access_token){
            if(!access_token){
                return obj;
            }else {
                return Promise.reject([200,'success',JSON.parse(access_token)]);
            }
        }).catch(function(err){
            if(req.ext.isArray(err)) return  Promise.reject(err);
            else    return  Promise.reject(errInfo.userRegisterRedisGetTokenError);
        });

    }).then(function (obj) {
        return versionModel.findOneAsync({"versionOS":"android"},{versionOS:1,_id:0,version:1,versionCode:1,appName:1,downloadChannel:1,content:1,mandatory:1})
            .catch(function(err){
                return  Promise.reject(errInfo.userRegisterRedisGetTokenError);
            });
    }).then(function (obj) {
        // 缓存redis
        return redisclient.setex("version:-android",configData.expireTime.versionExpireTime,
            JSON.stringify(obj)).then(function(err){
            return  obj
        }).catch(function(err){
            return obj
        });
    }).then(function (obj) {
        res.ext.json([200,'success',obj]);
    })
        .catch(function(err){
            res.ext.json(err);
        });
}


module.exports={
    geIosUp:geIosUp,
    geAndroidUp:geAndroidUp
};
