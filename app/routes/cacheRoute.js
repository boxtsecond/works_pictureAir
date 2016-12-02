/**
 * Created by xueting-bo on 16/12/2.
 */
var router = require('express').Router();
var cacheController = require('../controllers/cacheController.js');

router.all('/carousel', cacheController.carousel);

module.exports = router;