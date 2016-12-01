var express = require('express');
var router = express.Router();
var auth=require("../controllers/auth");
router.get('/',function(req,res){
    res.json({status:200,msg:"",result:{}});
});

//users
router.post('/getAccessToken',auth.getAccessToken);
module.exports = router;
