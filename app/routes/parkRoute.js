/**
 * Created by xueting-bo on 16/11/17.
 */
var router = require('express').Router();
var parkController = require('../controllers/parkController.js');

router.all('/getAllLocations', parkController.getAllLocations);
router.all('/getAllParks', parkController.getAllParks);
router.all('/getParksVersionBySiteId', parkController.getParksVersionBySiteId);
router.all('/getParkBySiteId', parkController.getParkBySiteId);

module.exports = router;



