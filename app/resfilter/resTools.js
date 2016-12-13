/**
 * Created by meteor on 16/12/12.
 */
var util=require("../../config/util");
var isDate=function isDate(data){
    if((data instanceof Date)&& Date === data.constructor) return true;else return false;
}
function formatDate(date,fmt) {
    if(new Date(date).toString(date) !== 'Invalid Date'){
        date = new Date(date);
    }
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
    var dstr=str.split(" ");convertDateToStr
    var yy=dstr[0].split("-");
    var hh=dstr[1].split(":");
    return new Date(Number(yy[0]),Number(yy[1]-1),Number(yy[2]),Number(hh[0]),Number(hh[1])
        ,Number(hh[2]));
    // console.log(formatDate(new Date(Number(yy[0]),Number(yy[1]-1),Number(yy[2]),Number(hh[0]),Number(hh[1])
    //     ,Number(hh[2]))
    //     ,"yyyy-MM-dd hh:mm:ss"));
    // var hh=str.split(" ");
}
function haveOwnproperty(data,propertyname){
  var result=false;
    for(var itemdata in data) {
        if(itemdata===propertyname) if(data[itemdata]!==null) result=true;
    }
    return result;
};

var dateArray=["bindOn","expiredOn","soldOn"];
function  convertToDatetimestampToStr(customerIds_item) {
    var item_item={};
    for(var citem in customerIds_item){
        var cuitem=customerIds_item[citem];
        if(dateArray.indexOf(citem)>=0) item_item[citem]=convertDateToStr(new Date(cuitem));
        else item_item[citem]=cuitem;
    }
    return item_item;
}

// console.log({a:1})
// function  convertDatetimestampToStr(customer) {
//     var item_item={};
//     // console.log("1>>>",customerIds_item);
//     for(var citem in customer){
//         var cuitem=customer[citem];
//         // console.log("222>",cuitem)
//         if(util.isDate(cuitem)){
//             dateArray.push(citem);
//             item_item[citem]=convertDateToStr(cuitem);
//         }
//     //     else item_item[citem]=cuitem;
//     }
//     return item_item;
// }

function convertDatetimestampForMart(customerIds) {
    var res=[];
    if(customerIds.length>0){
        for(var item in customerIds){
            var customerIds_item=customerIds[item];
            res.push(convertToDatetimestampToStr(customerIds_item));
        }
    }
    return res;
}
// function convertDateTotimestampStr(customerIds){
//     var res=[];
//     // console.log("customerIds: ",customerIds)
//     if(customerIds.length>0){
//         for(var item in customerIds){
//             var customerIds_item=customerIds[item];
//              // console.log(customerIds_item);
//             res.push(convertDatetimestampToStr(customerIds_item));
//         }
//     }
//     return res;
// }

module.exports = {
    haveOwnproperty:haveOwnproperty,
    formatDate:formatDate,
    convertDateToStr:convertDateToStr,
    convertDateToStrYYMMDD:convertDateToStrYYMMDD,
    convertStrToDate:convertStrToDate,
    convertDatetimestampForMart:convertDatetimestampForMart,
    // convertToDatetimestampToStr:convertToDatetimestampToStr,
    // convertDateTotimestampStr:convertDateTotimestampStr
}
