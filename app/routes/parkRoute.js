/**
 * Created by xueting-bo on 16/11/17.
 */
var router = require('express').Router();
var parkController = require('../controllers/parkController.js');
var permissionFilter = require('../filters/permissionFilter.js');

//router.all('/getPhotosByConditions', permissionFilter.validLogin, photoController.getPhotosByConditions);
router.all('/getAllLocations', parkController.getAllLocations);

module.exports = router;



