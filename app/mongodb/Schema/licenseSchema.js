var db=require('../mongodb.js');
var mongoose=require('mongoose'),Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var options={};
var config={
    userId:{type:ObjectId,unique:true,required:true},
    uuid:{type:String,unique:true,required:true},
    license:[{
         ieduuid:{type:String,required:true},
         productcode:{type:String,required:true},
         platform:{type:String},
         timeZoneOffset:{type:Number,default:-1},
         systime: { type: Date, default: Date.now },
         environment:{},
         environmentlast:{}
       }
    ],
    product:{type:String},
    dbpwd:{type:String},
    timeoverdue:{type: Date, default: new Date("1997","01","01")},
    verifytime:{type: Date, default: new Date("1997","01","01")},
    prompttime:{type: Date, default: new Date("1997","01","01")},
    credit:{type:Number,default:0},
    expired:{type:Boolean,default:false},
    lastloginTime:{ type: Date, default: Date.now },
    note:{type:String},
    createdBy: {type:String,default:'system'},
    modifiedBy: {type:String,default:'system'},
    createtime: { type: Date, default: Date.now },
    modifytime: { type: Date, default: Date.now }
};

module.exports={
    options:options,
    config:config
};