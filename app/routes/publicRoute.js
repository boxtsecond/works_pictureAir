/**
 * Created by meteor on 14-12-26.
 */
//module.exports = function (app) {
//    console.log(app);
//}
var express = require('express');
var router = express.Router();
var ctr=require("./ctr");

router.get('/share', ctr.userController.getShareInfo);



module.exports = router;
