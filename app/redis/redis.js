/**
 * Created by meteor on 14-10-22.
 */
/**
 * Created by meteor on 14-7-31.
 */
    
var gmginejson=require('../../config/config.js').config.DB; 
var redisConfig=gmginejson.redis;
var redisport=redisConfig.port,redishost=redisConfig.host,
    residoption={detect_buffers: true};
var redis = require("redis"),
    client = redis.createClient(redisport,redishost,residoption);
     client.auth(redisConfig.requirepass);
client.on("connect", function () {
      console.log(' connect reids to \" '+redishost+" \"  use port: "+redisport);
});
client.on("error", function (err) {
    //  console.log("Error " + err);
    return false;
});
//client.incr("foo_rand000000000000", function(err, reply) {
//    // reply is null when the key is missing
//    console.log(reply);
//});

exports.redis=client;