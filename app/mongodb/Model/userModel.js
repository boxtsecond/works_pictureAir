var collectionname='user';//数据表
var mongoose=require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);
Schema.statics.getAllPark = function(dispaly, callback) {
    return this.model(collectionname).find({active : true},dispaly, callback);
}
Schema.statics.getParkFromId = function(id,dispaly, callback) {
    return this.model(collectionname).find({_id:id},dispaly, callback);
}
//##################实例方法##################
Schema.methods.insert= function(callback) {
    return this.save(callback);
};
Schema.plugin(passportLocalMongoose);
var model=db.model(collectionname, Schema);
module.exports=model;