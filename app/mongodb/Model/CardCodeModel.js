var collectionname='CardCode';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
//##################实例方法##################
var model=db.model(collectionname, Schema);
module.exports=model;