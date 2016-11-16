var fs = require("fs"); var path=require('path');
var log4js=require('log4js');
var createDateFolder= function createDateFolder (module_name) {
    var logsFilePath = __dirname.substring(0, __dirname.lastIndexOf('config'));
    var ndate = new Date();   var year = ndate.getFullYear();
    var month = ndate.getMonth() + 1;  if (month < 10) month = "0" + month;
    var datelogfilename = year + '' + month;
    logsFilePath=path.join(logsFilePath,'logs');
//    if (!fs.existsSync(logsFilePath))
//        fs.mkdirSync(logsFilePath);
//    logsFilePath=path.join(logsFilePath,datelogfilename);
//    if (!fs.existsSync(logsFilePath))
//        fs.mkdirSync(logsFilePath);
//    var date = ndate.getDate();
//    if (date < 10) date = "0" + date;
//    logsFilePath=path.join(logsFilePath,date.toString());
//    if (!fs.existsSync(logsFilePath))
//        fs.mkdirSync(logsFilePath);
//    logsFilePath=path.join(logsFilePath,module_name.toString());
//    if (!fs.existsSync(logsFilePath))
//        fs.mkdirSync(logsFilePath);
////       console.log(logsFilePath)
//    logsFilePath= path.join(logsFilePath,'/');
    return logsFilePath;
}
var configInfo=require('./config').config;
module.exports = {
    getLogFormat: function() {
        return configInfo.log.morgan.formart;
    },
    getLogOptions: function() {
        var options = {};
        try {
            if(configInfo.log.morgan.toFile){
                var accessLogStream = fs.createWriteStream(createDateFolder('morgan') + '/morgan.log', {flags: 'a'});
                options={stream: accessLogStream};
            }

        } catch (e) {
            options = {};
        }

        return options;
    }

};