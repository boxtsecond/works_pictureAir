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
router.post('/user/verifyemailcode',ctr.users.verifyEmailCode);
router.post('/user/forgotpwd',ctr.users.resetPassword);

router.get('/user/contactUs', ctr.userController.contactUs);

router.post('/photo/getPhotosByConditions', ctr.photoController.getPhotosByConditions);


router.get('/park/getAllLocations', ctr.parkController.getAllLocations);
router.get('/park/getAllParks', ctr.parkController.getAllParks);
router.get('/park/getAllParksVersion', ctr.parkController.getAllParksVersion);
router.get('/park/getParksVersionBySiteId', ctr.parkController.getParksVersionBySiteId);
router.get('/park/getParkBySiteId', ctr.parkController.getParkBySiteId);

router.get('/cache/carousel', ctr.cacheController.carousel);


//分享


module.exports = router;
