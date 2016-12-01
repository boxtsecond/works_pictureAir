var mongoose = require('mongoose');

var options={versionKey: false};
var config= {
    channelType:{type:String,index:true,required: true},//msm消息渠道,email或短信
    msgid:{type:String,index:true},//sms短信Id // email id
    sendFrom:{type:String,index:true},//发送方
    sendTo:{type:[String],index:true},//接收方
    code:{type: String},//en zh-cn zh-hk
    subject:{type:String},//主题
    content:{type:String},//内容
    validateCode:{type:String,index:true},//验证数据
    msgType:{type:String,index:true},//信息类型  //register forgotPassword
    expiredTime:{type:Date},//信息失效时间
    active:{type:Boolean,index:true},//是否可用
    sendTime:{type: Date,index:true},//发送时间
    createdOn: {type: Date, default: Date.now},//创建时间
    createdBy: {type: String,default:"system"},//创建人，userId
    modifiedOn: {type: Date, default: Date.now},//修改时间
    modifiedBy: {type: String,default:"system"}//修改人
};
module.exports={
    options:options,
    config:config
};
