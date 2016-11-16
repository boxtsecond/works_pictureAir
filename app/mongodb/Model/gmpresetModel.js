/**
 * Created by meteor on 14-9-19.
 */
var DBandSchema=require('../Schema/gmPresetSchema');
var Schema=DBandSchema.Schema;
var db=DBandSchema.db;
var entity=require('../Entity/gmPreset.js');
//##################实例方法##################
var collectionname='gmPreset';
Schema.methods.findbyusername= function(username, callback) {
    return this.model(collectionname).find({username: username}, callback);
}
Schema.methods.findAll = function(callback) {
    return this.model(collectionname).find({}, callback);
}
//##################实例方法##################
//##################静态方法##################
Schema.statics.findbytitle = function(title, callback) {
    return this.model(collectionname).find({title: title}, callback);
}
Schema.statics.findAll = function(callback) {
    return this.model(collectionname).find({}, callback);
}
var model=db.model(collectionname, Schema);
//##################静态方法##################
//// 增加记录 基于 entity 操作
//var mongooseEntity = new model(entity);
//mongooseEntity.save(function(error) {
//    if(error) {
//        console.log(error);
//    } else {
//        console.log('saved OK!');
//    }
//    // 关闭数据库链接
//    db.close();
//});
// 增加记录 基于model操作
//model.create(entity, function(error){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log('save ok');
//    }
//    // 关闭数据库链接
//    db.close();
//});
// 修改记录
//model.update(conditions, update, options,callback);
//var conditions = {};
//var update     = {$set : {age : 27, title : 'model_demo_title_update'}};
//var options    = {upsert : true};
//model.update(conditions, update, options, function(error){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log('update ok!');
//    }
//    //关闭数据库链接
//    db.close();
//});

//model.findAll(function(error,data){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(data);
//        console.log('save ok');
//    }
//})
// 查询
// 基于实例方法的查询
//var mongooseEntity = new model({});
//mongooseEntity.findAll(function(error, result){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(result);
//    }
//    //关闭数据库链接
//    db.close();
//});


//
//
//var inSchema=new model(entity);
//// 增加记录 基于model操作
//model.create(entity, function(error){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log('save ok');
//    }
//    // 关闭数据库链接
//   //  db.close();
//});


// mongoose find
//var criteria = {}; // 查询条件
//var fields   = {jsonpath : 1, name : 1, typename : 1}; // 待返回的字段
//var options  = {};
//model.find(criteria, fields, options, function(error, result){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(result);
//    }
//    //关闭数据库链接
//    db.close();
//});
// 删除记录
//var conditions = {name: 'beach72'};
//model.remove(conditions, function(error){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log('delete ok!');
//    }
//    //关闭数据库链接
//    db.close();
//});
module.exports=model;