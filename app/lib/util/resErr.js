//{"status": 500,msg:'Server internal error'}
var jstypeof=require('./jstypeof');
function resErr(res,err,result){
    if(err){
        if(err=="err"){
            if(jstypeof.hasOwnProperty(result,"status")){
                res.status(result.status).json(result);
            }else{
                res.status(result.status).json(result);
            }
            res.end();
        }else{
            if(jstypeof.haveOwnproperty(err,"status")&&jstypeof.haveOwnproperty(err,"msg")){
                res.status(err.status).json(err);
            }else
            res.status(503).json({"status": 500,msg:'Server internal error'});
            res.end();
        }
    }else{
        if(jstypeof.haveOwnproperty(result,"status")&&jstypeof.haveOwnproperty(result,"msg")){
            res.status(200).json(result);
        }else{
            res.status(200).json({"status": 200,msg:result});
        }
        res.end();
    }
    return;
};

module.exports={
    "resErr":resErr
}