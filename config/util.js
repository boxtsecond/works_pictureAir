var crypto=require('crypto');
function Padstr(str,totalWidth, paddingChar, isRightPadded) {
    if (str.length < totalWidth) {
        var paddingString = new String();
        for (i = 1; i <= (totalWidth - str.length); i++) {
            paddingString += paddingChar;
        }
        if (isRightPadded) {
            return (str + paddingString);
        } else {
            return (paddingString + str);
        }
    } else {
        return str;
    }
}
function getBeforeNumberSecondDate(d,second){
    d = new Date(d);
    d = +d - 1000*second;
    d = new Date(d);
    return d;
}
function getNextNumberSecondDate(d,second){
    d = new Date(d);
    d = +d + 1000*second;
    d = new Date(d);
    return d;
}
function md5(str){
    var md5sum=crypto.createHash('md5');
    md5sum.update(str);
    str=md5sum.digest('hex');
    return str;
}
function replaceAll(str,s1,s2){
    return str.replace(new RegExp(s1,"gm"),s2);
}
var  toString =Object.prototype.toString;
var isType=function(type)
{
    return function(obj){
        return toString.call(obj)=='[object '+type+']';
    }
}
var isString=isType('String');
var isFunction=isType('Function');
var isnumber=function(data)
{
    if(isundefined(data)) return false;
    if(data==="") return false;
    if(typeof(data) ==="number"&& Number === data.constructor) return true;else return false;
}
var isboolean=function(data)
{
    if(isundefined(data)) return false;
    if(typeof(data) ==="boolean"&& Boolean === data.constructor) return true;else return false;
}
var isstring=function(data)
{
    if(isundefined(data)) return false;
    if(typeof(data) ==="string"&& String === data.constructor) return true;else return false;
}
var isobject=function(data)
{
    if(isundefined(data)) return false;
    if(typeof(data) ==="object"&& Object === data.constructor) return true;else return false;
}
var isundefined=function(data)
{
    if(typeof(data) ==="undefined") return true;else return false;
}
var isArray=function(data)
{
    if(isundefined(data)) return false;
    if((data instanceof Array)&& Array === data.constructor) return true;else return false;
}
//function isArray(object){
//    return  object && typeof object==='object' &&
//        typeof object.length==='number' &&
//        typeof object.splice==='function' &&
//        //判断length属性是否是可枚举的 对于数组 将得到false
//        !(object.propertyIsEnumerable('length'));
//}
var isJonsObject=function(data)
{
    if(isundefined(data)) return false;
    if(typeof data!=='object'||isArray(data)) return false;else return true;
}
var isFunction=function(data)
{
    if(isundefined(data)) return false;
    if(typeof data!=='function'||isArray(data)) return false;else return true;
}
function isMap(ob) {
    var i = 0;
    for(var x in ob)
        i++;
    return i > 0;
}
var arrayIsexist=function arrayIsexist(list,itemvalue){
    if(typeof(list) ==="undefined"||typeof(itemvalue) ==="undefined"||!(list instanceof Array)|| Array != list.constructor) return false;
    else{
        if (itemvalue && ~list.indexOf(itemvalue)) {
            return  true;
        }else{
            return  false;
        }
    }
}
var isDate=function isDate(data)
{
    if(isundefined(data)) return false;
    if((data instanceof Date)&& Date === data.constructor) return true;else return false;
}
////属性不能为null      才返回true
var haveOwnproperty=function haveOwnproperty(data,propertyname){
    //var result=false;
    //if(isArray(propertyname)){
    //    //console.log("....")
    //    for(var itemdata in propertyname) {
    //        if(data[propertyname[itemdata]]) return true;
    //    }
    //     return result;
    //}else{
    //    console.log("....",(data[propertyname]&&!isFunction(data[propertyname])))
    //    if('..') console.log("@@@@@@@@");
    //    if(data[propertyname]&&!isFunction(data[propertyname])) return true;
    //    return result;
    //}

    var result=false;
    for(var itemdata in data) {
        if(itemdata===propertyname) if(data[itemdata]!==null) result=true;
    }
    return result;
    //if(Object.prototype.hasOwnProperty.call(data, propertyname)) return true;
    //else return false;
};
// console.log(haveOwnproperty({ username: '', password: 'password' },"username"))
//console.log(haveOwnproperty({ username: '', password: 'password' },"username"))
//console.log(haveOwnproperty({aa:"1",haveOwnproperty:haveOwnproperty},["aa"]));

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

// console.log(formatDate(new Date(),"yyyy-MM-dd hh:mm:ss"))
// console.log(convertStrToDate("2016-12-12 10:03:35"))
function txtStrReplace(drawTextStr,dReplaceArray){
    //console.log("drawTextStrReplace",drawTextStr,dReplaceArray);
    //var drawTextStr="";
    if(drawTextStr=='') return drawTextStr;
    else
    if(isArray(dReplaceArray)) {
        for(var item in dReplaceArray){
            var drawTextItem=dReplaceArray[item];
            if(drawTextItem){
                if(isFunction(drawTextItem.value)&&drawTextItem.value)
                    drawTextStr=replaceAll(drawTextStr,drawTextItem.name,drawTextItem.value());
                else
                    drawTextStr=replaceAll(drawTextStr,drawTextItem.name,drawTextItem.value);
            }
        }
        return drawTextStr;
    }else   return drawTextStr;
}
function replaceAllPromise(str,dReplaceArray,index){
    if(!isnumber(index))index=-1;
    return new Promise(function (resolve, reject) {
        //console.log("index ",index,dReplaceArray.length,dReplaceArray[index])
        if(index>=dReplaceArray.length-1) return resolve(str);
        else{
             index++;
            if(index==-1) return replaceAllPromise(replaceAll(str,dReplaceArray[index].name,dReplaceArray[index].value)
                ,dReplaceArray,index
            );
            else
            return resolve(replaceAllPromise(replaceAll(str,dReplaceArray[index].name,dReplaceArray[index].value)
                ,dReplaceArray,index
            ));

        }

        //return resolve([replaceAll(str,dReplaceArray[index].name,dReplaceArray[index].value)
        //,dReplaceArray,index]
        //);
    });
}
function txtStrReplacePromise(drawTextStr,dReplaceArray){
    var index=0;
    return new Promise(function (resolve, reject) {
        if(drawTextStr=='') return reject(drawTextStr);
        else if(!isArray(dReplaceArray)) return reject(drawTextStr);
        else return resolve([drawTextStr,dReplaceArray,index]);
    }).then(function(obj){
            return  replaceAllPromise(obj[0],obj[1]);
     }).catch(function(str){
            return str;
        })
};

exports.checkExistProperty = function (data, propertyName) {
    var propertyArray = [];
    if(isstring(propertyName)){
        propertyArray = propertyName.split(',');
    }else if(isArray(propertyName)){
        propertyArray = propertyName;
    }else {
        return false;
    }

    for(var item in propertyArray){
        if(!data[propertyArray[item]] || data[propertyArray[item]] === null){
            return false;
        }
    }
    return true;
}

//txtStrReplacePromise("#d##date#%#date##date##date##date##date#aaaaa%date1%%date1%%date1%#d#%555%",[
//    {name:'#d#',value:"ddddd"},
//    //{name:'#date#',value:"6666"},
//    //{name:'%555%',value:"啦啦啦啦"}
//]).then(function(err){
//    console.log(err);
//})
//console.log(
//    txtStrReplace("#date#22%date1%%date%%date1%%date1%222%date2%",[{name:'#date#',value:"6666"},{name:'%date1%',value:"5555"}])
//)
module.exports.isnumber=isnumber;
module.exports.isboolean=isboolean;
module.exports.isstring=isstring;
module.exports.isobject=isobject;
module.exports.isundefined=isundefined;
module.exports.isArray=isArray;
module.exports.isJonsObject=isJonsObject;
module.exports.isFunction=isFunction;
module.exports.isMap=isMap;
module.exports.arrayIsexist=arrayIsexist;
module.exports.isDate=isDate;
module.exports.haveOwnproperty=haveOwnproperty;
module.exports.formatDate=formatDate;
module.exports.md5=md5;
module.exports.replaceAll=replaceAll;
module.exports.txtStrReplace=txtStrReplace;
module.exports.txtStrReplacePromise=txtStrReplacePromise;
module.exports.Padstr=Padstr;
module.exports.getBeforeNumberSecondDate=getBeforeNumberSecondDate;
module.exports.getNextNumberSecondDate=getNextNumberSecondDate;

module.exports.convertDateToStr=convertDateToStr;
module.exports.convertDateToStrYYMMDD=convertDateToStrYYMMDD;
module.exports.convertStrToDate=convertStrToDate;

