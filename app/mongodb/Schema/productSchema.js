/**
 * Created by xueting-bo on 16/11/28.
 */

var options = {};
var config = {
    name: {type: String, require: true, unique: true, index: true}, //产品名称
    nameAlias: {type: String},//产品别名
    code: {type: String, require: true, unique: true, index: true},//条形码等唯一产品编码，不可为空
    sequence: {type: String, require: true, unique: true, index: true},//sh1加密后的标识
    description: {type: String, default: ''},//产品描述
    brand: {type: String, default: 'PictureAir'},//商品品牌
    pictures: [
        {
            url: {type: String},
            no: {type: Number}
        }
    ],//宣传图（已配置好了图片,对外宣传显示的）
    copywriter: {type: String},//宣传文案
    createdOn: {type: Date, default: Date.now()},//创建时间
    createdBy: {type: String, require: true},//创建人
    modifiedOn: {type: Date, default: Date.now()},//修改时间
    modifiedBy: {type: String}, //修改人
    isAllowBuy:{type:Boolean,default:false},//是否允许再次已购买过的照片
    buyCounts: {type: Number, default: 0},   //统计购买次数
    entityType: {type: Number, default: 0},//是否为实体：1为实物，0为非实物
    keyword: {type: String}, //关键词
    isPost: {type: Boolean},//是否可邮寄
    active: {type: Boolean,default: false},//商品状态,是否可用
    deleted: {type: Boolean, default: false},//商品状态,是否可用
    priceList:[{
        siteId: {type: String, require: true},
        currency: {type: String, require: true},
        amount: {type: Number, require: true}
    }]
};

module.exports={
    options:options,
    config:config
};