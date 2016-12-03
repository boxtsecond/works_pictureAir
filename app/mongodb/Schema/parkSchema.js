var db=require('../mongodb.js');
var mongoose=require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var options={};
var config=
{
    siteInfo:[],
    "siteId" : {type: String, index: true},   //乐园
    version: {type: Number,default:0},
    country: {type: String, index: true},   //国家
    province: String,   //省
    city: String,   //城市
    address:String, //地址
    chain: String,   //连锁乐园名
    parkId:String,  //parkId 线下使用
    parkCode:String,    //乐园简码与条码包含的简码相同；
    name: {type: String},   //乐园名称
    description: {type: String},   //描述
    servers: [  //服务器信息
        {
            serverId:String,//服务器Id
            type:{type: String},//db engine app nas
            description: {type: String},   //描述
            IP: String, //服务器Ip
            name: String, //服务器名称
            isDel:{type:Boolean,default:false},//server是否不可用
            outlets:[String],//outletId
            locations:[String] //locationId
        }
    ],
    locations: [
        {
            locationId:String,//地点Id
            orderNo:{type:Number,default:0},//排序字段
//                    rootId:String,//location根节点Id
            parentId:{type:String,default:"0"},    //location父级Id
            locationType:{type:String,default:"albumGroup"}, //location的类型，（摄影师拍摄点-shootSpot，用于相册分组-albumGroup，园区板块-partition）
            shootType:{type:String,default:'character'},//拍摄点区分：character,attraction
            characters:[{
                character:String,
                characterIcon:{
                    imgPath:String, //图片物理路径
                    imgUrl:String   //图片url
                }
            }],//如果拍摄点是character类型，才有characters
            isDel:{type:Boolean,default:false},//地点是否不可用
            location: String, //拍摄点名称
            //[{key:ch,value:"",lg:"@root_location"}]
            location_EN:String,//拍摄点英文名
            description:{type:String,default:''},//描述
            description_EN:{type:String,default:''},//英文描述
            favoriteCount:{type:Number,default:0},//被收藏次数
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
            cameralPrefixes: String, //相机前缀
            defaultPhoto: String, //地点图片
            defaultPhotoPath:String,//地点图片物理路径
            cameralConfig:{
                aperture:String,    //光圈
                ISO:String,         //ISO
                shutter:String,     //快门
                lens:String,        //镜头型号
                flash:Boolean,         //闪光灯
                whiteBalance:String      //白平衡
            },
            createdOn: Date,//创建时间
            modifiedOn: Date,//修改时间
            createdBy: String,//创建者ID
            modifiedBy: String, //创建者ID
            servers:[String],//serverId
            outlets:[String],//outletId
            isAd:{type:Boolean,default:false},//是否是广告点
            adWords:String      //广告词
        }
    ],
    outlets: [ //门店信息
        {
            outletId: String, //门店id
            outletName: String, //门店
            remark: String, //备注
            contact: { //联系方式
                telephone: String, //联系电话
                email: String, //email
                address: String //联系地址
            },
            terminals: [ //终端信息
                {
                    terminal: String, //终端:viewing Station,communicator,preview wall,self service kiosk
                    IP: String //Ip
                }
            ],
            createdOn: Date,//创建时间
            modifiedOn: Date,//修改时间
            createdBy: String,//创建者ID
            modifiedBy: String, //创建者ID
            isPickUpPoint:{type:Boolean,default:false},//是否是提货点
            servers:[String],//serverId
            locations:[String]//locationId
        }
    ],
    admins: {type: [String], index: true}, //管理员Ids
    pageUrl: {type: String}, //主页url
    //surveyId: String, //调查问卷
    //sharedUsers: [String], //分享乐园的用户Ids
    //likedUsers: [String], //喜欢乐园的用户Ids
    //visitedUsers: [String], //访问过乐园的用户Ids
    coverHeaderImage: {type: String}, //乐园头部背景图url
    avatarUrl: {type: String}, //乐园头像url
    contact: { //
        telephone: String, //联系电话
        email: String, //email
        address: String //联系地址
    },
    active: {type: Boolean, default: true}, //是否有效
    isDel:{type:Boolean,default:false},     //是否已删除
    operationInfo: [
        { //
            applyOn: String, //日期类型：weekday/date
            date: Number, //日期值
            operationTime: [
                { //
                    beginTime: String, //运营开始时间
                    endTime: String //运营结束时间
                }
            ]
        }
    ],
    createdOn: Date,//创建时间
    modifiedOn: Date,//修改时间
    createdBy: String,//创建者ID
    modifiedBy: String //创建者ID
};
module.exports={
    options:options,
    config:config
};
