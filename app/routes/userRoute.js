/**
 * Created by xueting-bo on 16/11/20.
 */
var router = require('express').Router();
var userController = require('../controllers/userController.js');

//分享
router.all('/getShareUrl', userController.getShareUrl);
router.all('/share', userController.share);
router.all('/getShareInfo', userController.getShareInfo);
router.all('/addCodeToUser', userController.addCodeToUser);
router.all('/updateUser', userController.updateUser);

module.exports = router;