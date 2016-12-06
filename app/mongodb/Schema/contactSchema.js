/**
 * Created by xueting-bo on 16/12/6.
 */

var options={versionKey: false};
var config= {
    name: {type: String},//创建人姓名
    EmailAddress: {type: String},//创建人邮箱
    parkName: {type: String},//乐园名称
    subject:{type:String},//主题
    content:{type:String},//内容
    createdOn: {type: Date, default: Date.now},//创建时间
    createdBy: {type: String,default:"system"},//创建人，userId
    dataOfVisit :{type: Date},//游览时间


    sendFrom:{type:String,index:true},//发送方
    sendTo:{type:[String],index:true},//接收方
    code:{type: String},//en zh-cn zh-hk

};
module.exports={
    options:options,
    config:config
};
