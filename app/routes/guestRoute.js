/**
 * Created by meteor on 14-12-26.
 */
//module.exports = function (app) {
//    console.log(app);
//}
var ctr=require("./ctr");
var express = require('express');
var router = express.Router();
router.post('/user/login',ctr.users.login);
router.post('/user/register',ctr.users.register);
router.post('/user/sendsms',ctr.users.sendSMS);
router.post('/user/sendemailpwd',ctr.users.sendEmailForgotPwdMsg);
router.post('/user/verifymobilecode',ctr.users.verifyMobileCode);
router.post('/user/forgotpwd',ctr.users.resetPassword);

router.all('/user/contactUs', ctr.userController.contactUs);

router.all('/photo/getPhotosByConditions', ctr.photoController.getPhotosByConditions);

router.all('/park/getAllLocations', ctr.parkController.getAllLocations);
router.all('/park/getAllParks', ctr.parkController.getAllParks);
router.all('/park/getAllParksVersion', ctr.parkController.getAllParksVersion);
router.all('/park/getParksVersionBySiteId', ctr.parkController.getParksVersionBySiteId);
router.all('/park/getParkBySiteId', ctr.parkController.getParkBySiteId);




router.all('/cache/carousel', ctr.cacheController.carousel);


//分享


module.exports = router;
