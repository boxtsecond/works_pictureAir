/**
 * Created by meteor on 14-12-26.
 */
//module.exports = function (app) {
//    console.log(app);
//}
var express = require('express');
var router = express.Router();
var ctr=require("./ctr");

router.all('/photo/removePhotosFromPP', ctr.photoController.removePhotosFromPP);
router.all('/card/getPPsByUserId', ctr.cardController.getPPsByUserId);
router.all('/card/getCouponsByUserId', ctr.cardController.getCouponsByUserId);
router.all('/card/removePPFromUser', ctr.cardController.removePPFromUser);

router.all('/getShareUrl', ctr.userController.getShareUrl);
router.all('/share', ctr.userController.share);
router.all('/getShareInfo', ctr.userController.getShareInfo);
router.all('/addCodeToUser', ctr.userController.addCodeToUser);
router.all('/updateUser', ctr.userController.updateUser);
//分享


module.exports = router;
