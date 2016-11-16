/**
 * Created by meteor on 2014/11/21.
 */

var mongoose = require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
var options={}
var config={
    name:{type:String,required:true},
    type:{type:String,default: 'system'},
    updateby: { type: String, default: 'system' },
    createtime:{ type: Date, default: Date.now },
    uploadtime: { type: Date, default: Date.now },
    value:{}
};
module.exports={
    options:options,
    config:config
};