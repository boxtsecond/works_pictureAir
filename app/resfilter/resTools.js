/**
 * Created by meteor on 16/12/12.
 */
var isDate=function isDate(data){
    if((data instanceof Date)&& Date === data.constructor) return true;else return false;
}
function formatDate(date,fmt) {
    if(!isDate(date)) return "";
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
function convertDateToStr(dt) {
    return formatDate(dt,"yyyy-MM-dd hh:mm:ss");
}
function convertDateToStrYYMMDD(dt) {
    return formatDate(dt,"yyyy-MM-dd");
}
function convertStrToDate(str) {
    var dstr=str.split(" ");
    var yy=dstr[0].split("-");
    var hh=dstr[1].split(":");
    return new Date(Number(yy[0]),Number(yy[1]-1),Number(yy[2]),Number(hh[0]),Number(hh[1])
        ,Number(hh[2]));
    // console.log(formatDate(new Date(Number(yy[0]),Number(yy[1]-1),Number(yy[2]),Number(hh[0]),Number(hh[1])
    //     ,Number(hh[2]))
    //     ,"yyyy-MM-dd hh:mm:ss"));
    // var hh=str.split(" ");
}

module.exports = {
    formatDate:formatDate,
    convertDateToStr:convertDateToStr,
    convertDateToStrYYMMDD:convertDateToStrYYMMDD,
    convertStrToDate:convertStrToDate
}