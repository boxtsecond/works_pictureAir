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
    return str.trim().length==32;
    //return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(str);
    //可以全数字  可以全字母  可以全特殊字符(~!@#$%^&*.) 三种的组合  可以是任意两种的组合  长度6-22
}

//console.log(isMobile("09875445673"))
//console.log(isEmail("peter.dong@pictureworks.biz"))
module.exports={
    verifyuserName:verifyuserName,
    isMobile:isMobile,
    isEmail:isEmail,
    verifyPassword:verifyPassword
}