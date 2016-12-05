'use strict';
var fs = require('fs'),path=require('path');
var rootpath=__dirname.substring(0, __dirname.lastIndexOf('config'));
module.exports.rootpath=rootpath;
//var logger=require('./log4js.js').logger;
var configJSONData=JSON.parse(require("fs").readFileSync(require('path').join(__dirname,'..',"config.json"), 'utf8'));

//module.exports.logger=logger;
module.exports.config={
    "log":{
        "morgan":{
            "toFile":false,
            //    Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
            "formart":'dev'
        }
    },
    "port":configJSONData.port,
    "DB":configJSONData.DB,
    "files":{
        'upload':path.join(rootpath,'static','upload'),
        "website" :{
            Path:configJSONData.websitePath,
            Host:configJSONData.websitePathHost
        },
        "assets":configJSONData.assets
    },
    "dashboard": {
        dashBoardParkId: "DisneyShangHai",
        dashBoardRoom: "dashboard"
    },
    "apiPort":3006,
    "serverIP":"http://www.disneyphotopass.com",
    "MasterAPIList":{
        pullPhotosFromLocal:'http://172.16.164.17:3000/help/getPhotosByPPs',
        removePhotosFromPP:'http://172.16.164.17:3000/sync/removePhotosFromPP'
    },
    "configJSONData":configJSONData
}
module.exports.photosize=require('./photosize');