/**
 * Created by xueting-bo on 17/1/11.
 */

var collectionname='storePhoto';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);
var Promise = require('bluebird');
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
//##################实例方法##################

var model = Promise.promisifyAll(db.model(collectionname, Schema));
module.exports = model;