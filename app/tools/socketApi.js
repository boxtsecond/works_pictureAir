/**
 * Created by tianlisa on 15-2-5.
 */

//触发的事件列表
exports.emitList={
    sendNewPhotosCountOf:'sendNewPhotosCountOf',
    allStatistics:'allStatistics',
    photoCount:'photoCount',
    ppCount:'ppCount',
    totalSales:'totalSales',
    paidPhotoCount:'paidPhotoCount',
    pppCount:'pppCount',
    catchOrderInfoOf:'catchOrderInfoOf',
    dashBoardData:'dashBoardData',
    upgradeDashBoard:'upgradeDashBoard',
    pausePrinting:"pausePrinting",
    recoveryPrinting:"recoveryPrinting",

    sendGuideAccountChange:'sendGuideAccountChange',
    videoGenerate:'videoGenerate',
    upgradedPhotos:'upgradedPhotos',
    delPhotos:'delPhotos',
    doneOrderPay:"doneOrderPay"
}


//监听的事件列表
exports.onList={
    getNewPhotosCountOfUser:'getNewPhotosCountOfUser',
    getAllStatistics:'getAllStatistics',
    tokenPhotos:'tokenPhotos',
    bindPhotoToUser:'bindPhotoToUser',
    bindPhotosToPP:'bindPhotosToPP',
    paidForPhotos:'paidForPhotos',
    scannedPP:'scannedPP',
    bindPPToUser:'bindPPToUser',
    paidForPPP:'paidForPPP',
    bindPPToPPP:'bindPPToPPP',

    getDashBoardOnRedis:'getDashBoardOnRedis',

  guideAccountChange:'guideAccountChange'

}


//reids Publish subscribe列表
exports.pubScribeList={
    pushNewPhotoCount:'pushNewPhotoCount',
    pushNewOrderInfo:'pushNewOrderInfo',
    pushDashBoardUpdate:'pushDashBoardUpdate',
    pushDashBoardUpdateToFront:'pushDashBoardUpdateToFront',
    pushNewPhotoCountBySocketId:'pushNewPhotoCountBySocketId',
    pushNewOrderInfoBySocketId:'pushNewOrderInfoBySocketId',

    pushPausePrinting:"pushPausePrinting",
    pushRecoveryPrinting:"pushRecoveryPrinting",

    pushGuideAccountChange:'pushGuideAccountChange',
    pushGuideAccountChangeBySocketId:'pushGuideAccountChangeBySocketId',

    pushVideoGenerate:'pushVideoGenerate',
    pushVideoGenerateBySocketId:'pushVideoGenerateBySocketId',

    pushUpgradedPhotos:'pushUpgradedPhotos',
    pushUpgradedPhotosBySocketId:'pushUpgradedPhotosBySocketId',

    pushDoneOrderPay:'pushDoneOrderPay',
    pushDoneOrderPayBySocketId:'pushDoneOrderPayBySocketId',

    pushDelPhotos:'pushDelPhotos',
    pushDelPhotosBySocketId:'pushDelPhotosBySocketId'

}


