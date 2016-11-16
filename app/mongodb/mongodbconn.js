/**
 * Created by meteor on 14-9-19.
 */
var mongoose = require('mongoose');
function conn(DBconfig,conncb){
    var opts = {
          "server": {"native_parser":true,"poolSize":5,"auto_reconnect": true,"socketOptions":{"keepAlive":1},"reconnectTries":30,"haInterval":1000
}, 
 "db":{"native_parser":true,"strategy": "ping","readPreference":"nearest","bufferMaxEntries":5},
"replset":{"rs_name":"pictureWorks","readPreference":"nearest","strategy":"ping","poolSize":5,"connectWithNoPrimary":true,"haInterval":1000
}
   };
    var connectStr="mongodb://"+DBconfig.host+":"+DBconfig.port+","+DBconfig.host+":"+DBconfig.bport+"/"+DBconfig.dbName;
    //console.log(connectStr)
    var connectStr="mongodb://"+configData.host+":"+configData.port+","+configData.host+":"+configData.bport+"/"+configData.dbName;
  var  db=mongoose.createConnection(connectStr,opts,function(err){ 
         if (err) {
            conncb(err);
         } else {
             conncb(null,db);
         }
     }); 
  /*
    var db = mongoose.connect(connectStr,opts,function(err){
        if (err) {
            conncb(err);
        } else {
            conncb(null,db);
        }
    });
    */
    //db.on('error', console.error.bind(console, 'connection error:'));
    //db.once('open', function (callback) {
    //    // yay!
    //});
}

var models=[];
function conndb(collectionname,DBconfig,cb){
    //{host:"172.16.164.29",port:828,bport:827,dbName:"pictureAir"}
    //console.log(collectionname,DBconfig);
    conn(DBconfig,function(err,db){
        if(err) cb(err);
        else {
            var findItem= _.find(models, function(chr) {
                if(chr.collectionname.toLocaleLowerCase().toString().trim()
                    ==collectionname.toString().toLocaleLowerCase().toString().trim())
                    return chr;
            });
            if(findItem){
                cb(null,findItem.model);
            }else {
                var SchemaInfo=require('./Schema/'+collectionname+'Schema.js');
                var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);
                var model= mongoose.model(collectionname, Schema);
                models.push({"collectionname":collectionname,"model":model});
                cb(null,model);
            }
        }
    });
}



module.exports.conndb= conndb;