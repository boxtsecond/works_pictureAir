var cacheController = require('../controllers/cacheController.js');
var cardController = require('../controllers/cardController.js');

var parkController = require('../controllers/parkController.js');
var photoController = require('../controllers/photoController.js');
var version = require('../controllers/version.js');
var users=require("../controllers/user.js");
var userController = require('../controllers/userController.js');
module.exports={
    users:users,
    version:version,
    userController:userController,
    cacheController:cacheController,
    cardController:cardController,
    parkController:parkController,
    photoController:photoController
}