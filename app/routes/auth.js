var express = require('express');
var router = express.Router();
var auth=require("../controllers/auth");
router.post('/getAccessToken',auth.getAccessToken);
module.exports = router;
