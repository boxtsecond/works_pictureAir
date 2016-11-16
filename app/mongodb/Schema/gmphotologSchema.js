/**
 * Created by meteor on 14-9-26.
 */
/**
 * Created by meteor on 14-9-22.
 */
//　j表示做1份日志，w表示做2个副本（尚不明确），超时时间10秒
//var options={safe:{j:1,w:2,wtimeout:10000}};
//上限设置   capped:1024}   {capped:{size:1024,max:100,autoIndexId:true}}
//自动索引   autoIndex
var mongoose = require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
var options={}
var config={
    imagename:{type:String,required:true},
    state:{type:Number,default:0},
    backuppath:{type:String,required:true},
    rawpath:{type:String,required:true},
    presetname:{type:String,required:true},
    presetjsonpath:{type:String,required:true},
    photospath:{type:String,required:true,unique:true},
    photojsonpath:{type:String,required:true},
    thumbnails:[],
    shootTime: { type: Date },
    uploadtime: { type: Date, default: Date.now },
    starttime: { type: Date},
    completetime: { type: Date, default: Date.now },
    ispriority:{type: Boolean, default: false},
    obj:{}
};
module.exports={
    options:options,
    config:config
};

