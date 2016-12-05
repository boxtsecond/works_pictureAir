/**
 * Created by meteor on 14-12-26.
 */
//module.exports = function (app) {
//    console.log(app);
//}
var express = require('express');
var router = express.Router();
var cacheController = require('../controllers/cacheController.js');
var cardController = require('../controllers/cardController.js');

var parkController = require('../controllers/parkController.js');
var photoController = require('../controllers/photoController.js');

var users=require("../controllers/user.js");
var userController = require('../controllers/userController.js');

router.post('/user/login',users.login);
router.post('/user/register',users.register);
router.post('/user/sendsms',users.sendSMS);
router.post('/user/sendemailpwd',users.sendEmailForgotPwdMsg);
router.post('/user/forgotpwd',users.resetPassword);

router.all('/photo/getPhotosByConditions', photoController.getPhotosByConditions);
router.all('/photo/removePhotosFromPP', photoController.removePhotosFromPP);

router.all('/park/getAllLocations', parkController.getAllLocations);
router.all('/park/getAllParks', parkController.getAllParks);
router.all('/park/getAllParksVersion', parkController.getAllParksVersion);
router.all('/park/getParksVersionBySiteId', parkController.getParksVersionBySiteId);
router.all('/park/getParkBySiteId', parkController.getParkBySiteId);

router.all('/card/getPPsByUserId', cardController.getPPsByUserId);
router.all('/card/getCouponsByUserId', cardController.getCouponsByUserId);
router.all('/card/removePPFromUser', cardController.removePPFromUser);

router.all('/cache/carousel', cacheController.carousel);

//分享
router.all('/getShareUrl', userController.getShareUrl);
router.all('/share', userController.share);
router.all('/getShareInfo', userController.getShareInfo);
router.all('/addCodeToUser', userController.addCodeToUser);
router.all('/updateUser', userController.updateUser);

module.exports = router;
