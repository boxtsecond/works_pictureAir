/**
 * Created by meteor on 16/3/25.
 */
var jstypeof=require('./jstypeof.js');
var crypto=require('crypto'),path=require("path");
function memoryPercentageLimit(engineConfig,cb){
    var memoryFree=parseInt((os.freemem()/os.totalmem()*100));
    if(memoryFree>=engineConfig.config.sys.memoryPercentageLimit){
        return true;
    }else{
        return false;
    }
}
function haveOwnproperty(data,propertyname){
    var result=false;
    for(var itemdata in data) {
        if(itemdata===propertyname) if(data[itemdata]!==null&&data[itemdata]!=='') result=true;
    }
    return result;
}
function arrayIsexist(list,itemvalue){
    if(typeof(list) ==="undefined"||typeof(itemvalue) ==="undefined"||!(list instanceof Array)|| Array != list.constructor) return false;
    else{
        for(var i=0;i<list.length;i++)
        {
            list[i]=list[i].toLowerCase();
        }
        if (itemvalue && ~list.indexOf(itemvalue.toLowerCase())) {
            return  true;
        }else{
            return  false;
        }
    }
}
function arrayIsexistEnginelist(list,itemvalue){
    if(typeof(list) ==="undefined"||typeof(itemvalue) ==="undefined"||!(list instanceof Array)|| Array != list.constructor) return false;
    else{
        for(var i=0;i<list.length;i++)
        {
            if(list[i].hasOwnProperty("conditions")) {
                var listitem = list[i].conditions.toLowerCase();
                if (itemvalue && listitem == itemvalue.toLowerCase()) return true;
            }
        }
        return  false;
    }
}
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
function getLocationIdFromFilename(filename){
    var Str_result="";
    if(jstypeof.isstring(filename)&&filename.indexOf('-')>0)      Str_result=filename.substring(filename.indexOf('_')+1,filename.indexOf('-'));
    return Str_result;
}
//20140922
function getDateStringFromData(fileDate){
    if(fileDate instanceof Date){
        var year = fileDate.getFullYear(); //getFullYear getYear
        var month = fileDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var date = fileDate.getDate();
        if (date < 10) date = "0" + date;
        return year + '' + month+''+date;
    }else{
        return null;
    }
}

var getDataString =function getDataString(){  var ndate = new Date();
    var year = ndate.getFullYear(); //getFullYear getYear
    var month = ndate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = ndate.getDate();
    if (date < 10) date = "0" + date;
    var datelogfilename = year + '' + month+''+date;
    return datelogfilename;
}
function getFileNameFromPath(spath){
    return  path.basename(spath, path.extname(spath));
}
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
function baseConverter (number,ob,nb) {
    //http://www.geneffects.com/briarskin/programming/newJSMathFuncs.html/
    // Created 1997 by Brian Risk.  http://brianrisk.com
    number = number.toUpperCase();
    var list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var dec = 0;
    for (var i = 0; i <=  number.length; i++) {
        dec += (list.indexOf(number.charAt(i))) * (Math.pow(ob , (number.length - i - 1)));
    }
    number = "";
    var magnitude = Math.floor((Math.log(dec))/(Math.log(nb)));
    for (var i = magnitude; i >= 0; i--) {
        var amount = Math.floor(dec/Math.pow(nb,i));
        number = number + list.charAt(amount);
        dec -= amount*(Math.pow(nb,i));
    }
    return number;
}
function getphotocode(photoCode){
    var photoCode_fix=photoCode.substring(0,5);
    photoCode=photoCode.substring(5,15+5);
    var StrphotoCode=photoCode_fix+baseConverter(photoCode,4,4);
    var arrayAU=['0','1','2','3','4','5','6','7','8','9'
        ,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u'];
    var random=Math.ceil(Math.random()*(30-0)+0);
    StrphotoCode+=arrayAU[random].toString().toUpperCase();
    return StrphotoCode;
}
function generatorCode() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    return year + "" + month + "" + day + "" +uuid.v4().slice(-7);
}
function AesEn (cryptkey, iv, cleardata) {
    try {
        var encipher = crypto.createCipheriv('aes-128-cbc', cryptkey, iv),
            encoded  = encipher.update(cleardata, 'utf8', 'hex');
        encoded += encipher.final( 'hex' );
        return encoded;
    }catch(err){
        console.error(err)
        return null;
    }
}
function AesDe(cryptkey, iv, secretdata) {
    try {
        var  decipher = crypto.createDecipheriv('aes-128-cbc', cryptkey, iv),
            decoded = decipher.update(secretdata, 'hex', 'utf8');
        decoded += decipher.final('utf8');
        return decoded;
    }catch(err){
        return null;
    }
}

function enUrl(strUrl){
    var KEY="PICTUREAIR082816";
    var IV ="PICTUREAIR082816";
    return "media/"+AesEn(KEY,IV,"/"+strUrl);
}
function deUrl(strUrl){
    var KEY="PICTUREAIR082816";
    var IV ="PICTUREAIR082816";
    return AesDe(KEY,IV,strUrl)
}
function cloneObj(obj) {
    var jsonStr=JSON.stringify(obj);
    if(jsonStr.indexOf("_id")>0) jsonStr="{"+jsonStr.substr(34);
       return JSON.parse(jsonStr);
}
module.exports={
    enUrl:enUrl,
    deUrl:deUrl,
    memoryPercentageLimit:memoryPercentageLimit,
    haveOwnproperty:haveOwnproperty,
    arrayIsexist:arrayIsexist,
    arrayIsexistEnginelist:arrayIsexistEnginelist,
    formatDate:formatDate,
    getLocationIdFromFilename:getLocationIdFromFilename,
    getDateStringFromData:getDateStringFromData,
    getDataString:getDataString,
    getFileNameFromPath:getFileNameFromPath,
    Padstr:Padstr,
    getphotocode:getphotocode,
    generatorCode:generatorCode,
    cloneObj:cloneObj
}