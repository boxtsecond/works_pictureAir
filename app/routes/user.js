var express = require('express');
var router = express.Router();
var users=require("../controllers/user.js");
router.get('/',function(req,res){
    res.json({status:200,msg:"",result:{}});
});

//users
router.post('/login',users.login);
router.post('/register',users.register);
router.post('/sendsms',users.sendSMS);
router.get('/register',function(req,res){
    //console.log(req.ext);
    //console.log(getReqParam(req,res));
    console.log( req.ext.params);
    res.ext.json(null);
    //res.ext.json('err',{status:503,msg:"",result:{}});
    //res.json({status:200,msg:"",result:{}});
});
module.exports = router;
