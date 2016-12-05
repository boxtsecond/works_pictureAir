var fs=require("fs"),path=require('path');
var jwt = require('jsonwebtoken');
var Promise=require('bluebird');
var util=require("./util");
Promise.promisifyAll(jwt);
Promise.promisifyAll(fs);
var configData=require('./config').config.configJSONData;

//verifyGuestAccess_token('eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzMjM5MzAsImV4cCI6MTQ4MDkyODczMCwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiY2ZmYjQ1ZDBiNTQ5MTFlNmE5NTZlMWM2NzlkZWRlZmEiLCJhcHBpZCI6ImFhYWEiLCJ0IjoxfQ.00ugTX1WhX0Gcx-IQyqbT8L0NzPwsiozsNm4fywu0ay4YCjYrdXNXRB-jPfohy3mBo1xJTayQhXW_fErYy7oJZ8UH8BkAwxwRU0mAavbBmzcnuUrOJBqiJ-7ZGG7GEPpITNBNbM7G--1c6O38lO0TrXAmeRCM_Zzi6CpOHqYY3AJ070W-jzsg2Zhc3ZBReQUxuMG65K_0TsFtFURiftRe2yXJTGDpMx2abmLiScEKPzVjLaZil_FGhvC359_AA5y2I6oZ1KzNmr6sjx-0VqzyKJjsxOcgFzo7B3Mvklcu7DavPcWUUv3xvY46aLBUwVSgS8LVkcYVCAvW_ZxMhrNyA').then(function(err){
//        console.log(err);
//    })
var certPrivateCaChe={
    private:null,
    public:null
};
function getcert(fileName){
    return new Promise(function (resolve, reject) {
        if(certPrivateCaChe.private==null&&certPrivateCaChe.public==null){
            return fs.readFileAsync(path.join(__dirname,fileName)).then(function(certPrivate){
                if(fileName=='private.key') certPrivateCaChe.private=certPrivate;
                if(fileName=='public.pem') certPrivateCaChe.public=certPrivate;
                return  resolve(certPrivate);
            });
        }else {
            if(fileName=='private.key'&&certPrivateCaChe.private)  return  resolve(certPrivateCaChe.private);
            else  if(fileName=='public.pem'&&certPrivateCaChe.public) return  resolve(certPrivateCaChe.public);
            else {
                return fs.readFileAsync(path.join(__dirname,fileName)).then(function(certPrivate){
                    if(fileName=='private.key') certPrivateCaChe.private=certPrivate;
                    if(fileName=='public.pem') certPrivateCaChe.public=certPrivate;
                    return  resolve(certPrivate);
                });
            }
        }
    });
};
function getGuestAccess_token(tokenData){
    //return fs.readFileAsync(path.join(__dirname,'private.key'))
    return getcert('private.key')
        .then(function(certPrivate){
            var token={
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + tokenData.expnumber,
                iss:configData.token.iss,
                audience:tokenData.audience,//uuid
                appid:tokenData.appid,
                t:tokenData.t,//web photo
                lg:tokenData.lgcode
            };
            return jwt.sign(token, certPrivate, { algorithm: 'RS512'});
        });
}
function verifyGuestAccess_token(token){
    return getcert('public.pem')
    //return   fs.readFileAsync(path.join(__dirname,'public.pem'))
        .then(function(certPublic){
            return jwt.verify(token, certPublic, { algorithm: 'RS512'});
        });
}
function getAccess_token(tokenData){
    return getcert('private.key')
    //fs.readFileAsync(path.join(__dirname,'private.key'))
        .then(function(certPrivate){ 
            var token={
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) +tokenData.expnumber,
                iss:configData.token.iss,
                audience:tokenData.audience,//md5(user)
                t:tokenData.t,//web photo
                lg:tokenData.lgcode
            };
           return jwt.sign(token, certPrivate, { algorithm: 'RS512'});
        });
}
function verifyAccess_token(token){
    return getcert('public.pem')
    //return   fs.readFileAsync(path.join(__dirname,'public.pem'))
        .then(function(certPublic){
            return jwt.verify(token, certPublic, { algorithm: 'RS512'});
        });
}
//getAccess_token("aa",1000).then(function(er){
//    console.log(er);
//});
//verifyAccess_token("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0Nzk5ODAwNDcsImV4cCI6MTQ3OTk4MTA0NywiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiNDEyNGJjMGE5MzM1YzI3ZjA4NmYyNGJhMjA3YTQ5MTIiLCJsZ2NvZGUiOiJlbi1VUyJ9.OYWSxjMyyIqvrLsFPuSm0z4H2kyzZB1sZTLma31a8d-E3aLrLeoILn10AvvC5OlqaG-9xUmuZ3HXgXUGyOgCzKAdpdgQhPUC0XKt2R3E_a-5fW7Ob49BPGm2jq6uY_NbAmG-8I_bi-2_wjyl5VpAIuwqwU_zADEF9jb-NrlR-Xdd057MBjLA3H5iZWSFYE5zxp8GvY-iNGL_Vf4oh8cRhBbM0dbFCVnhwpe65dPljDnCK-FmSzuj1za0H7TwnKVxl4d-byLs7HLbIRk4zl8RZD2SsEwvr7tvR2wbFFPWxAarSRVGgSGBTWI348jTATzbaAYW-7UhRfh629noHwvyng").then(function(er){
//    console.log(er);
//});

//var certPrivate = fs.readFileSync('./private.key');  // get private key
//var certPublic = fs.readFileSync('./public.pem');  // get public key
//jwt.sign(
//    {
//        iat: Math.floor(Date.now() / 1000),
//        exp: Math.floor(Date.now() / 1000) + 30,
//        iss:"pictureAir",
//        audience:""
//        //exp:""
//    }
//    , certPrivate, { algorithm: 'RS512'},function(err, token) {
//        console.log(token);
//        jwt.verify(token, certPublic,function(err, decoded) {
//            console.log(decoded) // bar
//        });
//    })
//jwt.sign(
//    {
//         iat: Math.floor(Date.now() / 1000),
//         exp: Math.floor(Date.now() / 1000) + 30,
//         iss:"pictureAir",
//         audience:""
//        //exp:""
//    }
//    , certPrivate, { algorithm: 'RS512'},function(err, token) {
//    console.log(token);
//    jwt.verify(token, certPublic,function(err, decoded) {
//        console.log(decoded) // bar
//    });
//})


//function getAccess_token(useranme,expnumber,cb){
//    var tokenData={
//        iat: Math.floor(Date.now() / 1000),
//        exp: Math.floor(Date.now() / 1000) + expnumber,
//        iss:"pictureAir",
//        audience:util.md5(useranme),
//        lgcode:"en-US"
//    };
//    //{ expiresIn: '7d' }
//    jwt.sign(tokenData, certPrivate, { algorithm: 'RS512'},function(err,token){
//        if(err) cb(err);
//        else cb(null,token);
//    });
//}
//function verifyAccess_token(token,cb){
//    jwt.verify(token, certPublic,function(err, decoded) {
//        if(err) cb(err);
//        else cb(null,decoded);
//    });
//}
module.exports={
    getAccess_token:getAccess_token,
    verifyAccess_token:verifyAccess_token,
    verifyGuestAccess_token:verifyGuestAccess_token,
    getGuestAccess_token:getGuestAccess_token
}
//
////,{ expiresIn: '7d' },
//jwt.sign(
//    {
//         iat: Math.floor(Date.now() / 1000),
//         exp: Math.floor(Date.now() / 1000) + 30,
//         iss:"pictureAir",
//         audience:""
//        //exp:""
//    }
//    , certPrivate, { algorithm: 'RS512'},function(err, token) {
//    console.log(token);
//    jwt.verify(token, certPublic,function(err, decoded) {
//        console.log(decoded) // bar
//    });
//})
//
////var token1=jwt.sign({
////    data: 'foobar'
////}, 'secret', { expiresIn: 60 * 60 })
////console.log(token1)
//////console.log(1479977429-1479973829)
////jwt.verify(token1, 'secret',function(err, decoded) {
////    console.log(err,decoded) // bar
////});
//
////jwt.sign({a:1}, certPrivate, { algorithm: 'RS256'},{ expiresIn: '7d' }).then(function(err){
////    console.log(err)
////})