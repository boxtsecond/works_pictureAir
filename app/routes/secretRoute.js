/**
 * Created by xueting-bo on 2017/2/16.
 */


var express = require('express');
var router = express.Router();
var ctr=require("./ctr");

router.post('/card/createCardCode', ctr.cardController.createCardCode);

router.post('/photos/removeRealPhotos', ctr.photoController.removeRealPhotos);
router.post('/photos/stopCycleRemove', ctr.photoController.stopCycleRemoveRealPhotos);

router.post('/products/addProduct', ctr.productController.addProduct);
router.post('/products/getAllProduct', ctr.productController.getAllProduct);
router.post('/products/getProductByCondition', ctr.productController.getProductByCondition);
module.exports = router;