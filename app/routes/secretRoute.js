/**
 * Created by xueting-bo on 2017/2/16.
 */


var express = require('express');
var router = express.Router();
var ctr=require("./ctr");

router.post('/card/createCardCode', ctr.cardController.createCardCode);

module.exports = router;