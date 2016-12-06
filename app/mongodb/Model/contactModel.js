/**
 * Created by xueting-bo on 16/12/6.
 */

var collectionname='contact';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);

Schema.methods.insert= function(callback) {
    return this.save(callback);
};

var model = Promise.promisifyAll(db.model(collectionname, Schema));
module.exports = model;