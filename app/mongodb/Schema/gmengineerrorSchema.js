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
    filepath:{type:String,required:true,unique:true},
    retrynumber:{type:Number,default:0},
    state:{type:Number,default:-1},
    msg:{type:String},
    ProcessState:{type:Boolean,default:false},
    uploadtime: { type: Date, default: Date.now },
    createtime: { type: Date, default: Date.now }
};
module.exports={
    options:options,
    config:config
};
