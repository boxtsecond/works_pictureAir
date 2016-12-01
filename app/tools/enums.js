/**
 * Created by tianlisa on 14-8-27.
 */

//权限列表
exports.permissionType = {
    guest: 'guest',
    user: 'user',
    superAdmin: 'superAdmin',
    regionAdmin: 'regionAdmin',
    parksAdmin: 'parksAdmin',
    professorAdmin: 'professorAdmin',
    supplierAdmin: 'supplierAdmin'

};

//操作类型
exports.actionType = {
    shareQQ: 'shareQQ',
    shareWeiChat: 'shareWeiChat',
    shareWeiBo: 'shareWeiBo',
    shareFaceBook: 'shareFaceBook',
    shareTwitter: 'shareTwitter',
    sharePictureAir: 'sharePictureAir',
    like: 'like',
    view: 'view',
    follow: 'follow',
    buy: 'buy',
    download: 'download',
    comment: 'comment',
    tagPeople: 'tagPeople',
    photoSearched: 'photoSearched',
    login: 'login',
    loginOut: 'loginOut',
    favorite: 'favorite'
}

//被操作对象类型
exports.objectType = {
    photo: 'photo',
    album: 'album',
    park: 'park',
    promotion: 'promotion'
}

//用户类型
exports.userType = {
    user: 'user',
    guide: 'guide',
    park: 'park'
}

//用户终端
exports.terminal = {
    web: 'web',
    android: 'android',
    ios: 'ios',
    anonymous: 'anonymous',
    onSite: 'onSite'

}

exports.secretKeys = {
    tokenKey: 'token'
}

exports.codeType = {
    photo: 'photo',
    photoPass: 'photoPass',
    photoPassPlus: 'photoPassPlus',
    eventPass: 'eventPass',
    userPass: 'userPass',
    invalid: 'invalid',
    experienceCard: 'experienceCard',
    coupon:'coupon'

}

exports.codeTypeNum = {
    photoPass: 2,
    photoPassPlus: 3,
    eventPass: 4,
    experienceCard: 5


}

exports.userType = {
    user: "user",
    park: "park",
    guide: 'guide'

}
//促销类型
exports.promotionType = {
    "buyGift_EN": "buyGift",
    "buyGift_CN": "买赠",
    "fullReduction_EN": "fullReduction",
    "fullReduction_CN": "满减",
    "discount_EN": "discount",
    "discount_CN": "折扣",
    "all_price_EN": "all_price",
    "all_price_CN": "统一价",
    "sub_price_EN": "sub_price",
    "sub_price_CN": "区间价",
    "all_sub_price_EN": "all_sub_price",
    "all_sub_price_CN": "组合区间价",
    "ladder_EN": "ladder",
    "ladder_CN": "阶梯",
    "bundling_EN": "bundling",
    "bundling_CN": "套餐"
}

//照片来源
exports.photoSource = {
    android: 'android',
    ios: 'ios',
    web: 'web',
    pw: 'pw'

}

//打印设置
exports.printMode = {
    Glossy: "Glossy",
    Matte: "Matte"
};
exports.printSizeDetail = {
    S6X8: {
        name: '6R',
        width: 8,
        height: 6,
        unit: 'inch',
        pixel_width: 2400,
        pixel_height: 1800,
        dpi: 300
    },
    S8X8: {
        name: '8" x 8"',
        width: 8,
        height: 8,
        unit: 'inch',
        pixel_width: 2400,
        pixel_height: 2400,
        dpi: 300
    },
    S4X6: {
        name: '4R',
        width: 6,
        height: 4,
        unit: 'inch',
        pixel_width: 1800,
        pixel_height: 1200,
        dpi: 300
    },
    S5X7: {
        name: '5R',
        width: 7,
        height: 5,
        unit: 'inch',
        pixel_width: 2100,
        pixel_height: 1500,
        dpi: 300
    },
    S6X9: {
        name: '6" x 9"',
        width: 9,
        height: 6,
        unit: 'inch',
        pixel_width: 2700,
        pixel_height: 2400,
        dpi: 300
    },
    A5: {
        name: 'A5',
        width: 8.3,
        height: 5.8,
        unit: 'inch',
        pixel_width: 2490,
        pixel_height: 1740,
        dpi: 300
    },
    PANA: {
        name: 'Panaroma',
        width: 16.5,
        height: 5.85,
        unit: 'inch',
        pixel_width: 4950,
        pixel_height: 1755,
        dpi: 300
    },
    S3_5X5: {
        name: '5" x 3.5"',
        width: 5,
        height: 3.5,
        unit: 'inch',
        pixel_width: 1500,
        pixel_height: 1050,
        dpi: 300
    },
    S4X8: {
        name: '8" x 4"',
        width: 8,
        height: 4,
        unit: 'inch',
        pixel_width: 2400,
        pixel_height: 1200,
        dpi: 300
    },
    S8X10: {
        name: '8R',
        width: 10,
        height: 8,
        unit: 'inch',
        pixel_width: 3000,
        pixel_height: 2400,
        dpi: 300
    },
    S8X10_2: {
        name: '10.2" x 8"',
        width: 10.2,
        height: 8,
        unit: 'inch',
        pixel_width: 3060,
        pixel_height: 2400,
        dpi: 300
    },
    S8X12: {
        name: 'S8R',
        width: 12,
        height: 8,
        unit: 'inch',
        pixel_width: 3600,
        pixel_height: 2400,
        dpi: 300
    },
    S2X6: {
        name: '6" x 2"',
        width: 6,
        height: 2,
        unit: 'inch',
        pixel_width: 1800,
        pixel_height: 600,
        dpi: 300
    },
    S5X8: {
        name: '8" x 5"',
        width: 8,
        height: 5,
        unit: 'inch',
        pixel_width: 2400,
        pixel_height: 1500,
        dpi: 300
    },
    S10X18: {
        name: '10" x 18"',
        width: 8,
        height: 5,
        unit: 'inch',
        pixel_width: 4796,
        pixel_height: 2398,
        dpi: 300
    },
    Ticket: {
        name: 'Ticket',
        width: 3.66,
        height: 2.24,
        unit: 'inch',
        pixel_width: 1100,
        pixel_height: 674,
        dpi: 300
    },
    Ticket2: {
        name: 'Ticket2',
        width: 3.66,
        height: 2.24,
        unit: 'inch',
        pixel_width: 1100,
        pixel_height: 674,
        dpi: 300
    },
    S4X62: {
        name: 'Ruler4R',
        width: 6,
        height: 4,
        unit: 'inch',
        pixel_width: 1800,
        pixel_height: 1200,
        dpi: 300
    },
    Receipt80mm: {
        name: '80mm Receipt',
        width: 3.15,
        height: 3.15,
        unit: 'inch',
        pixel_width: 630,
        pixel_height: 630,
        dpi: 200
    }
};


exports.printSize = {
    Unknown: 'Unknown',
    Ticket: 'Ticket',
    S2X6: 'S2X6',
    S3_5X5: 'S3_5X5',
    S4X6: 'S4X6',
    S4X8: 'S4X8',
    S5X7: 'S5X7',
    S5X8: 'S5X8',
    S6X6: 'S6X6',
    S6X8: 'S6X8',
    S6X9: 'S6X9',
    S6X10: 'S6X10',
    S8X8: 'S8X8',
    S8X10: 'S8X10',
    S8X10_2: 'S8X10_2',
    S8X12: 'S8X12',
    A1: 'A1',
    A2: 'A2',
    A3: 'A3',
    A4: 'A4',
    A5: 'A5',
    A6: 'A6',
    S6X3_5: 'S6X3_5',
    S6X4_5: 'S6X4_5',
    S6X5: 'S6X5',
    S6X5_5: 'S6X5_5',
    S6X6_5: 'S6X6_5',
    S6X7: 'S6X7',
    S6X7_5: 'S6X7_5',
    S6X8_5: 'S6X8_5',
    S6X9_5: 'S6X9_5',
    S6X10_5: 'S6X10_5',
    S6X11: 'S6X11',
    S6X11_5: 'S6X11_5',
    S6X12: 'S6X12',
    S6X12_5: 'S6X12_5',
    S6X13: 'S6X13',
    S6X13_5: 'S6X13_5',
    S6X14: 'S6X14',
    S6X14_5: 'S6X14_5',
    S6X15: 'S6X15',
    S6X15_5: 'S6X15_5',
    S6X16: 'S6X16',
    S6X16_5: 'S6X16_5',
    S6X17: 'S6X17',
    S6X17_5: 'S6X17_5',
    S6X18: 'S6X18',
    S6X18_5: 'S6X18_5',
    S6X19: 'S6X19',
    S6X19_5: 'S6X19_5',
    S6X20: 'S6X20',
    S6X20_5: 'S6X20_5',
    S6X21: 'S6X21',
    S6X21_5: 'S6X21_5',
    S6X22: 'S6X22',
    S6X22_5: 'S6X22_5',
    S6X23: 'S6X23',
    S6X23_5: 'S6X23_5',
    S6X24: 'S6X24',
    S6X24_5: 'S6X24_5',
    S6X25: 'S6X25',
    S6X25_5: 'S6X25_5',
    S6X26: 'S6X26',
    S6X26_5: 'S6X26_5',
    S6X27: 'S6X27',
    S6X27_5: 'S6X27_5',
    S6X28: 'S6X28',
    S6X28_5: 'S6X28_5',
    S6X29: 'S6X29',
    S6X29_5: 'S6X29_5',
    S6X30: 'S6X30',
    S6X30_5: 'S6X30_5',
    S6X31: 'S6X31',
    S6X31_5: 'S6X31_5',
    S6X32: 'S6X32',
    S6X32_5: 'S6X32_5',
    S6X33: 'S6X33',
    S6X33_5: 'S6X33_5',
    S6X34: 'S6X34',
    S6X34_5: 'S6X34_5',
    S6X35: 'S6X35',
    S6X35_5: 'S6X35_5',
    S6X36: 'S6X36'
};
exports.printType = {
    Normal: "Normal",
    Template: "Template",
    Multiple: "Multiple"
};
//错误等级
exports.errorLevel = {
    debug: "debug",
    info: "info",
    warn: "warn",
    error: "error",
    trace: "trace"
}

//统计数据类型
exports.statistics = {
    photoCount: 'photoCount',
    ppCount: 'photoPassCount',
    pppCount: 'photoPassPlusCount',
    paidPhotoCount: 'paidPhotoCount',
    revenue: 'revenue'
}

exports.photoSource = {
    stockPhoto: 'stockPhoto',
    selfUploadByAndroid: 'selfUploadByAndroid',
    selfUploadByIOS: 'selfUploadByIOS',
    selfUploadByWeb: 'selfUploadByWeb',
    engine: 'engine'
}

exports.assetType = {
    frame: 'frame',
    clipart: 'clipart'
}

exports.locationType = {
//    subject: 'subject',
//    location: 'location',
//    land: 'land'
    shootSpot: 'shootSpot',
    albumGroup: 'albumGroup',
    partition: 'partition'

}


//交易类型
exports.tradeType = {
    withdraw: 'withdraw',    //提现
    expense: 'expense',  //支出
    royalty: 'royalty',  //提成
    recharge: 'recharge',    //充值
    openAccount: 'openAccount'   //开户

}

//调查类型
exports.surveyType = {
    QA: 'QA',
    advice: 'advice'
}

//推送消息类型
exports.pushMsgType = {
    photoSend: 'photoSend',//用户有新图片
    orderSend: 'orderSend',//用户下订单
    accountChange: 'accountChange', //导游账户变化
    videoGenerate: 'videoGenerate',   //视频合成成功
    upgradedPhoto: 'upgradedPhoto',   //图片清晰的推送,
    doneOrderPay: "doneOrderPay", // 订单支付完成，
    delPhotos:"delPhotos"
}

//app列表
exports.appList = {
    photoPass: 'photoPass',
    pictureAir: 'pictureAir',
    guideRebate: 'guideRebate'
}

exports.msgType={
    forgotPassword:'forgotPassword',
    register:'register'

}

exports.channelType={
    email:'email',
    sms:'sms'
}

//分享类型
exports.shareModeEnum = {
    product: "product",
    userInfo: "userInfo",
    photo: "photo",
    video: "video",
    other: "other"
}

//分享平台
exports.sharePlatform = {
    "weChat": "weChat",
    "weChatMoments": "wechatMoments",
    "qq": "qq",
    "qqZone": "qqZone",
    "sinaWeibo": "sinaWeibo",
    "facebook": "facebook",
    "twitter": "twitter",
    "other": "other"
};

//支付类型
exports.payTypeEnum = {
    "alipay": 0,
    "union": 1,
    "visa": 2,
    "代付": 3,
    "分期": 4,
    "自提": 5,
    "paypal": 6,
    "weChat": 7,
    "ipayLink": 8,
    "zeroPay": 9
};