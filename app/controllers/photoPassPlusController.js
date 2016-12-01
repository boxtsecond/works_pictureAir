/**
 * Created by xueting-bo on 16/11/21.
 */
var codeType = require('../tools/enums').codeType;
var codeTypeNum = require('../tools/enums').codeTypeNum;

exports.getCodeTypeByCode = function (code, cb) {
//    var PPPTypes=['3','7','E','F','8','9','A','B','C','D'];
//     var cardTypes = JSON.parse(fs.readFileSync(__dirname + '/cardTypes.json'));
//     var PPPTypes = cardTypes.pppTypes.split(',');
//
//     var couponTypes = cardTypes.couponTypes.split(',');

    // S: 季卡  U:香港迪士尼运动会卡
    var PPPTypes = ['3', '7', 'E', 'F', '8', '9', 'A', 'B', 'C', 'D', 'G', 'H', 'J', 'S', 'K', 'N', 'M', 'U'];
    var couponTypes = ['X', 'Y', 'Z', 'T'];
    code = code.toUpperCase().replace(/-/g, "");
    if (code == '7000000040448097') {
        return codeType.invalid;
    }
    if (code.length == 0) {
        return codeType.invalid;
    }
    var regNum = /^[0-9]*$/;
    if (regNum.exec(code)) {
        return codeType.photoPass;
    }
    if (code.length == 16) {
        var prefix = code.substring(0, 4);
        var cType = code.substr(5, 1);
        if (prefix == 'DPUP') {
            return codeType.userPass;
        }
        else if (prefix == 'DPPP' || cType == codeTypeNum.photoPass || cType == 'S') {
            return codeType.photoPass;
        } else if (cType == codeTypeNum.experienceCard) {
            return codeType.experienceCard;
        }
        else if (prefix == 'DPEP' || cType == codeTypeNum.eventPass) {
            return codeType.eventPass;
        } else if (prefix == 'DPTP') {
            //disneyTicket门票
            return codeType.photoPass;
        }
        else if (couponTypes.indexOf(cType) > -1) {
            return codeType.coupon;
        }
        else if (prefix == 'DPVP' || PPPTypes.indexOf(cType) > -1) {
            return codeType.photoPassPlus;
        } else {
            return codeType.invalid;
        }


    } else if (code.length >= 8 && code.length < 32) {
        return codeType.photoPass;
    } else {
        return codeType.invalid;
    }


}