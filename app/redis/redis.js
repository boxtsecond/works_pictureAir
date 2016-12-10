/**
 * Created by meteor on 14-10-22.
 */
/**
 * Created by meteor on 14-7-31.
 */
var Promise=require('bluebird');
var gmginejson=require('../../config/config.js').config.DB; 
var redisConfig=gmginejson.redis;
var redisport=redisConfig.port,redishost=redisConfig.host,
    residoption={detect_buffers: true,password:redisConfig.requirepass};
//var redis = require("redis");
var Redis = require('ioredis');
//Promise.promisifyAll(Redis);
var client=new Redis(redisport,redishost,residoption);
//console.log(client)
//client.connect(redisport,redishost,residoption).then(function(err){
//     console.log(err)
// })
//var redis = require('ioredis');

//
////redis.createClient(redisport,redishost,residoption).then(function(err){
////    console.log(err)
////})
//    client = redis.createClient(redisport,redishost,residoption);
//     client.auth(redisConfig.requirepass);
////Promise.promisifyAll(client);
//
//client.on("connect", function () {
//      console.log(' connect reids to \" '+redishost+" \"  use port: "+redisport);
//});
//client.on("error", function (err) {
//    //  console.log("Error " + err);
//    return false;
//});
//client.incr("foo_rand000000000000", function(err, reply) {
//    // reply is null when the key is missing
//    console.log(reply);
//});

exports.redis=client;



//set get  hset hget hmset hget hgetall

// client.hset("roban:demo:hset","today","fine",function(err,response){
//     console.log(err,response);
// });

// db.collection.find({description: /August [0-9]+, 1969/}).maxTimeMS(50)


// client.hmset("roban:demo:hset","lastday","notgood","nextday","willbefine",function(err,response){
//     console.log(err,response);
// });
//
//
// client.hget("roban:demo:hset","today",function(err,response){
//     console.log(err,response);
// });

// client.hgetall("roban:demo:hset",function(err,response){
//     console.log(err,response);
// });