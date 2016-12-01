/**
 * Created by xueting-bo on 16/11/21.
 */
var router = require('express').Router();
var shopController = require('../controllers/shopController.js');
var permissionFilter = require('../filters/permissionFilter.js');

//router.all('/getPhotosByConditions', permissionFilter.validLogin, photoController.getPhotosByConditions);
//router.all('/buyPhoto', shopController.buyPhoto);

module.exports = router;