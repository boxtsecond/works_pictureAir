/**
 * Created by meteor on 16/2/23.
 */

var async=require('async'),jstypeof=require('./jstypeof');


function apiSend(res,err,result){
    //console.log(err,result,jstypeof.haveOwnproperty(result,"status"));
    async.waterfall([
        function(cb){
            if(!jstypeof.haveOwnproperty(result,"status")||!jstypeof.haveOwnproperty(result,"msg"))
                cb(null,err,{status: 503, msg: "dev  not input status | msg | result error.", result:{}});
            else if(!jstypeof.haveOwnproperty(result,"result")) cb(null,err,{status: result.status, msg:result.msg, result:{}});
            else cb(null,err,{status: result.status, msg:result.msg, result:result.result});
        },
        function(err,result,cb){
            if(!jstypeof.isnumber(result.status)||!jstypeof.isstring(result.msg)||!jstypeof.isJonsObject(result.result)) {
                result.status=503; result.msg="dev input status | msg | result type error"; result.result={};
            }
            cb(null,err,result);
        },
        function(err,result,cb){
            cb(err,result);
        },
    ],function(err,ares){
        if(err=="err"||err=="error"){
            //ares.status=503;ares.msg='Server internal error';
            res.status(200).json(ares);
        }else{
            //res.status(ares.status).json(ares);
            res.status(200).json(ares);
        }
        res.end();
    });
};
function formatDate(date,fmt) {
    if(!jstypeof.isDate(date)) return null;
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}



module.exports={
    "apiSend":apiSend,
    "formatDate":formatDate,
    "haveOwnproperty":jstypeof.haveOwnproperty
}