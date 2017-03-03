/**
 * Created by xueting-bo on 2017/3/2.
 */

var collectionname='order';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);

Schema.methods.insert= function(callback) {
    return this.save(callback);
};

// var model = Promise.promisifyAll(db.model(collectionname, Schema));
var model = db.model(collectionname, Schema);
module.exports = model;