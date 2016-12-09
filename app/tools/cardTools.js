/**
 * Created by meteor on 16/12/8.
 */

var Promise=require('bluebird');
var carCodeModel=require("../mongodb/Model/cardCodeModel");
// 20161208 验证
// 扫卡绑定  //扫卡获取照片
// 验证卡是否合法
var  cardTypeArray=[2,3];
var  cardprefixArray=['PACC','BPSG'];
//
function validatePPType(pppCode) {
    return new Promise(function (resolve, reject) {
        if(pppCode.length!=16) return reject(false);
        else if(cardprefixArray.indexOf(pppCode.substr(0,4))<0)return reject(false);
        else if(cardTypeArray.indexOf(Number(pppCode[5]))>=0) return resolve(pppCode);
        else return reject(false);
    });
}

function validatePP(pppCode) {
    return validatePPType(pppCode).then(function (code) {
       return  carCodeModel.findOne({PPPCode:code}).then(function (obj) {
           if(!obj) return null;
           else if(!obj.active&&(obj.expiredOn-new Date()>0)){
               return obj;
           }else return null;
       })
    }).catch(function (pppCode) {
        return null;
    })
}


function  activePPP(pppCode) {
    // 验证
   // validatePP
    // 修改 active=true   obj.expiredOn= new Date()+expiredDay
}
// /sync/syncToCloud',
// '/sync/syncFile',


// //
// validatePP("BPSG63289HMWHD7A").then(function (pppCode) {
//     console.log(pppCode)
// });
//
// function replaceAll(str,s1,s2){
//     return str.replace(new RegExp(s1,"gm"),s2);
// }
// console.log(replaceAll(,"-",""))
module.exports={
    validatePPType:validatePPType,
    validatePP:validatePP
};