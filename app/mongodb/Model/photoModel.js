var collectionname='photo';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);
var Promise = require('bluebird');
Schema.statics.getAllPark = function(dispaly, callback) {
    return this.model(collectionname).find({active : true},dispaly, callback);
}
Schema.statics.getParkFromId = function(id,dispaly, callback) {
    return this.model(collectionname).find({_id:id},dispaly, callback);
}
//##################实例方法##################
Schema.methods.insert= function(callback) {
    return this.save(callback);
};
//##################实例方法##################

var model = Promise.promisifyAll(db.model(collectionname, Schema));
module.exports = model;

var request=require('request');
model.findOne({},function(err,data){
    //var Strd=JSON.stringify(data);
    //var data=JSON.parse(Strd);
    //console.log('"'+Strd.replace(new RegExp(/(\")/g),'\\"')+'"')
    request.post({url: "http://127.0.0.1:4001/api/video/GenerateVideo", form: {
            "presetName": "BaymaxInflate",
            "data":JSON.stringify(data)
        }},
        function (err, httpResponse, body) {
            if ( httpResponse&& typeof(httpResponse)!= "undefined" && typeof(httpResponse.statusCode)!= "undefined" &&httpResponse.statusCode == 200) {
                body = JSON.parse(body);
                  console.log(body);
            }else
            {
             }
        }).on('error', function (err) {

        })
})




///**
// * Created by meteor on 14-9-19.
// */
//
//function addPhotos(album,siteId1,siteId2) {
//    var albumId=album._id;
//    var photoList = [];
//    var  sourcePath = path.join(__dirname, '/publicDirs/demoPhotos');
//    var x1024Path = path.join(__dirname, '/publicDirs/demoPhotos/thumbnail/1024');
//    var  x512Path = path.join(__dirname, '/publicDirs/demoPhotos/thumbnail/512');
//    var x128Path = path.join(__dirname, '/publicDirs/demoPhotos/Thumbnail/128');
//    // var photoList=[];
//    var code=111111;
//    var j=1;
//    for(var x=5985;x<=6046;x++){
//        if(j>31){
//            j=1;
//        }
//        photoList.push(
//            {
//                code: code.toString(),
//                title: 'OA0_'+ x.toString(),
//                shootTime: new Date('2014-1-'+ j.toString()+' 10:01'),
//                extractTime: new Date('2014-1-'+ (j+1).toString()+' 10:20'),
//                albumId: '',
//                userId: '',
//                originalInfo: {
//                    originalName: 'OA0_'+ x.toString()+'.jpg',
//                    path: sourcePath + '/OA0_'+ x.toString()+'.jpg',
//                    width: 1024,
//                    height: 1024,
//                    url: '/publicDirs/20140911/OA0_'+ x.toString()+'.jpg'
//                },
//                thumbnailType: ['x1024', 'x512', 'x128'],
//                thumbnail: {
//                    x1024: {
//                        path: x1024Path + '/OA0_'+ x.toString()+'.jpg',
//                        width: 1024,
//                        height: 1024,
//                        url: '/publicDirs/20140911/thumbnail/1024/OA0_'+ x.toString()+'.jpg'
//                    },
//                    x512: {
//                        path: x512Path + '/OA0_'+ x.toString()+'.jpg',
//                        width: 512,
//                        height: 512,
//                        url: '/publicDirs/20140911/thumbnail/512/OA0_'+ x.toString()+'.jpg'
//                    },
//                    x128: {
//                        path: x128Path + '/OA0_'+ x.toString()+'.jpg',
//                        width: 128,
//                        height: 128,
//                        url: '/publicDirs/20140911/thumbnail/128/OA0_'+ x.toString()+'.jpg'
//                    }
//                },
//
//                rootId: ''
//            }
//        )
//        code++;
//        j++;
//    }
//    var i=1;
//    async.each(photoList, function (photo) {
//        var np = new photoModel(photo);
//        np.rootId = np._id;
//        np.albumId=albumId;
//        if(i==1){
//            i=-1;
//            np.siteId=siteId1;
//        }else{
//            np.siteId=siteId2;
//        }
//
////        console.log(np._id);
//        np.save(function (err, p) {
//            album.photos.push(np._id);
//
////            console.log(util.inspect(p));
//        })
//    },function(){
//        album.save();
//    })
//}
//var photoModel=require('../Schema/photoSchema.js');
//var addPhotoList=function addPhotoList(photoList)
//{
//    require('async').each(photoList, function (photo) {
//        var np = new photoModel(photo);
//        np.rootId = np._id;
//        np.albumId=albumId;
//        np.save(function (err, p) {
//            album.photos.push(np._id);
//
////            console.log(util.inspect(p));
//        })
//    },function(){
//        album.save();
//    })
//}