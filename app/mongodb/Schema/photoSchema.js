/**
 * Created by meteor on 14-9-22.
 */
//　j表示做1份日志，w表示做2个副本（尚不明确），超时时间10秒
//var options={safe:{j:1,w:2,wtimeout:10000}};
//上限设置   capped:1024}   {capped:{size:1024,max:100,autoIndexId:true}}
//自动索引   autoIndex
/**
 * Created by meteor on 14-9-22.
 */
//　j表示做1份日志，w表示做2个副本（尚不明确），超时时间10秒
//var options={safe:{j:1,w:2,wtimeout:10000}};
//上限设置   capped:1024}   {capped:{size:1024,max:100,autoIndexId:true}}
//自动索引   autoIndex
var mongoose = require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
var options={};
var config={
    encounter:{type: String,  index: true,default:"000000"},//拍摄组
    pacId:{type: String,  index: true,default:"0000"},//pac ID
    userId:{type: String,  index: true,default:"00000000"},//usr ID
    hasSynced:{type: Boolean, default: false,index: true}, //是否已经同步
    appServerIP:{type: String},//api ip
    storageServerIP:{type: String}, // nas ip
    siteId:{type: String,  index: true},//服务器ID
    photoId: {type: String, index: true}, //照片Id（siteIdyyyymmddxxxxx）
    photoCode: {type: String, index: true},   //照片code
    shootOn: {type: Date, index: true},  //拍摄时间
    extractOn: {type: Date, index: true},    //提取时间
    presetName:{type: String,  index: true,default:"thumbnail"},//模版名称
    presetId: {type: String, index: true}, //模版ID
    mobileEditActive:{type: Boolean, default: true,index: true}, //已经加模板手机端不能编辑
    //pp或ep的信息
    customerIds: [
        mongoose.Schema(
            {
                code: String,  //pp或ep的code
                //cType: String, //标示类型为pp还是ep
                userIds:{type: [String], index: true,default:[]} //用户Id列表
            },{_id:false})
    ],
    userIds: {type: [String], index: true}, //照片所属的用户Ids
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
    orderHistory: [
        { //购买信息
            customerId: {type:String,index:true},  //pp或ep的code
            productId: String,  //对应产品Id（照片，杯子，钥匙扣）
            prepaidId: {type:String,index:true},  //pp+的code
            userId: {type:String,index:true},  //用户Id
            activeTime: {type: String}, //用户所激活的照片的日期
            createdOn: Date  //创建时间
        }
    ],
    comments: [
        { //评论信息
            comment: String, //评论内容
            userId: String, //评论者Id可以为空
            userIP: String, //用户IP
            lastEditTime: Date //评论时间
        }
    ],
    albumId: {type: String, index: true}, //相册Id
    tagBy: [String], //相片包含的人员
    originalInfo: { //原图信息
        originalName: {type: String, required: true, index: true}, //原图名称
        path: {type: String, required: true}, //物理路径
        width:{type: Number, required: true}, //宽
        height: {type: Number, required: true}, //高
        url: {type: String, required: true}, //url
    },
    editHistorys: [],//edit 编辑的历史记录 originalInfo,thumbnail
    thumbnailType: [], //缩略图类型
    thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url},x512:{},x128:{},fileSize}
    GPS: { //GPS信息
        ImageUniqueID: String,
        GPSInfo: String,
        GPSLatitudeRef: String,
        GPSLatitude: String,
        GPSLongitudeRef: String,
        GPSLongitude: String,
        GPSAltitudeRef: String,
        GPSAltitude: String,
        GPSTimeStamp: String,
        GPSDateStamp: String
    },
    locationId: {type: String, index: true}, //拍摄点Id
    parentId: {type: String, index: true}, //原始图片Id
    disabled: {type: Boolean, default: false}, //图片是否有效
    rawFileName: {type: String,required: true, index: true}, //相机内照片原始名称
    originalFileName: {type: String,required: true, index: true}, //生成的图片名称  用于判断是否重复上传 全部小写存入数据库
    isFree:{type: Boolean, default: false}, //是否免费
    isVip: {type: Boolean, default: false}, //是否VIP
    targetPoint: String, // 拍摄照片后送达的地点信息
    allowDownload:{type:Boolean,default:true},//是否允许下载
    //engine信息
    engineInfo:{
        chroma:{type: Boolean, default: false, index: true},
        width:{type: Number, required: true}, //宽
        height: {type: Number, required: true}, //高
        Orientation:{type:String,default:'-1'},
        rawPath:{type: String,required: true, index: true},
        rawUrl:{type: String,required: true, index: true},
        imageJson:{type: String,required: true},
        imageJsonUrl:{type: String,required: true},
        originalPath:{type: String,required: true},
        originalFileSize:{type: Number,default: 1},
        originalUrl:{type: String,required: true},
        ticketNum:{type: String},
        ticketPrefix:{type: String},
        deleted:{type: Boolean, default: false},
        rawthumbnail: {},//raw 文件夹
        originalthumbnail: {}// original backup 文件夹
    },//照片引擎信息
    tokenBy:{type: String,index: true}, //摄影师
    photoSource:{type: String, default:'engine'} ,//照片来源
    // faces:{
    //     "image":[],
    //     "faces":[
    //     ]
    // },//脸部数据
    faces:{
    },//脸部数据
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
