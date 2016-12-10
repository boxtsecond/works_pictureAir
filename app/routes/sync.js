var express = require('express');
var router = express.Router();
var sync=require("../controllers/sync");
router.post('/syncToCloud',sync.syncFileData);
router.post('/syncFile',sync.syncFile);

module.exports = router;
