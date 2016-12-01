/**
 * Created by xueting-bo on 16/11/20.
 */

exports.checkExistByArrayProperty = function (field, arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][field] == value) {
            return true;
        }
    }
    return false;
}

exports.getListByPropertiesFromArray=function(fields, arr) {
    var results=[];
    for (var i = 0; i < arr.length; i++) {
        var isFlag=true;
        for(var j=0;j<fields.length;j++){
            if (arr[i][fields[j].field] != fields[j].value) {
                isFlag=false;
            }
        }
        if(isFlag==true){
            results.push( arr[i]);
        }
    }
    return results;
}

//fields:[{field:'',value:''}]
exports.getObjByPropertiesFromArray=function(fields, arr) {
    for (var i = 0; i < arr.length; i++) {
        var isFlag=true;
        for(var j=0;j<fields.length;j++){
            if (arr[i][fields[j].field] != fields[j].value) {
                isFlag=false;
            }
        }
        if(isFlag==true){
            return arr[i];
        }
    }
    return null;
}

exports.getArrayProperty=function(field, arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][field] == value) {
            return arr[i];
        }
    }
    return null;
}

//判断是否是正整数
exports.isPositiveNumber= function(input)
{
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/
    var number = input;

    if (!re.test(number))
    {
        return false
    }else{
        return parseInt(number);
    }
}