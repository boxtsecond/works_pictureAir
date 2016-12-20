/**
 * Created by meteor on 16/11/22.
 */
var redisclient=require("../app/redis/redis").redis;
var access_token=require("../config/access_token");
var Promise=require('bluebird');
function getAccessToken(req){
    var  token=null;
    if(req.ext.haveOwnproperty(req.ext.params,"access_token")){
        token=req.ext.params['access_token'];
    }else if(req.ext.haveOwnproperty(req.ext.params,"token")){
        token=req.ext.params['token'];
    }else if(req.ext.haveOwnproperty(req.ext.params,"authorization")){
        token=req.ext.params['authorization'];
    }else if(req.ext.haveOwnproperty(req.ext.params,"auth")){
        token=req.ext.params['auth'];
    }else if(req.ext.haveOwnproperty(req.headers,"access_token")){
        token=req.headers['access_token'];
    }else if(req.ext.haveOwnproperty(req.headers,"token")){
        token=req.headers['token'];
    }else if(req.ext.haveOwnproperty(req.headers,"authorization")){
        token=req.headers['authorization'];
    }else if(req.ext.haveOwnproperty(req.headers,"auth")){
        token=req.headers['auth'];
    }else token=null;
     return token;
}
function authGuest(req,res,next){
    var token=getAccessToken(req);
    if(token) {
        return  access_token.verifyGuestAccess_token(token.toString().trim()).then(function(toke){
          req.ext.params.token=toke;
          req.ext.params.token.expire_in=Math.floor(toke.exp-Math.floor(Date.now() / 1000));
          next();
         return toke;
      }).catch(function(err){
          return res.ext.json({ status: 421, msg: 'unauthorized',result:{}});
      })
    }
    else  return res.ext.json({ status: 420, msg: 'unauthorized',result:{}});
}
// user
function authUser(req,res,next){
    var token=getAccessToken(req);
    if(token) {
         return   access_token.verifyAccess_token(token).then(function(toke){
            // 从redis中获取
            return  redisclient.get("access_token:"+toke.audience).then(function(access_token){
                if(access_token){
                    var user=JSON.parse(access_token);
                    if(user.user.disabled) return Promise.reject([430,'userName is disabled',{disablereason:user.user.disablereason}]);
                    else  return {
                        toke:toke,
                        userid:user.userid
                    };
                }else return Promise.reject(access_token);
            }).catch(function(err){
                return Promise.reject(err);
            });
        }).then(function(obj){
             req.ext.params.token=obj.toke;
              req.ext.params.userId=obj.userid;
             req.ext.params.token.expire_in=Math.floor(obj.toke.exp-Math.floor(Date.now() / 1000));
             next();
             return obj;
        }).catch(function(err){
            return res.ext.json({ status: 421, msg: 'unauthorized'});
        })
    }
    else  return res.ext.json({ status: 420, msg: 'unauthorized'});
}
module.exports={
    authGuest:authGuest,
    authUser:authUser
};