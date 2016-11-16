var db=require('../mongodb.js');
//　j表示做1份日志，w表示做2个副本（尚不明确），超时时间10秒
//var options={safe:{j:1,w:2,wtimeout:10000}};
//上限设置   capped:1024}   {capped:{size:1024,max:100,autoIndexId:true}}
//自动索引   autoIndex

var mongoose=require('mongoose');
var options={}
var config={
    typename: {type:String,required:true,index:true},
    name: {type:String,required:true},
    jsonfilename: {type:String,required:true},
    jsonpath:{type:String,required:true,unique:true},
    jsonpathlist:[{
        background:{type:String,required:true}, main:{type:String,required:true},foreground:{type:String,required:true},
    }],
    layers:[{role:{type:String,required:true},x:{type:Number}}],
    author: {type:String,default:'admin'},
    use:{type:Boolean,default:false},
    createtime: { type: Date, default: Date.now },
    upadatetime: { type: Date, default: Date.now }
};
var gmPresetSchema = new mongoose.Schema(config,options);

module.exports={
    Schema:gmPresetSchema,
    db:db
};
//gmPreset.find({},function (err, docs) {
//if(err) console.warn(err)
//    else{
//    console.warn(docs);
//}
//});

