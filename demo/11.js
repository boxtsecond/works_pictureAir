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
function apiSend(result){
    if (result==null) return console.log({status: 200, msg: "success", result:{}});
    else if(isstring(result)) return console.log({status: 200, msg: result, result:{}});
    else if(isArray(result)){
        if(result.length<=0){
            return console.log({status: 200, msg: "success", result:{}});
        }else if (result.length==1){
            if(isstring(result[0])) return console.log({status: 200, msg: result[0].toString(), result:{}});
            else  if(isnumber(result[0])) return console.log({status: result[0], msg: "success", result:{}});
            else  if(isJonsObject(result[0])) return console.log({status: 200, msg: "success", result:result[0]});
            else return console.log({status: 503, msg: "no supper this dev input ", result:{result:result}});
        }else if (result.length==2){
            if(!isnumber(result[0])) return console.log({status: 503, msg: "no supper this dev input ", result:{result:result}});
            else if(isstring(result[1])) return console.log({status: result[0], msg: result[1], result:{}});
            else if(isobject(result[1]))return console.log({status: result[0], msg: "success", result:result[1]});
            else return console.log({status: 503, msg: "no supper this dev input ", result:{result:result}});
        }else if (result.length==3){
            if(!isnumber(result[0])||!isstring(result[1]) || !isJonsObject(result[2])) return console.log({status: 503, msg: "no supper this dev input ", result:{result:result}});
            else return console.log({status: result[0], msg: result[1], result:result[2]});
        }else {
            return console.log({status: 503, msg: "no supper this dev input ", result:{result:result}});
        }
    }
    else if(isJonsObject(result)){
        if(!haveOwnproperty(result,"status")||!haveOwnproperty(result,"msg")){
            return console.log({status: 503, msg: "no supper this dev input status | msg  is required .", result:{}});
        }
        else if(!isnumber(result.status)||!isstring(result.msg)||(haveOwnproperty(result,"result")&&!isJonsObject(result.result))){
            return console.log({status: 503, msg: "no supper this dev input status | msg  is  type error.", result:{}});
        }
        else if(!haveOwnproperty(result,"result")){
            return  console.log({status: result.status, msg:result.msg, result:{}});
        }else {
            return console.log(result);
        }
    }else {
        console.log({status: 503, msg: "no supper this dev input ", result:{result:result}});
    }

};


//apiSend(null)
//apiSend("msg")
//apiSend({status:200,msg:"msg"});
//apiSend({ status: 201, msg: 'msg', result: {a:1} });
//apiSend([]);
//apiSend([201]);
//apiSend(["a"]);
//apiSend([{a:1}]);
//apiSend([202,"222"]);
//apiSend([203,{a:1}]);
//apiSend([204,"msg",{aa:3}]);


//不支持的写法

//apiSend([204,[],{aa:3}]);
//apiSend([1,2]);
//apiSend([1,[]]);
//apiSend([{},{}]);
//apiSend([{},""]);
//apiSend([{},1]);
//apiSend([{},[]]);