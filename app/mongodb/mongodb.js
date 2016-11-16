/**
 * Created by meteor on 14-9-19.
 */
 
var cluster = require('cluster');
var mongoose = require('mongoose');
//var autoIncrement= require('mongoose-auto-increment');
var Promise = mongoose.Promise;
var gmginejson=require('../../config/config.js').config.DB;
configData=gmginejson.MongoDB;
//var db=mongoose.createConnection(configData.host,configData.options,function(err){
//    if (err) {
//        console.warn('can not connect' + configData.host);
//        console.warn(err);
//    } else {
//        console.log('connect .. ' + configData.host);
//    }
//});

// var opts = { server: { auto_reconnect: false,native_parser:true },  db:{native_parser:true}, user: configData.user, pass: configData.pass};
// var db = mongoose.createConnection(configData.host, configData.dbName,configData.port, opts,function(err){
//     if (err) {
//         console.warn('can not connect',err);
//         console.warn(err);
//     } else {
//         console.log('connect .. host:'+configData.host+" port: "+configData.port);
//     }
// }); 

/*var opts = { 
    server: {poolSize:5,auto_reconnect: true,native_parser:true,socketOptions:{keepAlive:1}}, 
 db:{native_parser:true},
replset:{rs_name:"pictureWorks"}
};*/
/*
var opts = { 
	replica:true,
    server: {poolSize:5,auto_reconnect: true,native_parser:true, 
    	reconnectInterval:10,reconnectTries:10,haInterval:100,
    	socketOptions:{noDelay:true,keepAlive:0,connectTimeoutMS:10,socketTimeoutMS:0} 
   }, 
 db:{native_parser:true,readPreference:"primaryPreferred",strategy:"ping",wtimeout:10},
replset:{strategy:"ping",haInterval:10,rs_name:"pictureWorks",readPreference:"nearest"}
};*/
/*
socketOptions:{autoReconnect:true,
    		noDelay:true,keepAlive:1,connectTimeoutMS:100,socketTimeoutMS:100}
     ,reconnectInterval:30,reconnectTries:500,haInterval:500,

     ,wtimeout:1000
*/
var opts = { 
          "server": {"native_parser":true,"poolSize":5,"auto_reconnect": true,"socketOptions":{"keepAlive":300000,"connectTimeoutMS":300000,"socketTimeoutMS":300000},"reconnectTries":30,"haInterval":10000
}, 
 "db":{"native_parser":true,"strategy": "ping","readPreference":"primaryPreferred","bufferMaxEntries":5,"wtimeout":300000},
"replset":{"rs_name":"pictureWorks","readPreference":"primaryPreferred","strategy":"ping","poolSize":5,"socketOptions":{"keepAlive":300000,"connectTimeoutMS":300000,"socketTimeoutMS":300000},"connectWithNoPrimary":true,"haInterval":10000
   },
            user: configData.user, pass: configData.pass
};
   console.log(configData)
var connectStr="mongodb://"+configData.host+":"+configData.arbport+","+configData.host+":"+configData.port+","+configData.host+":"+configData.bport+"/"+configData.dbName;
 var  db=mongoose.createConnection(connectStr,opts,function(err){ 
         if (err) {
             console.warn('can not connect' + configData.host);
            console.warn(err);
         } else {
             console.log('connect .. ' + connectStr);
         }
     }); 
cluster.on('exit', function(worker, code, signal) { 
      db.close(); 
     console.error('worker close MongoDB' + worker.process.pid + ' died');
       
});

 

// If the Node process ends, close the Mongoose connection 
 




/*db.openSet(connectStr,opts,function(err){ 
         if (err) {
             console.warn('can not openSet' + configData.host);
            console.warn(err);
         } else {
             console.log('openSet .. ' + configData.host);
         }
     });

var db = mongoose.connect(connectStr,opts,function(err){
    if (err) {
        console.warn('can not connect',err);
        console.warn(err);
    } else {
        console.log('connect .. host:'+connectStr);
    }
});
*/
// mongoose.connect(configData.host,configData.options,function(err){
//    if (err) {
//        console.warn('can not connect' + configData.host);
//        console.warn(err);
//    } else {
//        console.log('connect .. ' + configData.host);
// //        console.log('Schema.Type  :  ' +JSON.stringify(mongoose.Schema.Type));
//    }
// });

process.on('exit', function () {
　　setTimeout(function () {
　　　　console.log('This will not run');
　　}, 100);
　　console.log('Bye.');
});
process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
})
/*process.on('exit', function () {
　　db.close();
});*/
 db.on('error', function(error) { 
    db.close();
 	 console.warn("errrr"); 
 });
 db.once('open',function(){ 
     console.warn('once open111111111111111:'+connectStr)
 });
 db.on('timeout',function(){ 
     console.warn('once timeout:'+connectStr)
 });
 db.on('close',function(){ 
     console.warn('once close:'+connectStr)
 });
  db.on('ha',function(){ 
     console.warn('once ha:'+connectStr)
 });
  db.on('fullsetup',function(){
     console.warn('fullsetup:'+connectStr)
 });
   db.on('left',function(){
     console.warn('left:'+connectStr)
 });
 db.on('connecting',function(){
     console.warn('connecting:'+connectStr)
 });
  db.on('connected',function(){
     console.warn('connected:'+connectStr)
 });
   db.on('open',function(){
     console.warn('open:'+connectStr)
 });
    db.on('disconnecting',function(){ 
     console.warn('disconnecting:'+connectStr)
 });

 db.on('disconnected',function(){  
     console.log('disconnected:'+connectStr)
 });
 db.on('reconnected',function(){  
     console.log('reconnected:'+connectStr)
 });
  db.on('all',function(){ 
     console.log('all:'+connectStr)
 }); 
// db.on('close', function () {
//     console.log('closecloseclosecloseclosecloseclosecloseclose');
// //    db=mongoose.createConnection(configData.host,configData.options,function(err){
// //        if (err) {
// //            console.warn('can not connect' + configData.host);
// //            console.warn(err);
// //        } else {
// //            console.log('connect .. ' + configData.host);
// //        }
// //    });
// });
module.exports= db;