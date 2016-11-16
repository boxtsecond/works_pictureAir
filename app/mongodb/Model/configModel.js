/**
 * Created by meteor on 14-9-19.
 */
var collectionname='config';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);
//##################实例方法##################
Schema.methods.findByName= function(name, callback) {
    return this.model(collectionname).find({name: name}, callback);
}
Schema.methods.findByType= function(type, callback) {
    return this.model(collectionname).find({type: type}, callback);
}
Schema.methods.findAll = function(callback) {
    return this.model(collectionname).find({}, callback);
}
//##################实例方法##################
//##################静态方法##################
Schema.statics.findByName = function(name, callback) {
    return this.model(collectionname).find({name: name}, callback);
}
Schema.statics.findAll = function(callback) {
    return this.model(collectionname).find({}, callback);
}
Schema.statics.findByType= function(type, callback) {
    return this.model(collectionname).find({type: type}, callback);
}
//##################静态方法##################
var model=db.model(collectionname, Schema);
module.exports=model;