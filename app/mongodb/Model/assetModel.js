
var collectionname='asset';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);

Schema.statics.findAssets = function(Condition,dispaly,callback) {
    return this.model(collectionname).find(Condition,dispaly, callback);
}

Schema.statics.getOnAssetsFromId = function(_id,callback) {
    return this.model(collectionname).find({_id:_id},{}, callback);
}

Schema.statics.getAssetslist  = function(parkId,serverId,locationId,platformType,type,dispaly ,callback) {
    return this.model(collectionname).find({parkId:parkId,serverId:serverId,locationId:locationId,platformType: platformType,type:type,active:true},dispaly, callback);
}
Schema.statics.getAllAssetslist  = function(condition,dispaly ,callback) {
    //{parkId:parkId,serverId:serverId,locationId:locationId,platformType: platformType,type:type}
    return this.model(collectionname).find(condition,dispaly, callback);
}
Schema.statics.findByPlatformType = function(platformType, callback) {
    return this.model(collectionname).find({platformType: platformType,active:true}, callback);
}
Schema.statics.findByPlatformTypeAndTypeAndassetName  = function(platformType,type,assetName, callback) {
    return this.model(collectionname).find({platformType: platformType,type:type,assetName:assetName}, callback);
}
Schema.statics.findByPlatformTypeAndType = function(platformType,type,dispaly, callback) {
    return this.model(collectionname).find({platformType: platformType,type:type,active:true},dispaly, callback);
}

Schema.statics.findByPlatformTypeAndTypeAndLocationId = function(platformType,type,locationId, callback) {
    return this.model(collectionname).find({platformType: platformType,type:type,locationId:locationId,active:true}, callback);
}
Schema.statics.findByLocationId = function(locationId, callback) {
    return this.model(collectionname).find({locationId:locationId,active:true}, callback);
}
Schema.statics.findAll = function(callback) {
    return this.model(collectionname).find({}, callback);
}
Schema.statics.findAllActiveTrue = function(callback) {
    return this.model(collectionname).find({active:true}, callback);
}
Schema.statics.findAllActiveFalse = function(callback) {
    return this.model(collectionname).find({active:false}, callback);
}
Schema.statics.findByType= function(type, callback) {
    return this.model(collectionname).find({type: type}, callback);
}
Schema.statics.findBy_Id= function(_id, callback) {
    return this.model(collectionname).find({_id: _id}, callback);
}
Schema.statics.UpdateById = function(id,value,callback) {
    //return this.model(collectionname).update{}.find({name: name}, callback);
    return this.model(collectionname).update({_id: id},{$set:value},{upsert : true}, callback);
}
Schema.statics.removeById = function(id,callback) {
    return this.model(collectionname).remove({_id: id}, callback);
}
//Schema.statics.insertOneEntity = function(value,callback) {
//    var entity=new model(value); entity.save(callback);
//}

//Schema.statics.insert = function(arrayEntity,callback) {
//    //return this.model(collectionname).update{}.find({name: name}, callback);
//    return this.model(collectionname).collection.insert(arrayEntity, callback);
//}

//##################静态方法##################
//##################实例方法##################
Schema.methods.insert= function(callback) {
    return this.save(callback);
};
//##################实例方法##################
var model=db.model(collectionname, Schema);
//model.Schema.statics.insert=function(arrayEntity,callback){
//    this.collection.insert(potatoBag, callback);
//};
//console.log(typeof model);
module.exports=model;

