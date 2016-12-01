var mongoose = require('mongoose');

var options={versionKey: false};

var config= {
    country: {type: String, index: true},   //国家
    code:{type: String, index: true},//en zh-cn zh-hk
    language:{type: String}, //语言名
    languageEnglishName:{type: String},//语言英文名
    languageChineseName:{type: String},//语言中文名
    currencySymbol:{type: String},//"￥",$//货币符号
    currencyCode:{type: String},//"CYN",USD //货币码
    //Area code
    flagUrl:{type: String},
    lg:{
        api:{
            code:{type:number},
            key:{type: String},
            value:{type: String},
            desc:{type: String}
        },
        web:{
            key:{type: String},
            value:{type: String},
            desc:{type: String}
        },
        app:{
            key:{type: String},
            value:{type: String},
            desc:{type: String}
        }
    }

};
module.exports={
    options:options,
    config:config
};
