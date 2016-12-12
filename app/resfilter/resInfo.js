//-1  服务器繁忙（CPU  内存）
//503  no supper this dev input
//200-300  成功 normal
//   规定以1 0 开头的提示都是监控程序所用的错误
//   以 2 6 开头的提示都是成功
//   以 3 7 开头的都是db这类的交互错误
//   以 4 8开头的都是提示给用户看的
//   以 5 9开头的都是 服务器内部错误（比如连接不上mongodb）服务器CPU 内存
//eg:
//20000  60000 normal
//30000  70000 prompt 业务中的逻辑错误比如 redis mongodb 错误
//40000  80000 prompt 用户输入错误(需要提示给用户) 对外的
//50000  90000 system 服务器内部错误 （内部日志记录）
var errInfo={
    //"dbErrorMax": 3045,
    //"userErrorMax": 4027,
    //-------------------normal 2x 6x -----------------
    "success": {status: 200, msg: "success", result:{}},
    //-------------------prompt 3x 4x 7x 8x -------------------
    "userRegisterRedisGetTokenError":{status: 300, msg:"get token error",desc:"get token from redis err"},
    "userRegisterFinddbForEmailError":{status: 301, msg:"system error",desc:"find db for email"},
    "userRegisterFinddbForMobileError":{status: 302, msg:"system error",desc:"find db for mobile"},
    "userRegisterExistTOdbError":{status: 303, msg:"system error",desc:"username exist to db"},
    "userRegisterSaveToDBError":{status: 304, msg:"system error",desc:"save  user to DB error"},
    "userSMSRedisGetValidateCodeError":{status: 305, msg:"get ValidateCode error",desc:"get ValidateCode from redis err"},
    "userSMSRedisSetValidateCodeError":{status: 306, msg:"get ValidateCode error",desc:"set ValidateCode from redis err"},
    "userSMSdbSaveValidateCodeError":{status: 307, msg:"get ValidateCode error",desc:"save usemsg to db  err"},


    "authParamAppidError":{status: 400, msg:"param not valid",desc:"appid is required"},//参数错误
    "authVerifyAppidError":{status: 401, msg:"param not valid",desc:"verify appid error"},
    "authGetTokenError":{status: 402, msg:"get token error",desc:"auth get token error"},
    "userParamUsernameError":{status: 403, msg:"param not valid",desc:"username is required"},
    "userParamPasswordError":{status: 404, msg:"param not valid",desc:"password is required"},
    "userParamPasswordVierifyError":{status: 405, msg:"param not valid",desc:"password vierify Error"},
    "userParamValidatecodeVierifyError":{status: 406, msg:"validatecode error",desc:"validatecode vierify Error"},//手机验证码
    "userParamUserNameExistError":{status: 407, msg:"userName is exist",desc:"userName is exist"},
    "userParamUserNameParameterError":{status: 408, msg:"param not valid",desc:"not is emial and mobile"},
    "userRegisterGenerateError":{status: 409, msg:"get token error",desc:"generate token error"},


    "authUnauthorized":{ status: 420, msg: 'unauthorized',desc:"unauthorized"},
    "authUnauthorizedExpire":{ status: 421, msg: 'unauthorized',desc:"unauthorized Expire error"},
    "userSendSMSParamPhoneParameterError":{status: 432, msg:"param not valid",desc:"phone is required"},
    "userSendSMSParamTypeVierifyError":{status: 423, msg:"param not valid",desc:"type vierify Error"},
    "userSendSMSError":{status: 424, msg:"send sms Error",desc:"type vierify Error"},
    "userSendSMSValidateSendingCodeError":{status: 425, msg:"sms Sending",desc:"sms sending "},
    "userParamPhoneParameterError":{status: 426, msg:"param not valid",desc:"not is  mobile"},
    "userParamVcodeParameterError":{status: 427, msg:"param not valid",desc:"vcode  is required for mobile"},
    "userVerifyVcodeError":{status: 428, msg:"verify code Error",desc:"verify code Error"},
    "userLoginParamUserNameError":{status: 429, msg:"userName is not exist",desc:"userName is not exist"},
    "userLoginParamUserNameisabledError":{status: 430, msg:"userName is disabled",desc:"userName is disabled"},
    "userSendEmailParamError":{status: 431, msg:"param not valid",desc:"userName is must email"},
    "userLoginPasswordError":{status: 433, msg:"password is error",desc:"password is error"},
    "userResetPasswordParamVcodeParameterError":{status: 434, msg:"param not valid",desc:"resetPassword vcode  is required"},
    "userResetPasswordVcodeParameterError":{status: 435, msg:"verify code Error",desc:"ResetPassword    error"},
    "userResetPasswordError":{status: 436, msg:"modify password Error",desc:"modify password Error"},
    "userSendemailValidateSendingCodeError":{status: 437, msg:"email Sending",desc:"sms sending "},
    "userEmailRedisSetValidateCodeError":{status: 438, msg:"get ValidateCode error",desc:"set ValidateCode from redis err"},
    "userswitchLanguageParamlgError":{status: 439, msg:"param not valid",desc:"lg is required"},
    "userverifyMobileCodeVcodeParameterError":{status: 440, msg:"verify code Error",desc:"verifyMobileCode    error"},
    "userverifyMobileCodeParamVcodeParameterError":{status: 442, msg:"param not valid",desc:"verifyMobileCode vcode  is required"},
    "userverifyEmailCodeParamVcodeParameterError":{status: 443, msg:"param not valid",desc:"verifyEmail vcode  is required"},
    "userverifyEmailCodeVcodeExpireParameterError":{status: 444, msg:"code expire",desc:"expire vcode"},
    "userverifyMobileCodeParamTypeParameterError":{status: 445, msg:"param not valid",desc:"verifyMobileCode type  is required"},


    "getCouponsByUserId":{
        paramsError: {status: 4001, msg: "params is incomplete", desc: "missing userId"},
        pppError:{status: 3001, msg: "system error", desc: "get pppModel from db error"},
        pppTypeError: {status: 3002, msg: "system error", desc: "get pppTypeModel from db error"},
        promiseError: {status: 3003, msg: "system error", desc: "promise error"},
        countError: {status: 3004, msg: "system error", desc: "ppp count not correct"}
    },
    "getPPsByUserId":{
        paramsError: {status: 4002, msg: "params is incomplete", desc: "missing userId"},
        photoError: {status: 3005, msg: "system error", desc: "get photoModel from db error"},
        pppError: {status: 3006, msg: "system error", desc: "get pppModel from db error"},
        userError: {status: 3007, msg: "system error", desc: "get userModel from db error"}
    },
    "removePPFromUser": {
        paramsError: {status: 4003, msg: "params is incomplete", desc: "missing customerId"},
        paramsInvalid: {status: 4004, msg: "params is invalid", desc: "customerId is invalid"},
        notFind: {status: 4005, msg: "not find user", desc: "not find user from db"},
        photoError: {status: 3008, msg: "system error", desc: "update photoModel from db error"},
        promiseError: {status: 3009, msg: "system error", desc: "promise error"}
    },
    "getAllLocations": {
        paramsError: {status: 4006, msg: "params is incomplete", desc: "missing parkId"},
        APIError: {status: 3012, msg: "system error", desc: "getAllLocations API error"},
        parkError: {status: 3013, msg: "system error", desc: "get parkModel from db error"}
    },
    "findPhotos": {
        notFind: {status: 4034, msg: 'not find photo', desc: "not find photo from db"},
        promiseError: {status: 3045, msg: "system error", desc: "promise error"},
        photoError: {status: 3015, msg: "system error", desc: "get photoModel from db error"}
    },
    "carousel": {
        paramsError: {status: 4009, msg: "request error", desc: "can not find request"}
    },
    "activeCodeToUser": {
        paramsError: {status: 4010, msg: "params is incomplete", desc: "missing customerId or SN or cardId"},
        invalidCard: {status:4011 ,msg: 'cardId is invalid',desc:'cardId is invalid'},
        repeatBound: {status:4012 , msg:'repeat binding',desc:'you have bounded this card already!'},
        userError: {status: 3016, msg: "system error", desc: "get userModel from db error"},
        userUpdateError: {status: 3017, msg: 'system error', desc: 'update user to userModel error'},
        notFind: {status: 3018, msg: 'not find user', desc: "not find user from db"},
        photoSaveError: {status: 3019, msg: "system error", desc: "save photo to photoModel error"}
    },
    "updateUser": {
        paramsError: {status: 4014, msg: "params is incomplete", desc: "missing userId"},
        birthdayError: {status: 4015, msg: "params is not valid", desc: "birthday input error"},
        genderError: {status: 4016, msg: "params is not valid", desc: "gender input error"},
        emailError: {status: 4017, msg: "params is not valid", desc: "email input error"},
        passwordError: {status: 4018, msg: "params is not valid", desc: "password input error"},
        denyUpdateRegister:{status:4019,msg: 'deny Update Register' , desc: 'can\'t modify register email or mobile'},
        updateEmailError: {status:4020,msg: 'can not update Email', desc: 'can not update Email, because Email is userName'},
        updateMobileError: {status:4021,msg: 'can not update Mobile', desc: 'can not update Email, because Mobile is userName'},
        notFind: {status: 4022,msg: 'not find user', desc: "not find user from db"},
        userError: {status: 3020,msg: "system error", desc: "get userModel from db error"},
        promiseError: {status: 3021, msg: "system error", desc: "promise error"}
    },
    "socketController": {
        redisSetError: {status: 3022, msg: "system error", desc: "set token to redis error"},
        redisGetError: {status: 3023, msg: "system error", desc: "get token from redis error"},
        APNSConnectError: {status: 4023, msg: "params is incomplete", desc: "missing userId"},
        APNSDisconnectError: {status: 4024, msg: "params is incomplete", desc: "missing userId"},
        clearSocketData: {status: 4025, msg: "params is incomplete", desc: "missing userId"},
        getSocketData: {status: 4026, msg: "params is incomplete", desc: "missing userId"}
    },
    "getShareUrl": {
        paramsError: {status: 4027, msg: "params is incomplete", desc: "missing userId or shareContent.mode or shareContent.ids"},
        shareUrlError: {status: 3010, msg: "system error", desc: "can't create share url db"},
        promiseError: {status: 3011, msg: "system error", desc: "promise error"},

    },
    "removePhotosFromPP": {
        paramsError: {status: 4008, msg: "params is incomplete", desc: "missing ids or pp"},
        promiseError: {status: 3024, msg: "system error", desc: "promise error"},
        saveError: {status: 3025, msg: "system error", desc: "save photo to db error"}
    },
    "getAllParks": {
        notFind: {status: 4028, msg: "not find park", desc: "not find park from db"},
        redisGetError: {status: 3026, msg: "system error", desc: "get parks form redis error"},
        redisSetError: {status: 3027, msg: "system error", desc: "set parkVersion to redis error"},
        promiseError: {status: 3028, msg: "system error", desc: "promise error"}
    },
    "getParksVersionBySiteId": {
        paramsError: {status: 4029, msg: "params is incomplete", desc: "missing siteId"},
        notFind: {status: 4030, msg: "not find park", desc: "not find park from db"},
        redisGetError: {status: 3029, msg: "system error", desc: "get parks form redis error"},
        promiseError: {status: 3030, msg: "system error", desc: "promise error"},
        parkError: {status: 3031, msg: "system error", desc: "get parkModel from db error"},
    },
    "getParkBySiteId": {
        paramsError: {status: 4031, msg: "params is incomplete", desc: "missing siteId"},
        notFind: {status: 4032, msg: "not find park", desc: "not find park from db"},
        redisGetError: {status: 3032, msg: "system error", desc: "get parks form redis error"},
        redisSetError: {status: 3033, msg: "system error", desc: "set park version to redis error"},
        promiseError: {status: 3034, msg: "system error", desc: "promise error"},
        parkError: {status: 3035, msg: "system error", desc: "get park from db error"}
    },
    "getAllParksVersion": {
        notFind: {status: 4033, msg: "not find park", desc: "not find park from db"},
        redisGetError: {status: 3036, msg: "system error", desc: "get parks form redis error"},
        redisSetError: {status: 3037, msg: "system error", desc: "set parkVersion to redis error"},
        promiseError: {status: 3038, msg: "system error", desc: "promise error"}
    },
    "contactUs": {
        paramsError: {status: 4034, msg: "params is incomplete", desc: "missing name or EmailAddress or parkName or feedback"},
        promiseError: {status: 3039, msg: "system error", desc: "promise error"}
    },
    "share": {
        paramsError: {status: 4035, msg: "params is incomplete", desc: "missing shareId or shareKey or shareContent"},
        notFind: {status: 4036, msg: "not find shareModel", desc: "not find shareModel from db"},
        notFindTargetData: {status: 4037, msg: "not find TargetDataModel", desc: "not find TargetDataModel from db"},
        promiseError: {status: 3040, msg: "system error", desc: "promise error"}
    },
    "modifyUserPwd": {
        paramsError: {status: 4038, msg: "params is incomplete", desc: "missing oldPwd or newPwd"},
        oldPwdError: {status: 4039, msg: "oldPwd is not correct", desc: "oldPwd is not correct"},
        newPwdError: {status: 4040, msg: "newPwd is not correct", desc: "oldPwd and newPwd are the same"},
        redisError: {status: 3041, msg: "system error", desc: "get or set user cache in redis error"},
        notFind: {status: 3042, msg: "system error", desc: "not find user in mongo"},
        userError: {status: 3043, msg: "system error", desc: "get or update userModel error"},
        promiseError: {status: 3044, msg: "system error", desc: "promise error"}
    },
    "getPhotosByConditions": {
        paramsError: {status: 4007, msg: "params is incomplete", desc: "missing condition"},
        promiseError: {status: 3014, msg: "system error", desc: "promise error"}
    },
    "addCodeToUser": {
        paramsError: {status: 4013, msg: "params is incomplete", desc: "missing customerId"},
        invalidCode: {status: 4041, msg: "customerId is invalid", desc: "customerId is invalid"},
        repeatBound: {status: 4042, msg:'repeat binding',desc:'you have bounded this card already!'},
        notFind: {status: 3046, msg: "system error", desc: "not find user form db"},
        userError: {status: 3047, msg: "system error", desc: "get userModel from db error"},
        promiseError: {status: 3047, msg: "system error", desc: "promise error"}
    }

    //-------------------system 5x 9x-------------------
};
module.exports={
    errInfo:errInfo
}