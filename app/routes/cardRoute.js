/**
 * Created by xueting-bo on 16/11/21.
 */
var router = require('express').Router();
var cardController = require('../controllers/cardController.js');

//router.all('/getPhotosByConditions', permissionFilter.validLogin, photoController.getPhotosByConditions);
router.all('/getPPsByUserId', cardController.getPPsByUserId);
router.all('/getCouponsByUserId', cardController.getCouponsByUserId);
router.all('/removePPFromUser', cardController.removePPFromUser);
module.exports = router;
