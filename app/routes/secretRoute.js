/**
 * Created by xueting-bo on 2017/2/16.
 */


var express = require('express');
var router = express.Router();
var ctr=require("./ctr");

router.post('/card/createCardCode', ctr.cardController.createCardCode);

router.post('/photos/removeRealPhotos', ctr.photoController.removeRealPhotos);

module.exports = router;