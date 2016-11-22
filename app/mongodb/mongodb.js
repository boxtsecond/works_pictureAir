/**
 * Created by meteor on 14-9-19.
 */
var mongoose = require('mongoose');
//var autoIncrement= require('mongoose-auto-increment');
var Promise = mongoose.Promise;
var configData=require('../../config.json').DB.MongoDB;
//var db=mongoose.createConnection(configData.host,configData.options,function(err){
//    if (err) {
//        console.warn('can not connect' + configData.host);
//        console.warn(err);
//    } else {
//        console.log('connect .. ' + configData.host);
//    }
//});
/*
 var opts = { server: { auto_reconnect: false,native_parser:true },  db:{native_parser:true}, user: configData.user, pass: configData.pass};
 var db = mongoose.createConnection(configData.host, configData.dbName,configData.port, opts,function(err){
 if (err) {
 console.warn('can not connect',err);
 console.warn(err);
 } else {
 console.log('connect .. host:'+configData.host+" port: "+configData.port);
 }
 });
 //mongoose.connect(configData.host,configData.options,function(err){
 //    if (err) {
 //        console.warn('can not connect' + configData.host);
 //        console.warn(err);
 //    } else {
 //        console.log('connect .. ' + configData.host);
 ////        console.log('Schema.Type  :  ' +JSON.stringify(mongoose.Schema.Type));
 //    }
 //});
 // 链接错误
 db.on('error', function(error) {
 db.close();
 console.log(error);
 });
 db.once('open',function(){
 //一次打开记录
 console.log('once open:'+configData.host)
 });
 db.on('close', function () {
 console.log('closecloseclosecloseclosecloseclosecloseclose');
 //    db=mongoose.createConnection(configData.host,configData.options,function(err){
 //        if (err) {
 //            console.warn('can not connect' + configData.host);
 //            console.warn(err);
 //        } else {
 //            console.log('connect .. ' + configData.host);
 //        }
 //    });
 });

 */


var opts = {
    "server":
    {"native_parser":true,"poolSize":5,"auto_reconnect": true,"socketOptions":{"keepAlive":1},"reconnectTries":30,"haInterval":1000 },
    "db":{"native_parser":true,"strategy": "ping","readPreference":"primaryPreferred","bufferMaxEntries":5},
    "replset":
    {"rs_name":"pictureWorks","readPreference":"primaryPreferred","strategy":"ping","poolSize":5,"connectWithNoPrimary":true,"haInterval":1000
    },
    user: configData.user, pass: configData.pass
};
var connectStr="mongodb://"+configData.host+":"+configData.arbport+","+configData.host+":"+configData.port+","+configData.host+":"+configData.bport+"/"+configData.dbName;
var db = mongoose.createConnection(connectStr,opts,function(err){
    if (err) {
        console.warn('can not connect',err);
        console.warn(err);
    } else {
        console.log('connect .. host:'+connectStr);
    }
});
db.on('error', function(error) {
    db.close();
    console.error(error);
});
db.on('reconnected',function(){
    console.log('reconnected:'+connectStr)
});
module.exports= db;