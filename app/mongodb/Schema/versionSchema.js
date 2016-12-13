/**
 * Created by xueting-bo on 16/11/28.
 */

var options = {};
var config = {
    appName:{type:String,index:true},//app名称
    version:{type:String,index:true},//版本号
    mandatory:{type:Boolean,default:false},//是否强制更新
    content:
        {
            en_US:{type:String},
            zh_CN:{type:String}
        }, //更新内容
    // content_EN:{type:String},//更新内容英文版
    downloadChannel:[{
        channel:String,
        downloadUrl:String
    }],
//    downloadUrl:{type:String},//下载地址
    versionOS:[String],//android，ios
    createdOn: {type: Date,default:Date.now()},//创建时间
    createdBy: {type: String,default:"system"},//创建人
    modifiedOn: {type: Date},//修改时间
    modifiedBy: {type: String}//修改人
};

module.exports={
    options:options,
    config:config
};