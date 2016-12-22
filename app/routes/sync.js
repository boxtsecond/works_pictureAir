var express = require('express');
var router = express.Router();
var sync=require("../controllers/sync/sync");
router.post('/syncToCloud',sync.syncPhotos);
router.post('/syncFile',sync.syncFile);

module.exports = router;
