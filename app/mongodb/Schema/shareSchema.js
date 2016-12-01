/**
 * Created by xueting-bo on 16/11/22.
 */
var mongoosedb=require('../mongodb.js');
var mongoose=require('mongoose');

var options = {};
var config = {
    shareDomain: {type: String},//分享者域名
    sharerId: {type: String, index: true},//分享者id
    sharerName: {type: String},//分享者id
    shareUrl: {type: String},//分享内容地址
    shareShortUrl: {type: String},//分享短链接
    secretKey: {type: String, index: true, require: true},//分享链接密匙
    shareCount: {type: Number, default: 0},//分享次数
    shareContent: {//分享内容
        mode: {type: String},//photo、userInfo、product
        ids: [{type: String}]
    },
    shareSource: {//分享源
        title: {type: String},
        description: {type: String},
        ip: {type: String},//分享者IP地点
        platform: {type: String},//分享至platform
        terminal: {type: String}//分享来源终端
    },
    createdOn: {type: Date, default: Date.now},//创建时间
    modifiedOn: {type: Date}
};

module.exports={
    options:options,
    config:config
};