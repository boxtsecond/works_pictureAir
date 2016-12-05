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
      access_token.verifyGuestAccess_token(token).then(function(token){
          req.ext.params.token=token;
          req.ext.params.token.expire_in=Math.floor(token.exp-Math.floor(Date.now() / 1000));
          return next();
      }).catch(function(err){
          return res.ext.json({ status: 421, msg: 'unauthorized'});
      })
    }
    else  return res.ext.json({ status: 420, msg: 'unauthorized'});
}
// user
function authUser(req,res,next){
    var token=getAccessToken(req);
    if(token) {
        access_token.verifyAccess_token(token).then(function(token){
            // 从redis中获取
            //redisclient.get()
            return  redisclient.get("access_token:"+token.audience).then(function(user){
                if(user) return token;
                else return Promise.reject(user);
            }).catch(function(err){
                return Promise.reject(err);
                // return res.ext.json({ status: 421, msg: 'unauthorized'});
            });
        }).then(function(token){
            req.ext.params.token=token;
            req.ext.params.token.expire_in=Math.floor(token.exp-Math.floor(Date.now() / 1000));
            return next();
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