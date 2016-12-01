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
    "userSendSMSParamPhoneParameterError":{status: 420, msg:"param not valid",desc:"phone is required"},
    "userSendSMSParamTypeVierifyError":{status: 423, msg:"param not valid",desc:"type vierify Error"},
    "userSendSMSError":{status: 424, msg:"send sms Error",desc:"type vierify Error"},
    "userSendSMSValidateSendingCodeError":{status: 425, msg:"sms Sending",desc:"sms sending "},
    "userParamPhoneParameterError":{status: 426, msg:"param not valid",desc:"not is  mobile"},
    "userParamVcodeParameterError":{status: 427, msg:"param not valid",desc:"vcode  is required for mobile"},
    "userVerifyVcodeError":{status: 428, msg:"verify code Error",desc:"verify code Error"},
    "userLoginParamUserNameError":{status: 429, msg:"userName is not exist",desc:"userName is not exist"},
    "userLoginParamUserNameisabledError":{status: 430, msg:"userName is disabled",desc:"userName is disabled"},
    //402

    //-------------------system 5x 9x-------------------
};
module.exports={
    errInfo:errInfo
}