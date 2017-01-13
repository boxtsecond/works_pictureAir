/**
 * Created by xueting-bo on 17/1/11.
 */

var mongoose = require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
var options={};
var config={
    siteId:{type: String,  index: true},//服务器ID
    parkName:{type: String, required: true, default: 'PictureAir'},
    photoId: {type: String, index: true}, //照片Id（siteIdyyyymmddxxxxx）
    photoCode: {type: String, index: true},   //照片code
    shootOn: {type: Date, index: true},  //拍摄时间
    extractOn: {type: Date, index: true},    //提取时间
    presetName:{type: String,  index: true,default:"storePhoto"},//模版名称
    presetId: {type: String, index: true}, //模版ID
    mobileEditActive:{type: Boolean, default: true,index: true}, //已经加模板手机端不能编辑
    name: {type: String}, //照片名称
    description: {type: String},  //描述
    downloadCount: {type: Number, default: 0},  //下载次数
    visitedCount: {type: Number, default: 0},   //访问次数
    shareInfo: [
        {
            sourceId:String,//分享源id
            sourceSecret:String,//分享源密钥
            channel: String, //分享渠道
            count: Number   //分享次数

        }
    ],
    editCount: {type: Number, default: 0},  //编辑次数
    likeCount: {type: Number, default: 0},  //点赞次数
    favoriteCount:{type: Number, default: 0},  //被收藏的次数
    comments: [
        { //评论信息
            comment: String, //评论内容
            userId: String, //评论者Id可以为空
            userIP: String, //用户IP
            lastEditTime: Date //评论时间
        }
    ],
    albumId: {type: String, index: true}, //相册Id
    originalInfo: { //原图信息
        originalName: {type: String, required: true, index: true}, //原图名称
        path: {type: String, required: true}, //物理路径
        width:{type: Number, required: true}, //宽
        height: {type: Number, required: true}, //高
        url: {type: String, required: true}, //url
    },
    thumbnailType: [], //缩略图类型
    thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url},x512:{},x128:{},fileSize}
    belongslevels: {type: Number, index: true, required: true, default: 1}, //哪些卡激活后可以看到, 数字越大越级别越高   0,all/1,oneDayPass/
    locationId: {type: String, index: true}, //拍摄点Id
    parentId: {type: String, index: true}, //原始图片Id
    disabled: {type: Boolean, default: false}, //图片是否有效
    rawFileName: {type: String,required: true, index: true}, //相机内照片原始名称
    originalFileName: {type: String,required: true, index: true}, //生成的图片名称  用于判断是否重复上传 全部小写存入数据库
    isFree:{type: Boolean, default: false}, //是否免费
    isVip: {type: Boolean, default: false}, //是否VIP
    allowDownload:{type:Boolean,default:true},//是否允许下载
    tokenBy:{type: String,index: true}, //摄影师
    photoSource:{type: String, default:'store'} ,//照片来源
    photoStatus:{type:String,default:'init'},//init checked unchecked
    checkedTime: {type: Date},// 审核时间
    createdOn: {type: Date},//创建时间
    modifiedOn: {type: Date},//修改时间
    createdBy:  {type: String,default:'system'},//创建者ID
    modifiedBy:  {type: String,default:'system'}, //创建者ID
    mimeType:{type: String, index: true,default:'jpg'}//jpg/mp4
};
module.exports={
    options:options,
    config:config
};