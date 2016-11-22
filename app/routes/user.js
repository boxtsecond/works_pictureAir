var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.json({status:200,msg:"",result:{}});
});
function getReqParam(req, res) {
    var params={};
    console.log(querystring.parse(req.body))
    if(req.query){
        return url.parse(req.url, true).query;
    } else if(req.body){
        return querystring.parse(req.body);
    }
}
router.post('/register',function(req,res){
    //console.log(req.ext);
    //console.log(getReqParam(req,res));
    console.log( req.ext.params);
    req.ext.json(null,{status:200,msg:""});
    //res.json({status:200,msg:"",result:{}});
});
router.get('/register',function(req,res){
    //console.log(req.ext);
    //console.log(getReqParam(req,res));
    console.log( req.ext.params);
    res.ext.json(null);
    //res.ext.json('err',{status:503,msg:"",result:{}});
    //res.json({status:200,msg:"",result:{}});
});
module.exports = router;
