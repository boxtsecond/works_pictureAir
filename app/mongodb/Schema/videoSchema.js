/**
 * Created by xueting-bo on 16/11/28.
 */

var options = {};
var config = {
    photos: [
        {
            photo_id: String,
            originalInfo: {originalName: {type: String, index: true}, //原图名称
                path: String, //物理路径
                width: Number, //宽
                height: Number, //高
                url: String //url
            },
            thumbnail: {} //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url},x512:{},x128:{}}
        }
    ],
    userId: String,//用户Id
    path: String,//path
    url: String,//Url
    fileSize: Number,//size,mb
    width: Number,
    height: Number,
    createdOn: {type: Date, default: Date.now},//创建时间
    createdBy: {type: String},//创建人，userId
    modifiedOn: {type: Date, default: Date.now},//修改时间
    modifiedBy: {type: String},//修改人
    shareInfo: [
        {
            sourceId:String,//分享源id
            sourceSecret:String,//分享源密钥
            channel: String, //分享渠道
            count: Number   //分享次数
        }
    ]
};

module.exports={
    options:options,
    config:config
};