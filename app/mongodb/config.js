/**
 * Created by meteor on 14-9-24.
 */
/**
 * Created by meteor on 14-9-19.
 */
var mongoose = require('mongoose');
//var autoIncrement= require('mongoose-auto-increment');
var Promise = mongoose.Promise;
var gmginejson=JSON.parse(require("fs").readFileSync(require('path').join(require('path').normalize(__dirname+"/.."),"gmgine.json"), 'utf8'));
configData=gmginejson.config.MongoDB;

//var db=mongoose.createConnection(configData.host,configData.options,function(err){
//    if (err) {
//        console.warn('can not connect' + configData.host);
//        console.warn(err);
//    } else {
//        console.log('connect .. ' + configData.host);
//    }
//});
//mongoose.connect(configData.host,configData.options,function(err){
//    if (err) {
//        console.warn('can not connect' + configData.host);
//        console.warn(err);
//    } else {
//        console.log('connect .. ' + configData.host);
////        console.log('Schema.Type  :  ' +JSON.stringify(mongoose.Schema.Type));
//    }
//});
//// 链接错误
//db.on('error', function(error) {
//    db.close();
//    console.log(error);
//});
//db.once('open',function(){
//    //一次打开记录
//    console.log('once open:'+configData.host)
//});
//db.on('close', function () {
//    console.log('closecloseclosecloseclosecloseclosecloseclose');
////    db=mongoose.createConnection(configData.host,configData.options,function(err){
////        if (err) {
////            console.warn('can not connect' + configData.host);
////            console.warn(err);
////        } else {
////            console.log('connect .. ' + configData.host);
////        }
////    });
//});
var db;
var open=function open(){
   return mongoose.createConnection(configData.host,configData.options,function(err){
    if (err) {
        console.warn('can not connect' + configData.host);
        console.warn(err);
    } else {
        console.log('connect .. ' + configData.host);
    }
});
}
//db.once('open',function(){
//    //一次打开记录
//    console.log('once open:'+configData.host)
//});
//db.on('close', function () {
//    console.log('closecloseclosecloseclosecloseclosecloseclose');
////    db=mongoose.createConnection(configData.host,configData.options,function(err){
////        if (err) {
////            console.warn('can not connect' + configData.host);
////            console.warn(err);
////        } else {
////            console.log('connect .. ' + configData.host);
////        }
////    });
//});
function close()
{
    db.close();
}

module.exports.open= open;