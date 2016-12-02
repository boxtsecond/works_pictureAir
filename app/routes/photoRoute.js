/**
 * Created by xueting-bo on 16/11/17.
 */
var router = require('express').Router();
var photoController = require('../controllers/photoController.js');

router.all('/getPhotosByConditions', photoController.getPhotosByConditions);
router.all('/removePhotosFromPP', photoController.removePhotosFromPP);

module.exports = router;



