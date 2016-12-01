/**
 * Created by xueting-bo on 16/11/21.
 */
var mongoosedb=require('../mongodb.js');
var mongoose=require('mongoose');

var options = {};
var config = {
    cardType:{type:String,index:true},    //卡片子类型对应的名称
    codeName:
    {
        EN:String,//卡号类型英文名
        CN:String //卡号类型中文名
    },
    codeDesc: {
        EN:String,//卡号描述英文
        CN:String //卡号描述中文
    },
    typeCode:{type:String,index:true} ,    //卡片子类型对应的字符： 1位(2:pp,3:pp+,4:eventPass,5:ExperienceCard,6:DisneyTicket)
    oType:{type:String,index:true},  //卡片大类，photoPassPlus,photoPass,coupon,eventPass,userPass
    expiredDay:{type:Number,default:3},//有效期，激活后多久失效
    slots:{type:Number},//卡槽数，可绑定的PP数
    days:{type:Number}, //天数，可绑定的天数
    photoCount:{type:Number},//可升级的photo数，不限制数量为-1

    cardBg:{
        path: String, //物理路径
        width: Number, //宽
        height: Number, //高
        url: String //url
    },//卡片背景图
    stockFree:[{
        originalInfo: { //原图信息
//            originalName: {type: String, index: true}, //原图名称
//            path: String, //物理路径
//            width: Number, //宽
//            height: Number, //高
//            url: String //url
        },
        thumbnailType: [], //缩略图类型
        thumbnail: {} //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url},x512:{},x128:{}}
    }],
    locations:[{
        locationId:String,
        locationName:String
    }],//主题卡对应的地点

    locationIds:[String],
    addLimit:{type:Number,default:-1},//每种卡片可以绑定的次数
    productIds:[String],
    active: Boolean,//是否可用

    createdOn: {type: Date, default: Date.now},//创建时间
    createdBy: {type: String},//创建人，userId
    modifiedOn: {type: Date, default: Date.now},//修改时间
    modifiedBy: {type: String},//修改人
    generateInfo:{
        generateDate:{type:String,index:true},//生成卡号的日期
        batchCount:{type:Number,default:0},//当天生成卡号的次数
        serverIds:[String]//当天生成卡号使用的服务器

    }
};

module.exports={
    options:options,
    config:config
};