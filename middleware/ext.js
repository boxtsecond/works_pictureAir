var  toString =Object.prototype.toString;
var isType=function(type)
{
    return function(obj){
        return toString.call(obj)=='[object '+type+']';
    }
}
var isString=isType('String');
var isFunction=isType('Function')
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
////属性不能为null  or  '' 并且存在   才返回true
var haveOwnproperty=function haveOwnproperty(data,propertyname){
    var result=false;
    if(isArray(propertyname)){
        //console.log("....")
        for(var itemdata in propertyname) {
            if(data[propertyname[itemdata]]) return true;
        }
         return result;
    }else{
        if(data[propertyname]&&!isFunction(data[propertyname])) return true;
        return result;
    }


    //var result=false;
    //for(var itemdata in data) {
    //    if(itemdata===propertyname) if(data[itemdata]!==null) result=true;
    //}
    //return result;
    //if(Object.prototype.hasOwnProperty.call(data, propertyname)) return true;
    //else return false;
};
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
//function apiSend(err,result){
//    //success
//    if(err){
//        if(err.toString().toLowerCase()=='err'||err.toString().toLowerCase()=='error'){
//             //if(haveOwnproperty())
//            //是否存在result
//            this.res.status(200).json({status: 503, msg: "", result:{}});
//            //this.res.status(200).json(result);
//        }else {
//            this.res.status(200).json(result);
//        }
//    }
//    else
//    if(!haveOwnproperty(result,"status")||!haveOwnproperty(result,"msg")){
//        return this.res.status(200).json({status: 503, msg: "dev  not input status | msg  error.", result:{}});
//    }
//    else if(!isnumber(result.status)||!isstring(result.msg)||(haveOwnproperty(result,"result")&&!isJonsObject(result.result))){
//        return this.res.status(200).json({status: 503, msg: "dev input status | msg | result type error.", result:{}});
//    }
//    else if(!haveOwnproperty(result,"result")&&(err==null)){
//        return  this.res.status(200).json({status: result.status, msg:result.msg, result:{}});
//    }else {
//       return this.res.status(200).json(result);
//    }
//};
function apiSend(status,msg,result){
    //var resValue={status: 200, msg:"", result:{}};
    if(status!=null&&!isnumber(status)||isundefined(status)){
       return this.res.status(200).json({status:503, msg:"dev bug status must is null || number", result:{}});
    }else if(!isstring(msg)&&isobject(result)){
        return this.res.status(200).json({status:503, msg:"dev bug msg must is string || object", result:{}});
    }else if(!isobject(result)&&!isundefined(result))
    {
        return this.res.status(200).json({status:503, msg:"dev bug result object", result:{}});
    }else
    if(status==null&&isundefined(msg)&&isundefined(result)){
        return this.res.status(200).json({status:200, msg:"success", result:{}});
    }else if(status==null&&isundefined(result)){
        if(isobject(msg)) return this.res.status(200).json({status:200, msg:"success", result:msg});
        else if(isstring(msg))return this.res.status(200).json({status:200, msg:msg, result:{}});
    }else  if(status==null&&isstring(msg)&&isobject(result)){
        return this.res.status(200).json({status:200, msg:msg, result:result});
    }
    else if(isnumber(status)&&isstring(msg)){
        if(isundefined(result))  return this.res.status(200).json({status:status, msg:msg, result:{}});
        else return this.res.status(200).json({status:status, msg:msg, result:result});
    }
    else if(isnumber(status)&&isobject(msg)&&isundefined(result)){
        return this.res.status(200).json({status:status, msg:'', result:msg});
    }else {
        return this.res.status(200).json({status:503, msg:"no supper this dev input", result:{status:status,msg:msg,result:result}});
        console.error("no supper this dev input ",status,msg,result)
    }
};
function getReqParam(req, res) {
    if(req.originalMethod=='GET')return req.query;
    else  if(req.originalMethod=='POST')return req.body;
    else return {};
}
module.exports.req=function(req,res){
    this.params=getReqParam(req,res);
    this.isnumber=isnumber;
    this.isboolean=isboolean;
    this.isstring=isstring;
    this.isobject=isobject;
    this.isundefined=isundefined;
    this.isArray=isArray;
    this.isJonsObject=isJonsObject;
    this.isFunction=isFunction;
    this.isMap=isMap;
    this.arrayIsexist=arrayIsexist;
    this.isDate=isDate;
    this.haveOwnproperty=haveOwnproperty;
    this.formatDate=formatDate;
    //this.res=res;
    //this.json=apiSend;
    return this;
}
module.exports.res=function(req,res){
    this.res=res;
    this.json=apiSend;
}
//
//function apiSend(err,result){
//    //success
//    if(err){
//        if(err.toString().toLowerCase()=='err'||err.toString().toLowerCase()=='error'){
//            //if(haveOwnproperty())
//            //是否存在result
//            this.res.status(200).json({status: 503, msg: "", result:{}});
//            //this.res.status(200).json(result);
//        }else {
//            this.res.status(200).json(result);
//        }
//    }
//    else
//    if(!haveOwnproperty(result,"status")||!haveOwnproperty(result,"msg")){
//        return this.res.status(200).json({status: 503, msg: "dev  not input status | msg  error.", result:{}});
//    }
//    else if(!isnumber(result.status)||!isstring(result.msg)||(haveOwnproperty(result,"result")&&!isJonsObject(result.result))){
//        return this.res.status(200).json({status: 503, msg: "dev input status | msg | result type error.", result:{}});
//    }
//    else if(!haveOwnproperty(result,"result")&&(err==null)){
//        return  this.res.status(200).json({status: result.status, msg:result.msg, result:{}});
//    }else {
//        return this.res.status(200).json(result);
//    }
//};
////function apiSend(err,msg,result){
////
////};
//function apiSend(status,msg,result){
//     //var resValue={status: 200, msg:"", result:{}};
//    if(status!=null&&!isnumber(status)||isundefined(status)){
//        console.log({status:503, msg:"dev bug status must is null || number", result:{}})
//    }else if(!isstring(msg)&&isobject(result)){
//        console.log({status:503, msg:"dev bug msg must is string || object", result:{}})
//    }else if(!isobject(result)&&!isundefined(result))
//    {
//        console.log({status:503, msg:"dev bug result object", result:{}})
//    }else
//    if(status==null&&isundefined(msg)&&isundefined(result)){
//        console.log({status:200, msg:"success", result:{}})
//    }else if(status==null&&isundefined(result)){
//        if(isobject(msg))  console.log({status:200, msg:"success", result:msg});
//        else if(isstring(msg)) console.log({status:200, msg:msg, result:{}});
//    }else  if(status==null&&isstring(msg)&&isobject(result)){
//        console.log({status:200, msg:msg, result:result});
//    }
//    else if(isnumber(status)&&isstring(msg)){
//        if(isundefined(result))  console.log({status:status, msg:msg, result:{}});
//        else console.log({status:status, msg:msg, result:result});
//    }
//    else if(isnumber(status)&&isobject(msg)&&isundefined(result)){
//
//        console.log({status:status, msg:'', result:msg});
//    }else {
//        console.log({status:503, msg:"no supper this dev input", result:{status:status,msg:msg,result:result}})
//        console.error("no supper this dev input ",status,msg,result)
//    }
//};
//200
//apiSend(200,"login success");
//apiSend(null);
//apiSend(null,"login success");
//apiSend(null,"login success",{info:1});
//apiSend(null,{info:1});
////其他状态码
//apiSend(300,"msg");
//apiSend(401,"msg",{info:2});
//apiSend(300,{});

//apiSend(300);
//apiSend('sss',401);
//500





//res.ext.json(null,{status:200});==> {status: 200, msg: "success", result:{}}
//res.ext.json('err',{status:500});==> {status: 500, msg: " failure.", result:{}}
//res.ext.json('error',{status:500});==> {status: 500, msg: " failure.", result:{}}
//res.ext.json({result:XXXX}});  最终结果  {status: 200, msg: "success", result:{XXXX}}
//res.ext.json("balabala",{status:500});  最终结果  {status: 500, msg: "balabala", result:{}}?
//res.ext.json(null，"login success");  最终结果  {status: 200, msg: "ogin success", result:{}}
//res.ext.json(null，"login success",{token:"balabala"}); 最终结果
// {status: 200, msg: "login success", result:{token:"balabala"}}