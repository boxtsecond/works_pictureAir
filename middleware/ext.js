var util=require("../config/util");
function apiSend(result){
    if (result==null) return this.res.status(200).json({status: 200, msg: "success", result:{}});
    else if(util.isstring(result)) return this.res.status(200).json({status: 200, msg: result, result:{}});
    else if(util.isArray(result)){
        if(result.length<=0){
            return this.res.status(200).json({status: 200, msg: "success", result:{}});
        }else if (result.length==1){
            if(util.isstring(result[0])) return this.res.status(200).json({status: 200, msg: result[0].toString(), result:{}});
            else  if(util.isnumber(result[0])) return this.res.status(200).json({status: result[0], msg: "success", result:{}});
            else  if(util.isJonsObject(result[0])) return this.res.status(200).json({status: 200, msg: "success", result:result[0]});
            else return this.res.status(200).json({status: 503, msg: "no supper this dev input ", result:{result:result}});
        }else if (result.length==2){
            if(!util.isnumber(result[0])) return this.res.status(200).json({status: 503, msg: "no supper this dev input ", result:{result:result}});
            else if(util.isstring(result[1])) return this.res.status(200).json({status: result[0], msg: result[1], result:{}});
            else if(util.isJonsObject(result[1]))return this.res.status(200).json({status: result[0], msg: "success", result:result[1]});
            else return this.res.status(200).json({status: 503, msg: "no supper this dev input ", result:{result:result}});
        }else if (result.length==3){
            if(!util.isnumber(result[0])||!util.isstring(result[1]) || !util.isJonsObject(result[2])) return this.res.status(200).json({status: 503, msg: "no supper this dev input ", result:{result:result}});
            else return this.res.status(200).json({status: result[0], msg: result[1], result:result[2]});
        }else {
            return this.res.status(200).json({status: 503, msg: "no supper this dev input ", result:{result:result}});
        }
    }
    else if(util.isJonsObject(result)){
        if(!util.haveOwnproperty(result,"status")||!util.haveOwnproperty(result,"msg")){
            return this.res.status(200).json({status: 503, msg: "no supper this dev input status | msg  is required .", result:{}});
        }
        else if(!util.isnumber(result.status)||!util.isstring(result.msg)||(util.haveOwnproperty(result,"result")&&!util.isJonsObject(result.result))){
            return this.res.status(200).json({status: 503, msg: "no supper this dev input status | msg  is  type error.", result:{}});
        }
        else if(!util.haveOwnproperty(result,"result")){
            return  this.res.status(200).json({status: result.status, msg:result.msg, result:{}});
        }else {
            return this.res.status(200).json(result);
        }
    }else {
        this.res.status(200).json({status: 503, msg: "no supper this dev input ", result:{result:result}});
    }

};


/*
function apiSend(result){
    //success
    //if(err){
    //    return this.res.status(200).json({status: 503, msg: "no supper this dev input .", result:{}});
    //    //if(err.toString().toLowerCase()=='err'||err.toString().toLowerCase()=='error'){
    //    //     //if(haveOwnproperty())
    //    //    //是否存在result
    //    //    this.res.status(200).json({status: 503, msg: "", result:{}});
    //    //    //this.res.status(200).json(result);
    //    //}else {
    //    //    this.res.status(200).json(result);
    //    //}
    //}
    //else
    //console.log(result);
    if(isstring(result)) return this.res.status(200).json({status: 200, msg: result, result:{}});
    else if (result==null) return this.res.status(200).json({status: 200, msg: "success", result:{}});
    else if(isArray(result)){
        if(result.length<=0){
            return this.res.status(200).json({status: 200, msg: "success", result:{}});
        }else if (result.length=1){

        }
    }
    else if(isJonsObject(result)){
        if(!haveOwnproperty(result,"status")||!haveOwnproperty(result,"msg")){
            return this.res.status(200).json({status: 503, msg: "no supper this dev input status | msg  is required .", result:{}});
        }
        else if(!isnumber(result.status)||!isstring(result.msg)||(haveOwnproperty(result,"result")&&!isJonsObject(result.result))){
            return this.res.status(200).json({status: 503, msg: "no supper this dev input status | msg  is  type error.", result:{}});
        }
        else if(!haveOwnproperty(result,"result")){
            return  this.res.status(200).json({status: result.status, msg:result.msg, result:{}});
        }else {
            return this.res.status(200).json(result);
        }
    }else {
        this.res.status(200).json({status: 503, msg: "no supper this dev input ", result:{result:result}});
    }

};
*/

//function apiSend(status,msg,result){
//    //var resValue={status: 200, msg:"", result:{}};
//    if(status!=null&&!isnumber(status)||isundefined(status)){
//       return this.res.status(200).json({status:503, msg:"dev bug status must is null || number", result:{}});
//    }else if(!isstring(msg)&&isobject(result)){
//        return this.res.status(200).json({status:503, msg:"dev bug msg must is string || object", result:{}});
//    }else if(!isobject(result)&&!isundefined(result))
//    {
//        return this.res.status(200).json({status:503, msg:"dev bug result object", result:{}});
//    }else
//    if(status==null&&isundefined(msg)&&isundefined(result)){
//        return this.res.status(200).json({status:200, msg:"success", result:{}});
//    }else if(status==null&&isundefined(result)){
//        if(isobject(msg)) return this.res.status(200).json({status:200, msg:"success", result:msg});
//        else if(isstring(msg))return this.res.status(200).json({status:200, msg:msg, result:{}});
//    }else  if(status==null&&isstring(msg)&&isobject(result)){
//        return this.res.status(200).json({status:200, msg:msg, result:result});
//    }
//    else if(isnumber(status)&&isstring(msg)){
//        if(isundefined(result))  return this.res.status(200).json({status:status, msg:msg, result:{}});
//        else return this.res.status(200).json({status:status, msg:msg, result:result});
//    }
//    else if(isnumber(status)&&isobject(msg)&&isundefined(result)){
//        return this.res.status(200).json({status:status, msg:'', result:msg});
//    }else {
//        return this.res.status(200).json({status:503, msg:"no supper this dev input", result:{status:status,msg:msg,result:result}});
//        //console.error("no supper this dev input ",status,msg,result)
//    }
//};

function getReqParam(req) {
    if(req.originalMethod=='GET')return req.query;
    else  if(req.originalMethod=='POST')return req.body;
    else return {};
}
function getReqIP(req) {
    if(req.ip){
        //var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var ip = req.ip;
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7);
            return ip;
        }else  return ip;

    }
    else return '0.0.0.0';
}
module.exports.req=function(req,res){
    this.params=getReqParam(req);
    this.ip=getReqIP(req);
    this.isnumber=util.isnumber;
    this.isboolean=util.isboolean;
    this.isstring=util.isstring;
    this.isobject=util.isobject;
    this.isundefined=util.isundefined;
    this.isArray=util.isArray;
    this.isJonsObject=util.isJonsObject;
    this.isFunction=util.isFunction;
    this.isMap=util.isMap;
    this.arrayIsexist=util.arrayIsexist;
    this.isDate=util.isDate;
    this.haveOwnproperty=util.haveOwnproperty;
    this.formatDate=util.formatDate;
    this.md5=util.md5;
    this.sh1=util.sh1;
    this.replaceAll=util.replaceAll;
    this.res=res;
    this.json=apiSend;
    this.checkExistProperty=util.checkExistProperty;
    return this;
}
module.exports.res=function(req,res){
    this.res=res;
    this.json=apiSend;
};


//res.ext.json(null)
//res.ext.json("msg")
//res.ext.json({status:200,msg:"msg"});
//res.ext.json({ status: 201, msg: 'msg', result: {a:1} });
//res.ext.json([]);
//res.ext.json([201]);
//res.ext.json(["a"]);
//res.ext.json([{a:1}]);
//res.ext.json([202,"222"]);
//res.ext.json([203,{a:1}]);
//res.ext.json([204,"msg",{aa:3}]);


//不支持的写法

//res.ext.json([204,[],{aa:3}]);
//res.ext.json([1,2]);
//res.ext.json([1,[]]);
/*
res.ext.json([{},{}]);
res.ext.json([{},""]);
res.ext.json([{},1]);
res.ext.json([{},[]]);
*/




//res.ext.json(null,{status:200});==> {status: 200, msg: "success", result:{}}
//res.ext.json('err',{status:500});==> {status: 500, msg: " failure.", result:{}}
//res.ext.json('error',{status:500});==> {status: 500, msg: " failure.", result:{}}
//res.ext.json({result:XXXX}});  最终结果  {status: 200, msg: "success", result:{XXXX}}
//res.ext.json("balabala",{status:500});  最终结果  {status: 500, msg: "balabala", result:{}}?
//res.ext.json(null，"login success");  最终结果  {status: 200, msg: "ogin success", result:{}}
//res.ext.json(null，"login success",{token:"balabala"}); 最终结果
// {status: 200, msg: "login success", result:{token:"balabala"}}