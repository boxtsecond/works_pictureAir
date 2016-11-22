/**
 * Created by meteor on 16/11/22.
 */
var ext=require("./ext");
module.exports=function(options){
    var opts = options || {};
    return function(req,res,next){
        if(Object.prototype.hasOwnProperty.call(req, "ext")){
            console.warn("this req.extend is exist");
        }
        else  req['ext']=new ext.req(req,res);
        if(Object.prototype.hasOwnProperty.call(res, "ext")){
            console.warn("this req.extend is exist");
        }
        else  res['ext']=new ext.res(req,res);
        next();
    };
};