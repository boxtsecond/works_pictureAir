/**
 * Created by meteor on 14-8-27.
 */
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
    for(var itemdata in data) {
        if(itemdata===propertyname) if(data[itemdata]!==null&&data[itemdata]!=='') result=true;
    }
    return result;
}
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

