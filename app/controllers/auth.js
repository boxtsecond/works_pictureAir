/**
 * Created by meteor on 16/11/25.
 */
//UUID  t appID
//var baseInfo = {
//    visitIP: IpTools.getClientIp(req),
//    visitTime: new Date(),
//    terminal: terminal,
//    appID:appID
//
//};
var rq=require('../rq');
var errInfo=rq.resInfo.errInfo;
var Promise=rq.Promise;
var verifyreg=rq.verifyreg;
var resfilter_user=rq.resfilter_user;
var config=rq.config;
var configData=rq.configData;
var _=rq._;
var access_token=rq.access_token;
var redisclient=rq.redisclient;
function filterParams(req){
    return new Promise(function (resolve, reject) {
        var result={
            params:req.ext.params,
            //visitTime: new Date(),
            lg:'en-US',
            uuid:rq.uuid.v1().trim().replace(/-/g,''),
            //visitIP:req.ext.ip,
            t:0,
            appid:""
        };
        if(!req.ext.haveOwnproperty(result.params,'appid')){
            return reject(errInfo.authParamAppidError);
        }else {
            result.appid=result.params.appid;
            if(req.ext.haveOwnproperty(result.params,'uuid')) result.uuid=result.params.uuid;
            if(req.ext.haveOwnproperty(result.params,'t')) result.t=result.params.t;
            if(req.ext.haveOwnproperty(result.params,'lg')) result.lg=result.params.lg;
            return  resolve(result);
        }
    });
};
// redisclient.setex("guest_access_token:"+'test',600,"222").then(function(err){
//    return  Promise.resolve([userobj,resOBj]);
//}).catch(function(err){
//      console.log(err);
//    //return  Promise.resolve([userobj,resOBj]);
//    // return  Promise.reject({status: 505, msg:  "redis erro"});
//});


//Verification
function verifyAppid(appid,tokenData){
    //var findItem= _.find(config.config.configJSONData.spportLanguage, function(chr) {
    //    if(chr.toString().toLocaleLowerCase().trim() ==code.toString().toLocaleLowerCase().trim())
    //        return chr;
    //});
    //if(findItem) return true;
    //else return false;
};
//console.log(rq.util.md5("PictureAir"+"pictureworks"))
function getAccessToken(req,res){
    filterParams(req).then(function(userobj){
            var tokenData={
                audience:userobj.uuid,
                t:userobj.t,//web photo
                lgcode:userobj.lg,
                appid:userobj.appid,
                expnumber:configData.expireTime.guestExpireTime
            };
            if(tokenData.appid=="6c8c8dc48280ed2163136ad416e1dbfe"){
                return tokenData;
            }else {
                return Promise.reject(errInfo.authVerifyAppidError);
            }
           // 验证  tokenData
        }
    ).then(function(tokenData){
            return  access_token.getGuestAccess_token(tokenData).then(function(access_token){
                return Promise.resolve(access_token);
            }).catch(function(er){
                return Promise.reject(errInfo.authGetTokenError);
            });
        }).then(function(access_token){
            //console.log(access_token);
            res.ext.json([{
                access_token:access_token,
                expire_in:configData.expireTime.guestExpireTime-60
            }]);
        }).catch(function(err){
           res.ext.json(err);
    });

}
module.exports={
    getAccessToken:getAccessToken
}