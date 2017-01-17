function verifyuserName(str){
  //  return /^[a-zA-Z][a-zA-Z0-9_]{2,20}$/.test(str);//2-20字节是允许的，允许字母下划线
    return /^(\d{5})$/.test(str);
}
function isEmail(str){
    return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(str);
}
function isMobile(str){
    //return /^(\d{5})$/.test(str);
    return  /(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))/.test(str);
    //return /^1(3|4|5|7|8)\d{9}$/.test(str)
}
function verifyPassword(str){
    //return str.trim().length==32;
    return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(str);
    //可以全数字  可以全字母  可以全特殊字符(~!@#$%^&*.) 三种的组合  可以是任意两种的组合  长度6-22
}
// "yyyy-MM-dd hh:mm:ss"
function verifyDateStr(str) {
    return  /(\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}:\d{2}:\d{2})/.test(str);
}

// console.log(verifyDateStr("2016-2-26 00:00:00"))
// console.log(isMobile("167119499"))
// console.log(isEmail("peter_d_ong@pictureworks.biz"))
module.exports={
    verifyuserName:verifyuserName,
    isMobile:isMobile,
    isEmail:isEmail,
    verifyPassword:verifyPassword,
    verifyDateStr:verifyDateStr
}