/**
 * Created by meteor on 15/8/4.
 */
var collectionname='license';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);
Schema.statics.findAll = function(callback) {
    return this.model(collectionname).find({}, callback);
};
Schema.statics.findFromuuid = function(uuid,callback) {
    return this.model(collectionname).find({uuid:uuid}, callback);
};
Schema.statics.findBYid = function(id,callback) {
    return this.model(collectionname).find({_id:id}, callback);
};
Schema.statics.UpdateByuuid= function(uuid,value,callback) {
    return this.model(collectionname).update({uuid: uuid},{$set:value},{upsert : true}, callback);
};
Schema.statics.UpdateById = function(id,value,callback) {
    //return this.model(collectionname).update{}.find({name: name}, callback);
    return this.model(collectionname).update({_id: id},{$set:value},{upsert : true}, callback);
}
Schema.methods.insert= function(callback) {
    return this.save(callback);
};
var model=db.model(collectionname, Schema);
module.exports=model;

