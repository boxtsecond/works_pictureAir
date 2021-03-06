/**
 * Created by meteor on 14-12-26.
 */
//module.exports = function (app) {
//    console.log(app);
//}
var express = require('express');
var router = express.Router();
var ctr=require("./ctr");
router.post('/user/switchlg',ctr.users.switchLanguage);
router.post('/user/logout',ctr.users.logout);
router.post('/user/getuser',ctr.users.getuser);

router.post('/user/getShareUrl', ctr.userController.getShareUrl);
router.post('/user/addCodeToUser', ctr.userController.addCodeToUser);
router.post('/user/activeCodeToUser', ctr.userController.activeCodeToUser);
router.post('/user/updateUser', ctr.userController.updateUser);
router.post('/user/modifyUserPwd', ctr.userController.modifyUserPwd);

router.post('/photo/getPhotosByConditions', ctr.photoController.getPhotosByConditions);
router.post('/photo/getPhotosForWeb', ctr.photoController.getPhotosForWeb);
router.post('/photo/getPhotoByOldSys', ctr.photoController.getPhotoByOldSys);
router.post('/photo/addPhotoFromOldSys', ctr.photoController.addPhotoFromOldSys);
router.post('/photo/removePhotosFromPP', ctr.photoController.removePhotosFromPP);
router.post('/photo/quickDownloadPhotosParam', ctr.photoController.quickDownloadPhotosParam);
router.get('/photo/quickDownloadPhotos', ctr.photoController.quickDownloadPhotos);

router.get('/card/getPPsByUserId', ctr.cardController.getPPsByUserId);
//router.get('/card/getCouponsByUserId', ctr.cardController.getCouponsByUserId);
router.post('/card/removePPFromUser', ctr.cardController.removePPFromUser);

router.post('/products/getAllProduct', ctr.productController.getAllProduct);
router.post('/products/getProductByCondition', ctr.productController.getProductByCondition);

module.exports = router;
