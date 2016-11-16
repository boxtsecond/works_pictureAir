var db=require('../mongodb.js');
var mongoose=require('mongoose'),Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var options={};
var config={
    parkId:{type:ObjectId},
    serverId:{type:ObjectId},
    platformType:{type:String,default:'mobile',required:true,index:true},// engine airditor  mobile
    id:{type:String,index:true},
    assetName:{type:String,required:true},//图片简介
    type:{type:String,index:true},//frame,clipart,background,font
    font:{type:String},
    path:{type:String,required:true},
    url:{type:String,required:true},
    filesize:{type:Number,default:-1},
    width:{type:Number,default:-1},
    height:{type:Number,default:-1},
    locationId:{type:String},//location的_id
    location:{type:String,default:''},//location
    active:{type:Boolean,default:false},//是否有效
    thumbnailType: [], //缩略图类型
    thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
    note:{type:String},//图片简介
    createdBy: {type:String,default:'system'},//创建者ID
    modifiedBy: {type:String,default:'system'},
    createtime: { type: Date, default: Date.now },
    modifytime: { type: Date, default: Date.now }
};
module.exports={
    options:options,
    config:config
};
