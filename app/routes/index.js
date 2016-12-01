/**
 * Created by meteor on 14-12-26.
 */
//module.exports = function (app) {
//    console.log(app);
//}
var express = require('express');
var router = express.Router();
//app.all('/api*',connectEnsureLogin.ensureLoggedIn(),function (req, res, next) {
//    next();
//});
//var index=require("../controller/index");
//router.get('/',index.index);
router.get('/',function(req,res){
    res.json({status:200,msg:"",result:{}});
});
module.exports = router;
