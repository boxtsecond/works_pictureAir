/**
 * Created by meteor on 16/12/8.
 */

var Promise=require('bluebird');
var carCodeModel=require("../mongodb/Model/cardCodeModel");
var errInfo = require('../resfilter/resInfo.js').errInfo;
// 20161208 验证
// 扫卡绑定  //扫卡获取照片
// 验证卡是否合法
var  cardTypeArray=[2,3];
var  cardprefixArray=['PACC','BPSG'];
//
function validatePPType(pppCode) {
    return new Promise(function (resolve, reject) {
        // if(pppCode.length!=16) return resolve(false);
        // else if(cardprefixArray.indexOf(pppCode.substr(0,4))<0)return resolve(false);
        // else if(cardTypeArray.indexOf(Number(pppCode[5]))>=0) return resolve(pppCode);
        // else return resolve(false);
         if(true) return resolve(pppCode);
         else return reject(pppCode);
    });
}

function validatePP(pppCode) {
    return validatePPType(pppCode).then(function (code) {
        if (!code) {
            return null;
        } else {
            return carCodeModel.findOne({PPPCode: code}).then(function (obj) {
                if (!obj) return null;
                else if (!obj.active && (obj.expiredOn - new Date() > 0)) {
                    return obj;
                } else return null;
            })
                .catch(function (pppCode) {
                    return null;
                });
        }
    });
}

//激活（购买）卡
function  activeCard(pppCode, userId, ppCode) {
    return carCodeModel.findOneAsync({PPPCode: pppCode})
        .then(function (obj) {
            if (!obj) return Promise.reject(errInfo.activeCodeToUser.invalidCard);
            else if(obj.active) return Promise.reject(errInfo.activeCodeToUser.repeatBound);
            else if (!obj.active && (obj.expiredOn - new Date() > 0)) {
                return obj;
            } else return Promise.reject(errInfo.activeCodeToUser.invalidCard);
        })
        .then(function (obj) {
            var updateObj = {};
            updateObj.active = true;
            updateObj.expiredOn= new Date(new Date().getTime() + obj.expiredDay*86400000);
            updateObj.bindOn= new Date();
            updateObj.modifiedOn = new Date();
            //updateObj.ownOn = new Date();
            updateObj.effectiveOn = new Date();
            updateObj.userId = userId;
            updateObj.PPCode = ppCode;
            return carCodeModel.updateAsync({PPPCode:pppCode}, updateObj);
        })
        .catch(function (error) {
            if(error.status){
                return Promise.reject(error);
            }else {
                console.log(error);
                return Promise.reject(errInfo.activeCodeToUser.promiseError);
            }
        })
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

var codeType={
    OneDayPass:"OneDayPass",
    photo: 'photo',
    photoPass: 'photoPass',
    photoPassPlus: 'photoPassPlus',
    eventPass: 'eventPass',
    userPass: 'userPass',
    invalid: 'invalid',
    experienceCard: 'experienceCard',
    coupon:'coupon'
}
module.exports={
    validatePPType:validatePPType,
    validatePP:validatePP,
    activeCard: activeCard,
    codeType:codeType
};