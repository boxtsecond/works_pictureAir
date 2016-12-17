/**
 * Created by meteor on 16/11/25.
 */
var util = require("util");
var events = require("events");
var rq=require("../rq");
var _=rq._;
var redisclient=rq.redisclient;
var request=rq.request;
var Promise=rq.Promise;
var uuid=rq.uuid;
var email_txt=require('./lg/email_txt');
var msm_txt=require('./lg/msm_txt');
function getValidateCode(redsKsyStr){
   return redisclient.incr(redsKsyStr).then(function(reply){
       if(reply<999998) {
           return  Promise.resolve(rq.util.Padstr(reply.toString(),6,'0',false));
       }else {
          return redisclient.set(redsKsyStr, 0).then(function(err){
              return  Promise.resolve("999998");
          });
       }
   }).catch(function(err){
       return  Promise.resolve("999999");
   });
}
function getTxtFromCode(code,type,txtlist){
    return new Promise(function (resolve, reject) {
        var findItem= _.find(txtlist, function(chr) {
            if(chr.code.toLocaleLowerCase().trim() ==code.toString().toLocaleLowerCase().trim()
                &&chr.type.toLocaleLowerCase().trim() ==type.toString().toLocaleLowerCase().trim())
                return chr;
        });
        if(findItem)  return resolve({
            code:findItem.code,
            type: findItem.type,
            sign:findItem.sign,
            content:findItem.content
        });
        else return resolve({
            code:txtlist[0].code,
            type: txtlist[0].type,
            sign:txtlist[0].sign,
            content:txtlist[0].content
        });
    });
}
// var cfgEmail={
//     "sendFrom":"PictureAir.com",
//     host: 'partner.outlook.cn',
//     port: 25,
//     fromEmailUser: 'technology.monitor@pictureworks.biz',
//     auth: { user: 'meteor.liu@pictureworks.biz', pass: 'Ai131415926' }
// };
var cfgEmail={
    sendFrom:"PictureAir.com",
    pool: true,
    host :"smtp.office365.com",
    port : 587,
    secure: false,
    auth: { user: 'do-not-reply@pictureair.com', pass: 'CN-SH-PA-6001' },
    maxConnections:10,
    maxMessages:1000,
    fromEmailUser: "PictureAir.com Auto-Mailer <do-not-reply@pictureair.com>"
};
var transporter=rq.nodemailer.createTransport({
    pool: cfgEmail.pool,
    host :cfgEmail.host,
    port : cfgEmail.port,
    secure: cfgEmail.secure,
    auth: cfgEmail.auth,
    maxConnections:cfgEmail.maxConnections,
    maxMessages:cfgEmail.maxMessages
});
var cfgSMS={
    "sendFrom":"3tong",
    account:"dh74641",
    pwd:"1zeV34cm"
};
//console.log(rq.util)
function sendSMSFrom3tong(phones, sign,content, msgid,sendTime){
    return request.postAsync({url:'http://wt.3tong.net/json/sms/Submit',
        body:{
            "account":cfgSMS.account,
            "password":rq.util.md5(cfgSMS.pwd),
            "msgid":msgid,
            "phones":phones,
            "content":content,
            "sign":sign,
            "subcode":"",
            "sendtime":sendTime//  yyyyMMddHHmm 为空或者早于当前时间
        },
        json:true
    });
};

function sendSMSFrom3tongReport(phones, msgid){
    return request.postAsync({url:'http://www.dh3t.com/json/sms/Report',
        body:{
            "account":cfgSMS.account,
            "password":rq.util.md5(cfgSMS.pwd),
            //"msgid":msgid,
            "phones":phones
        },
        json:true
    });
};
//,"a71d6270b7a011e684912f2058110af2"
//sendSMSFrom3tong(("8618321538399", sign,content, msgid,sendTime)
//sendSMSFrom3tongReport("15887206294").then(function(err){
//console.log(err.body)
//}).catch(function(err){
//   console.error(err)
//});

function sendSMSE(){
    events.EventEmitter.call(this);
}
util.inherits(sendSMSE, events.EventEmitter);
var elemsendSMSE = new sendSMSE();


elemsendSMSE.addListener("send",function(smsobj){
    Promise.resolve(smsobj)
        .then(function(obj){
            return sendSMSFrom3tong(obj.phones,obj.data.sign,obj.data.content,obj.msgid,obj.sendTime).then(function(res){
                if(res.body.result==0)return res;
                else{
                    var type=-1;
                    if(obj.type=="validateCode") type=0;
                    else if(obj.type=="forgotPwdMsg_test"||obj.type=="forgotPwdMsg") type=1;
                    if(!rq.util.isArray(obj.phone)){
                        return redisclient.del("validateCode:"+type+"-"+req.ext.md5(obj.phone.toString().toLocaleLowerCase()),configData.expireTime.validateCodeExpireTime,
                            obj.msg.validateCode).then(function(err){
                                return  Promise.resolve(obj);
                            }).catch(function(err){
                                return Promise.reject(err);
                            });
                    }
                }
            });
        }).catch(function(err){
                var type=-1;
                if(obj.type=="validateCode") type=0;
                else if(obj.type=="forgotPwdMsg_test"||obj.type=="forgotPwdMsg") type=1;
                if(!rq.util.isArray(obj.phone)){
                    return redisclient.del("validateCode:"+type+"-"+req.ext.md5(obj.phone.toString().toLocaleLowerCase()),configData.expireTime.validateCodeExpireTime,
                        obj.msg.validateCode).then(function(err){
                            return  Promise.resolve(obj);
                        }).catch(function(err){
                            return Promise.reject(err);
                        });
                }
        });
});
function sendMSMvalidateCode(lg,phone,sendTime){
    return getValidateCode("MSM:msmLastIndexNum").then(function(validateCode){
        var msgid=uuid.v1().replace(/-/g,'');
        return sendSMS(lg,"validateCode",phone
            ,[{name:"%validateCode%",value:validateCode}],msgid,sendTime).then(function(send){
                if(send) return Promise.resolve({
                    phone:phone,
                    msgid:msgid,
                    sendTime:sendTime,
                    sendFrom:cfgSMS.sendFrom,
                    validateCode:validateCode,
                    content: send.obj.data.content,
                    sign:send.obj.data.sign,
                    code:send.obj.data.code
                });
                else {
                    return  Promise.reject({status: 424, msg:"send sms Error",desc:"send sms Error"});
                }
            });
        //return  Promise.resolve([txtobj,validateCode]);
    }).catch(function(err){
        return Promise.reject({status: 424, msg:"send sms Error",desc:"send sms Error"});
    });
}
function phoneToString(dReplaceArray,index,str){
    if(!rq.util.isnumber(index))index=-1;
    if(!rq.util.isstring(str))str="";
    return new Promise(function (resolve, reject) {
        if(rq.util.isstring(dReplaceArray)){
            if(dReplaceArray.indexOf('+')==-1) return resolve('+'+dReplaceArray);
            else return resolve(dReplaceArray);
        }
        else if(index>=dReplaceArray.length-1) return resolve(str);
        else{
            index++;
            if(index==-1) return phoneToString(dReplaceArray,index,str);
            else{
                if(dReplaceArray[index].indexOf('+')==-1){
                    if(index==0) str=str+'+'+dReplaceArray[index];
                    else str=str+',+'+dReplaceArray[index];
                }
                return resolve(phoneToString(dReplaceArray,index,str)
                );
            }
        }
    });
}
function sendSMS(lg,type,phone,dReplaceArray,msgid,sendTime){
    return getTxtFromCode(lg,type,msm_txt).then(function(txtobj){
        return  rq.util.txtStrReplacePromise(txtobj.content,dReplaceArray).then(function(str){
            return phoneToString(phone).then(function(strPhone){
               return  Promise.resolve({
                    txtstr:str,
                    strPhone:strPhone
                });
            });
        })
             .then(function(obj){
                 txtobj.content=obj.txtstr;
                var phoneNumber=obj.strPhone;
                var sendT="";
                if(rq.util.isDate(sendTime))sendT=rq.util.formatDate(sendTime,"yyyyMMddhhmm");
                 return  Promise.resolve({
                     data:txtobj,
                     msgid:msgid,
                     phones:phoneNumber,
                     sendTime:sendT,
                     phone:phone,
                     type:type
                 });
         });
    }).then(function(obj){
        //console.log(obj)
        elemsendSMSE.emit("send",obj);
        return {
            obj:obj,
            body:{result:0
            }
        };

        //return {
        //    obj:obj,
        //    body:{ msgid: 'bb6b0fa0b63011e6a30c4fe434712634',
        //        result: '0',
        //        desc: '提交成功',
        //        failPhones: '' }
        //};

    }).then(function(res){
        if(res.body.result==0)return Promise.resolve(res);
        else return Promise.resolve(null);
    });
}

function sendEmailforgotPwdMsg(lg,email,msgid){
    return sendEmail(lg,"forgotPwdMsg_test",email,
        [{name:"%validateCode%",value:msgid}],msgid,new Date()
    );
        //.then(function(msg){
        //    console.log(msg);
        //}).catch(function(err){
        //    console.error(err)
        //});
}
// sendEmailforgotPwdMsg("zh-CN",["meteor.liu@pictureworks.biz"]
// ).then(function(msg){
//    console.log(msg);
// }).catch(function(err){
//        console.error(err)
// });
function  getd() {
    getTxtFromCode(lg,type,email_txt).then(function (txtobj) {
        console.log(txtobj)
    });
}


function sendEmail(lg,type,email,dReplaceArray,msgid,sendTime){
        return getTxtFromCode(lg,type,email_txt).then(function(txtobj){
            return  rq.util.txtStrReplacePromise(txtobj.content,dReplaceArray)
                .then(function(content){
                    txtobj.content=content;
                    return  Promise.resolve({
                        sendFrom:cfgEmail.sendFrom,
                        data:txtobj,
                        msgid:msgid,
                        email:email,
                        sendTime:sendTime,
                        content:content
                    });
                });
        }).then(function(obj){
          return  transporter.sendMail({
             from: cfgEmail.fromEmailUser,to: obj.email,subject:obj.data.sign,text: obj.content, html: obj.content
             }).then(function(res){
                    if(res.accepted.length>=1) return Promise.resolve(obj);
                    else return Promise.reject(obj);
             });
        })
};
function sendEmailTO(email,subject,content) {
    // var cfgEmail={
    //     "sendFrom":"PictureAir.com",
    //     host: 'smtp.office365.com',
    //     port: 587,
    //     // host: ' outlook.office365.com',
    //     //  port: 995,
    //     secureConnection: true,
    //     ignoreTLS: false ,// don't turn off STARTTLS support
    //     // fromEmailUser: 'do-not-reply@pictureair.com',
    //     fromEmailUser: 'PictureAir.com Auto-Mailer',
    //     auth: { user: 'do-not-reply@pictureair.com', pass: 'CN-SH-PA-6001' }
    // };
    // { host : cfgEmail.host,port : cfgEmail.port,auth: cfgEmail.auth
    return transporter
        .sendMail({
            from: "PictureAir.com Auto-Mailer <do-not-reply@pictureair.com>",to: email,subject:subject,text: content, html: content
        });
}

function sendEmailcontactUs(lg,email,params){
    var msgid=uuid.v1().replace(/-/g,'');
    return getTxtFromCode(lg,"contactUs",email_txt).then(function(txtobj){
        return  rq.util.txtStrReplacePromise(txtobj.content,[
            {name:"%msgid%",value:msgid},
            {name:"%name%",value:params.name},
            {name:"%EmailAddress%",value:params.EmailAddress},
            {name:"%parkName%",value:params.parkName},
            {name:"%visitDate%",value:params.visitDate},
            {name:"%pictureAirCode%",value:params.pictureAirCode},
            {name:"%orderID%",value:params.orderID},
            {name:"%operatingSystem%",value:params.operatingSystem},
            {name:"%feedback%",value:params.feedback}
        ])
            .then(function(content){
                txtobj.content=content;
                txtobj.sign='Picture Enquiry '+rq.util.formatDate(new Date(),"yyyyMMdd")+"-"+params.parkName;
                return  Promise.resolve({
                    sendFrom:cfgEmail.sendFrom,
                    data:txtobj,
                    msgid:msgid,
                    email:email,
                    sendTime:new Date(),
                    content:content
                });
            });
    }).then(function(obj){
        return  transporter.sendMail({
            from: cfgEmail.fromEmailUser,to: obj.email,subject:obj.data.sign,text: obj.content, html: obj.content
        }).then(function(res){
            if(res.accepted.length>=1) return Promise.resolve(obj);
            else return Promise.reject(obj);
        });
    })

    //.then(function(msg){
    //    console.log(msg);
    //}).catch(function(err){
    //    console.error(err)
    //});
}
// function sendEmailTOcontactUs(params) {
//     var toEmail=["peter.dong@pictureworks.biz,meteor.liu@pictureworks.biz"];
//     var subject = 'Picture Enquiry';
//     var content = params.name + params.feedback;
//     return transporter
//         .sendMail({
//             from: "PictureAir.com Auto-Mailer <do-not-reply@pictureair.com>",to: toEmail,subject:subject,text: content, html: content
//         });
// }
// sendEmailcontactUs("zh-CN",["peter.dong@pictureworks.biz,meteor.liu@pictureworks.biz","zhaoyi@pictureworks.biz"],
//     {name:"test",feedback:"feedback",EmailAddress:"test@test.qq",parkName:"BPSG",
//         visitDate:"visitDate",pictureAirCode:"pictureAirCode",orderID:"orderID",operatingSystem:"operatingSystem"}).then(function(msg){
//    console.log(msg);
// }).catch(function(err){
//        console.error(err)
// });


// sendEmailTO("meteor.liu@pictureworks.biz","test","test").then(function(msg){
//    console.log(">>>>",msg);
// }).catch(function(err){
//        console.error(err)
// });


module.exports={
    sendEmail:sendEmail,
    sendSMS:sendSMS,
    sendMSMvalidateCode:sendMSMvalidateCode,
    sendEmailforgotPwdMsg:sendEmailforgotPwdMsg,
    getValidateCode:getValidateCode,
    sendEmailTO:sendEmailTO,
    sendEmailcontactUs:sendEmailcontactUs
}

