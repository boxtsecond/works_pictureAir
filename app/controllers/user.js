/**
 * Created by meteor on 16/11/22.
 */
var rq=require('../rq');
var sendMsg=require("../tools/sendMsg");
var errInfo=rq.resInfo.errInfo;
var userMode=rq.userMode;
var userMsgModel=rq.userMsgModel
var verifyreg=rq.verifyreg;
var resfilter_user=rq.resfilter_user;
var config=rq.config;
var configData=rq.configData;
var _=rq._;
var access_token=rq.access_token;
var redisclient=rq.redisclient;

var registerTerminalArray=['web','ios',"android"];
var SendSMStypeArray=['register','forgotPassword'];
function verifySpportLanguageCode(code){
    var findItem= _.find(config.config.configJSONData.spportLanguage, function(chr) {
        if(chr.toString().toLocaleLowerCase().trim() ==code.toString().toLocaleLowerCase().trim())
            return chr;
    });
    if(findItem) return true;
    else return false;
}
//console.log(verifySpportLanguageCode('zh-CN'),config.config.configJSONData.spportLanguage)
//https://github.com/wookets/bluebird-examples
//email
//手机号
///^[a-zA-Z0-9_]{3,16}$/
//var userName = /^[a-zA-z]\w{3,15}$/;

//console.log(verifyreg.verifyuserName("username111"))
//console.log(verifyuserName("333"))
function filterParams(req){
    return new Promise(function (resolve, reject) {
        var result={
            params:req.ext.params,
            isEmail:false,
            isMobile:false
        };
        console.log(req.ext.params);
        if(req.ext.haveOwnproperty(result.params,'token')){
        }
        if(!req.ext.haveOwnproperty(result.params,'username')){
           return reject(errInfo.userParamUsernameError);
        }else if(!req.ext.haveOwnproperty(result.params,'password')){
            return reject(errInfo.userParamPasswordError);
        }else if(!verifyreg.verifyPassword(result.params.password.trim().toLowerCase())){
            return reject(errInfo.userParamPasswordVierifyError);
        }
        else if(verifyreg.isEmail(result.params.username.trim().toLowerCase())){
            result.isEmail=true; return resolve(result);
        }
        else if(verifyreg.isMobile(result.params.username.trim().toLowerCase())){
            result.isMobile=true;return resolve(result);
            //reject({status: 403, msg:"username At the beginning of the letter, the 2-20 byte is allowed, allowing the letters to underline"});
           // return  reject();
        }

        else return  resolve(result);
    });
};
//function findUserFromDB(userobj){
//    return new Promise(function (resolve, reject) {
//        if(userobj.isEmail){
//            userMode.findOne({ email: userobj.params.username }).then(function (user) {
//                //if(user) resolve(user);
//                //else  resolve(userobj,data);
//                resolve(userobj,"..");
//            }).catch(function (err) {
//                reject({status: 501, msg:  "db error"});
//            });
//        }else{
//            userMode.findOne({ userName: userobj.params.username }).then(function (user) {
//                if(user) resolve(user);
//                else resolve(userobj);
//            }).catch(function (err) {
//                reject({status: 501, msg:  "db error"});
//            });
//
//        }
//    });
//}
//
function generateaccAccess_token(userobj){
    return new Promise(function (resolve, reject) {
        if(userobj.isEmail){
            userMode.findOne({ email: userobj.params.username,disabled:false }).then(function (user) {
                //if(user) resolve(user);
                //else  resolve(userobj,data);
                resolve(userobj,"..");
            }).catch(function (err) {
                reject({status: 501, msg:  "db error"});
            });
        }else{
            userMode.findOne({ userName: userobj.params.username,disabled:false }).then(function (user) {
                if(user) resolve(user);
                else resolve(userobj);
            }).catch(function (err) {
                reject({status: 501, msg:  "db error"});
            });

        }
    });
}
//function checkUserInRedis(md5Useranme,userobj){
//    return new Promise(function (resolve, reject) {
//        return redisclient.get("access_token:"+md5Useranme).then(function(err,access_token){
//            if(!err&&!access_token){
//                // console.log("redis not exist ",md5Useranme);
//                return  Promise.resolve(userobj);
//            }else  return  Promise.reject(null);
//        }).catch(function(err){
//            if(err)  return  Promise.reject({status: 505, msg:  "redis erro"});
//            else return  Promise.reject({status: 301, msg:  "redid userName is exist"});
//        });
//    });
//}
//username password lgcode
//禁用用户首先修改redis 然后修改数据库
function login(req,res){
    filterParams(req).then(function(data){
            return data;
        }
    ).then(function(userobj){
            //查询redis中是否存在 access_token
            var md5Useranme =req.ext.md5(userobj.params.username);
            // console.log('access_token',md5Useranme,userobj);
            return redisclient.get("access_token:"+md5Useranme).then(function(access_token){
                if(access_token){
                    var user=JSON.parse(access_token);
                    if(user.user.disabled)  return Promise.reject([430,'userName is disabled',{disablereason:user.user.disablereason}]);
                    else  return  Promise.resolve({
                        user:user,
                        userobj:userobj,
                        md5Useranme:md5Useranme
                    });
                }else  return  Promise.reject(null);
            }).catch(function(err){
                if(req.ext.isArray(err)) return  Promise.reject(err);
                else if(err)  return  Promise.reject(errInfo.userRegisterRedisGetTokenError);
                else return Promise.resolve({ user:null,  userobj:userobj,md5Useranme:md5Useranme});
            });
        }).then(function(obj){
            if(obj.user) return  obj;
            else{
                if(obj.userobj.isEmail){
                    return  userMode.findOne({ email: obj.userobj.params.username}).then(function (user) {
                        if(user) {
                            if (user.disabled)  return Promise.reject([430,'userName is disabled',{disablereason:user.disablereason}]);
                            else return Promise.resolve({
                                user: new resfilter_user.filterUserToredis(user,
                                    obj.userobj.params.token.t, obj.userobj.params.token.lg
                                ), userobj: obj.userobj, md5Useranme: obj.md5Useranme
                              });
                        } else return  Promise.resolve({ user:null,  userobj:obj.userobj,md5Useranme:obj.md5Useranme});
                    }).catch(function (err) {
                          if(req.ext.isArray(err)) return  Promise.reject(err);
                          else return  Promise.reject(errInfo.userRegisterFinddbForEmailError);
                    });
                }else if(obj.userobj.isMobile) {
                    return userMode.findOne({mobile: obj.userobj.params.username}).then(function (user) {
                         if(user) {
                             //console.log(obj.userobj.params);
                             if (user.disabled)
                                 return Promise.reject([430,'userName is disabled',{disablereason:user.disablereason}]);
                             else  return Promise.resolve({
                                 user: new resfilter_user.filterUserToredis(user,
                                     obj.userobj.params.token.t, obj.userobj.params.token.lg
                                 ), userobj: obj.userobj, md5Useranme: obj.md5Useranme
                             });
                         }else return  Promise.resolve({ user:null,  userobj:obj.userobj,md5Useranme:obj.md5Useranme});
                    }).catch(function (err) {
                        console.error(err)
                         if(req.ext.isArray(err)) return  Promise.reject(err);
                         else return Promise.reject(errInfo.userRegisterFinddbForMobileError);
                    });
               }else  return  Promise.reject(errInfo.userParamUserNameParameterError);
            }
        }).then(function(obj){
            if(!obj.user) return Promise.reject(errInfo.userLoginParamUserNameError);
            else {
                //重新生成token
                var tokenData={
                    audience:obj.md5Useranme,
                    t:obj.userobj.params.token.t,//web photo
                    lgcode:obj.userobj.params.token.lg,
                    appid:obj.userobj.params.token.appid,
                    expnumber:configData.expireTime.expireTime
                };
                return access_token.getAccess_token(tokenData).then(function(access_token){
                    //console.log(access_token);
                    return Promise.resolve({obj:obj,access_token:access_token});
                }).catch(function(er){
                    return Promise.reject(errInfo.userRegisterGenerateError);
                });
            }
        }
    ).then(function(obj){
            // 存在redis 延期失效
            return redisclient.setex("access_token:"+obj.obj.md5Useranme,configData.expireTime.expireTime,
                JSON.stringify(obj.obj.user)).then(function(err){
                return  Promise.resolve(obj);
            }).catch(function(err){
                return  Promise.resolve(obj);
            });
     }).then(function(obj){
            //var resOBj=new resfilter_user.filterUser(userobj[1]);
            //var access_tokenData={
            //    userid:obj.obj.userid,
            //    t:userobj[0].params.token.t,
            //    lgcode:userobj[0].params.token.lg,
            //    user:resOBj,
            //    audience:userobj[5]
            //};
            res.ext.json([200,'success',{
                user:obj.obj.user.user,
                expire_in:configData.expireTime.expireTime-60,
                access_token:obj.access_token
            }]);
        }).catch(function(err){
            //console.log(err);
            res.ext.json(err);
      });
    //查询redis 直接返回生成新的token并 用户数据
    //redis 里面没有查询DB
    //直接返回生成新的token并 用户数据

};
//redis 里面存在正在使用的用户需要从数据库和redis 中删除才能重新注册
function register(req,res){
    filterParams(req).then(function(userobj){
            if(userobj.isMobile){
                if(!req.ext.haveOwnproperty(userobj.params,'vcode'))
                    return Promise.reject(errInfo.userParamVcodeParameterError);
                else  return userobj;
            } else  return userobj;
        }
    ).then(function(userobj){
            //查询redis中是否存在 access_token
            var md5Useranme =req.ext.md5(userobj.params.username);
           // console.log('access_token',md5Useranme,userobj);
            return redisclient.exists("access_token:"+md5Useranme).then(function(access_token){
                if(!access_token){  return  Promise.resolve(userobj);
                }else  return  Promise.reject(null);
            }).catch(function(err){
                if(err)  return  Promise.reject(errInfo.userRegisterRedisGetTokenError);
                else return  Promise.reject(errInfo.userParamUserNameExistError);
            });
        })
        .then(function(userobj){
            if(!userobj.isEmail&&!userobj.isMobile){
                return  Promise.reject(errInfo.userParamUserNameParameterError);
            }else {
                if(userobj.isEmail){
                    return  userMode.findOne({ email: userobj.params.username}).then(function (user) {
                        return  Promise.resolve([user, userobj]);
                    }).catch(function (err) {
                        return  Promise.reject(errInfo.userRegisterFinddbForEmailError);
                    });
                }else{
                      if(userobj.isMobile){
                          // 验证验证码
                          return redisclient.get("validateCode:"+userobj.params.username).then(function(validateCode){
                              if(validateCode){
                                   if(Number(validateCode)==Number(userobj.params.vcode)) {
                                      // 注册的时候验证手机号码的验证码
                                      return userMode.findOne({mobile: userobj.params.username}).then(function (user) {
                                          return  Promise.resolve([user, userobj]);
                                      }).catch(function (err) {
                                          return Promise.reject(errInfo.userRegisterFinddbForMobileError);
                                      });
                                  }
                                  else  return  Promise.reject(null);
                              }else   return  Promise.reject(null);
                          }).catch(function(err){
                              if(err)  return  Promise.reject(errInfo.userVerifyVcodeError);
                              else return  Promise.reject(errInfo.userVerifyVcodeError);
                          });

                      }else  return  Promise.reject(errInfo.userParamUserNameParameterError);
                }
            }
        })
        .then(function(userobj){
            if(userobj[0]){
                return   Promise.reject(errInfo.userParamUserNameExistError);
            }else{
                var md5Useranme =req.ext.md5(userobj[1].params.username);
                var tokenData={
                    audience:md5Useranme,
                    t:userobj[1].params.token.t,//web photo
                    lgcode:userobj[1].params.token.lg,
                    appid:userobj[1].params.token.appid,
                    expnumber:configData.expireTime.expireTime
                };
                //console.log(tokenData)
                return access_token.getAccess_token(tokenData).then(function(access_token){
                    //console.log(access_token);
                    return Promise.resolve([userobj[0],userobj[1],configData.expireTime.expireTime,access_token,md5Useranme]);
                }).catch(function(er){
                    return Promise.reject(errInfo.userRegisterGenerateError);
                });
            }
        })
        .then(function(userobj){
            //if(!userobj[0]){
                    var user  = new userMode();
                    if(userobj[1].isEmail){
                        user.email=userobj[1].params.username;
                    }else{
                        user.mobile=userobj[1].params.username;
                    }
                   user.registerTerminal=registerTerminalArray[userobj[1].params.token.t];
                   user.lgsyscode=userobj[1].params.token.lg;
                   user.lgusercode=userobj[1].params.token.lg;
                   user.name=userobj[1].params.username;
                   user.disabled=false;
                   user.disablereason='';
                   user.allowedPermissions=[];
                   user.password=req.ext.md5(userobj[1].params.password);
                    return user.save().then(function(){
                        return  Promise.resolve([userobj[1],user,userobj[2],userobj[3],userobj[4],userobj[5]]);
                    }).catch(function (err) {
                        return  Promise.reject(errInfo.userRegisterSaveToDBError);
                    });
        }
    ) .then(function(userobj){
            //access_token  存入redis
            //var resOBj=new resfilter_user.filterUser(userobj[1]);
            var redis_user_obj=new resfilter_user.filterUserToredis(userobj[1],
                userobj[0].params.token.t,userobj[0].params.token.lg);
            //var access_tokenData={
            //    //access_token:userobj[3],
            //    //appid
            //    userid:userobj[1]._id,
            //    t:userobj[0].params.token.t,
            //    lgcode:userobj[0].params.token.lg,
            //    user:resOBj,
            //    audience:userobj[5]
            //};
            //key   过期时间 数据
            return redisclient.setex("access_token:"+userobj[4],userobj[2],JSON.stringify(redis_user_obj)).then(function(err){
                return  Promise.resolve([userobj,redis_user_obj.user]);
            }).catch(function(err){
               // console.log(err);
                return  Promise.resolve([userobj,redis_user_obj.user]);
               // return  Promise.reject({status: 505, msg:  "redis erro"});
            });
        })
        .then(function(userobj){
            //console.log(new resfilter_user.filterUser(userobj[1]))
            res.ext.json([200,'success',{
                user:userobj[1],
                expire_in:userobj[0][2]-60,
                access_token:userobj[0][3]
            }]);
        }).catch(function(err){
           // console.error(err)
            res.ext.json(err);
     });
};


//{
//    phone:string，必填，手机号，（例如：+8613598734567）
//    msgType:string,选填，默认为register，可选值（forgotPassword,register）
//}
function filterParamsSendSMS(req){
    return new Promise(function (resolve, reject) {
        var result={
            params:req.ext.params,
            type:0//register 0 forgotPassword 1
        };
        if(!req.ext.haveOwnproperty(result.params,'phone')){
            return reject(errInfo.userSendSMSParamPhoneParameterError);
        }else if(!verifyreg.isMobile(result.params.phone.trim().toLowerCase())){
            return reject(errInfo.userParamPhoneParameterError);
        }
        else if(req.ext.haveOwnproperty(result.params,'type')){
            //console.log(result.params.type)
            if([0,1].indexOf(result.params.type)>=0) {
                result.type=result.params.type;
                return  resolve(result);
            }
            else  return reject(errInfo.userSendSMSParamTypeVierifyError);
        }
        else return  resolve(result);
    });
};
function sendSMS(req,res){
    filterParamsSendSMS(req).
        // 验证码是否已经发送
        then(function(smsobj){
            return redisclient.exists("validateCode:"+smsobj.params.phone).then(function(access_token){
                if(!access_token){
                    return Promise.resolve(smsobj);
                }else   return  Promise.reject(null);
            }).catch(function(err){
                if(err)  return  Promise.reject(errInfo.userSMSRedisGetValidateCodeError);
                else return  Promise.reject(errInfo.userSendSMSValidateSendingCodeError);
            });
        })
        .then(function(smsobj){
            var md5Useranme =req.ext.md5(smsobj.params.phone);
            return redisclient.get("access_token:"+md5Useranme).then(function(access_token){
                if(!access_token){
                     return Promise.resolve(smsobj);
                }else    {
                    if(Number(smsobj.params.type)==1) {
                        //是否被禁用
                        var user=JSON.parse(access_token);
                        if(user.disabled)  return Promise.reject([430,'userName is disabled',{disablereason:user.disablereason}]);
                        else
                        return Promise.resolve(smsobj);//忘记密码用户必须存在
                    }
                    else   return  Promise.reject(null);
                }
            }).catch(function(err){
                if(err)  return  Promise.reject(errInfo.userRegisterRedisGetTokenError);
                 else if(req.ext.isArray(err)) return  Promise.reject(err);
                 else    return  Promise.reject(errInfo.userParamUserNameExistError);
            });
        }).
        then(function(smsobj){
           return  userMode.findOne({mobile: smsobj.params.phone}).then(function(user){
               if(user){
                  if(Number(smsobj.params.type)==1){
                      //是否被禁用
                      if(user.disabled)  return Promise.reject(-1);
                      else return Promise.resolve(smsobj);
                  }
                   else return  Promise.reject(1);
               }else {
                   if(Number(smsobj.params.type)==0)return Promise.resolve(smsobj);
                   else return  Promise.reject(0);
                   //else  return Promise.resolve(smsobj);
               }
               //else return Promise.resolve(smsobj);


           }).catch(function (err) {
               if(rq.util.isnumber(err)){
                   if(err==1)return  Promise.reject(errInfo.userParamUserNameExistError);
                   else if(err==-1) Promise.reject([430,'userName is disabled',{disablereason:user.disablereason}]);
                   else return  Promise.reject(errInfo.userLoginParamUserNameError);
               }
               else if(err) return Promise.reject(errInfo.userRegisterFinddbForMobileError);
               else  return  Promise.reject(errInfo.userParamUserNameExistError);

           });
    }).then(function(smsobj){
        return sendMsg.sendMSMvalidateCode(smsobj.params.token.lg,smsobj.params.phone,new Date())
            .then(function(msg){
                return Promise.resolve({
                    msg:msg,smsobj:smsobj
                });
        });
    }).then(function(obj){
            return redisclient.setex("validateCode:"+obj.msg.phone,configData.expireTime.validateCodeExpireTime,
                obj.msg.validateCode).then(function(err){
                return  Promise.resolve(obj);
            }).catch(function(err){
                    return Promise.reject(errInfo.userSMSRedisSetValidateCodeError);
            });
    }).then(function(obj){
            //存 mongodb
            var userMsg=new userMsgModel();
            userMsg.channelType="sms";
            userMsg.msgid=obj.msg.msgid;
            userMsg.sendFrom=obj.msg.msgid;
            userMsg.sendTo=[obj.msg.phone];
            userMsg.subject=obj.msg.sign,
            userMsg.content=obj.msg.content,
            userMsg.code=obj.msg.code,
            userMsg.validateCode=obj.msg.validateCode,
            //userMsg.msgType="register",
            userMsg.msgType=SendSMStypeArray[obj.smsobj.params.type],

            userMsg.expiredTime=rq.util.getNextNumberSecondDate(obj.msg.sendTime,
                configData.expireTime.validateCodeExpireTime);
            userMsg.sendTime=obj.msg.sendTime;
            userMsg.active=false;
            return userMsg.save().then(function(){
                return  Promise.resolve(obj);
            }).catch(function (err) {
                return  Promise.reject(errInfo.userSMSdbSaveValidateCodeError);
            });
        }).then(function(obj){
            //{obj:obj}
            //console.log()
            res.ext.json([200,'success',{validateCode:obj.msg.validateCode}]);
        }).catch(function(err){
            console.error(err);
            res.ext.json(err);
      });


    //return res.ext.json({ status: 200, msg: 'yes',result:req.ext.params});
// 验证guest tonke 获取 语言以及类型
// 验证参数 // 检查手机号是否存在
//发送验证码
//保存在mongodb
//保存在redis
//提示成功
//注册和忘记密码
};

//登陆  先检查 redis 是否存在
//存储一部分数据在redis  直接返回
//
//redisclient.exists("access_token:3de9367584a6147e67ede27c5bc9255f").then(function(access_token){
//    if(access_token)  console.log("Y: ",access_token)
//    else console.log("N",access_token)
//}).catch(function(err){
//  console.error(err);
//});
// 忘记密码两种找回方式，手机号,邮件
//username, vcode手机号验证验证码
function filterParamsforgotPassword(req){
    return new Promise(function (resolve, reject) {
        var result={
            params:req.ext.params,
            isEmail:false,
            isMobile:false
        };
        if(!req.ext.haveOwnproperty(result.params,'username')){
            return reject(errInfo.userParamUsernameError);
        }else if(verifyreg.isEmail(result.params.username.trim().toLowerCase())){
            result.isEmail=true; return resolve(result);
        }else if(verifyreg.isMobile(result.params.username.trim().toLowerCase())){
            result.isMobile=true;
            return resolve(result);
        }
        else return  resolve(result);
    });
};

function forgotPassword(req,res){
    filterParamsforgotPassword(req).then(function(obj){
        if(!obj.isEmail&&!obj.isMobile) return  Promise.reject(errInfo.userParamUserNameParameterError);
        else return obj;
    }).then(function(userobj){
        //查询redis中是否存在 access_token
        var md5Useranme =req.ext.md5(userobj.params.username);
        return redisclient.get("access_token:"+md5Useranme).then(function(access_token){
            if(access_token){
                //是否被禁用
                return  Promise.resolve(userobj);
            }else  return  Promise.reject(null);
        }).catch(function(err){
            if(err)  return  Promise.reject(errInfo.userRegisterRedisGetTokenError);
            else if(req.ext.isArray(err)) return  Promise.reject(err);
            else return  Promise.reject(errInfo.userLoginParamUserNameError);
        });
    }).then(function(userobj){
        if(userobj.isEmail){
            return  userMode.findOne({ email: userobj.params.username}).then(function (user) {
                if(user) {
                    //if(disabled) return Promise.reject(errInfo.userLoginParamUserNameDisabledError);//  账户已经禁用
                    return  Promise.resolve(userobj);
                }
                else    return  Promise.reject(null);
            }).catch(function (err) {
                if(err)  return  Promise.reject(errInfo.userRegisterFinddbForEmailError);
                else return  Promise.reject(errInfo.userLoginParamUserNameError);
            });
        }else {

        }
    }).then(function(userobj){
        //{obj:obj}
        //console.log()
        res.ext.json([200,'success',userobj]);
    }).catch(function(err){
        console.error(err);
        res.ext.json(err);
    });

// 手机号验证验证码
    //邮箱验证是否点击相关连接

}

function sendEmail(req,res){
    var params = req.ext.params;
}
function switchLanguage(req,res){


}

//验证用户是否点击email
function verifyEmail(req,res){
    // 获取msgid
    //查看redis 中是否存在
    // 存在则验证成功并reids mongodb 修改emailVerified=true
}


module.exports={
    login:login,
    register:register,
    sendSMS:sendSMS,
    sendEmail:sendEmail,
    switchLanguage:switchLanguage
};
