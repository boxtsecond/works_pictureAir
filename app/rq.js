/**
 * Created by meteor on 16/11/24.
 */

var verifyreg=require('./lib/verifyreg');
var resfilter_user=require('./resfilter/user');
var resInfo=require('./resfilter/resInfo');
var config=require('../config/config');
var util=require('../config/util');
var configData=config.config.configJSONData;
var _=require('lodash');
var access_token=require('../config/access_token');
var redisclient=require('./redis/redis').redis;
var jwt = require('jsonwebtoken');
var Promise=require('bluebird');
Promise.promisifyAll(jwt);
var request=require("request");
Promise.promisifyAll(request);
var uuid=require('uuid');
var nodemailer=require("nodemailer");
Promise.promisifyAll(nodemailer);
var auth=require('../middleware/auth');
var userMode=require('./mongodb/Model/userModel');
var userMsgModel=require('./mongodb/Model/userMsgModel');
//Promise.promisifyAll(fs);
module.exports= {
    verifyreg:verifyreg,
    resfilter_user:resfilter_user,
    config:config,
    configData:configData,
    _:_,
    access_token:access_token,
    redisclient:redisclient,
    jwt:jwt,
    Promise:Promise,
    bluebird:Promise,
    request:request,
    util:util,
    uuid:uuid,
    nodemailer:nodemailer,
    resInfo:resInfo,
    auth:auth,
    userMode:userMode,
    userMsgModel:userMsgModel
};


