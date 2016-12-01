var collectionname='photoPassPlus';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);
//##################实例方法##################
var model = Promise.promisifyAll(db.model(collectionname, Schema));
module.exports = model;