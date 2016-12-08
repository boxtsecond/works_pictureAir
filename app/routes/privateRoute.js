/**
 * Created by meteor on 14-12-26.
 */
//module.exports = function (app) {
//    console.log(app);
//}
var express = require('express');
var router = express.Router();
var ctr=require("./ctr");
router.post('/user/switchlg',ctr.users.switchLanguage);
router.post('/user/switchlg',ctr.users.logout);

router.post('/user/getShareUrl', ctr.userController.getShareUrl);
router.post('/user/share', ctr.userController.share);
router.post('/user/getShareInfo', ctr.userController.getShareInfo);
router.get('/user/addCodeToUser', ctr.userController.addCodeToUser);
router.post('/user/updateUser', ctr.userController.updateUser);
router.post('/user/modifyUserPwd', ctr.userController.modifyUserPwd);

router.get('/photo/removePhotosFromPP', ctr.photoController.removePhotosFromPP);
router.get('/card/getPPsByUserId', ctr.cardController.getPPsByUserId);
router.get('/card/getCouponsByUserId', ctr.cardController.getCouponsByUserId);
router.get('/card/removePPFromUser', ctr.cardController.removePPFromUser);



module.exports = router;
