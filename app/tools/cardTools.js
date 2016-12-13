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
        if(pppCode.length!=16) return resolve(false);
        else if(cardprefixArray.indexOf(pppCode.substr(0,4))<0)return resolve(false);
        else if(cardTypeArray.indexOf(Number(pppCode[5]))>=0) return resolve(pppCode);
        else return resolve(false);
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
function  activeCard(pppCode) {
    var cardType = '';
    Promise.resolve()
        .then(function () {
            // 验证
            return validatePP(pppCode)
                .then(function (card) {
                    if(!card){
                        return null;
                    }else {
                        return card;
                    }
                })
        })
        .then(function (obj) {
            if(!obj){
                return null;
            }else {
                // 修改 active=true   obj.expiredOn= new Date()+expiredDay
                var updateObj = {};
                updateObj.active = true;
                updateObj.expiredOn= new Date() + obj.expiredDay;
                cardType = obj.PPPType;
                return carCodeModel.updateAsync({PPPCode:pppCode}, updateObj);
            }
        })
        .then(function () {
            return cardType;
        })
        .catch(function (error) {
            console.log(error);
            return null;
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
module.exports={
    validatePPType:validatePPType,
    validatePP:validatePP,
    activeCard: activeCard
};