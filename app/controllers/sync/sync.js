/**
 * Created by meteor on 16/12/9.
 */

var synctools=require("./synctools");
var Promise=require('bluebird');
var  websiteStoragePath="/data/website";
var  websitePhotoStoragePath="/data/website/photos";
var photoModel=require("../../mongodb/Model/photoModel");
var userModel=require("../../mongodb/Model/userModel");
// /sync/syncToCloud
//-1  服务器繁忙（CPU  内存）
//503  no supper this dev input
//200-300  成功 normal
//   规定以1 0 开头的提示都是监控程序所用的错误
//   以 2 6 开头的提示都是成功
//   以 3 7 开头的都是db这类的交互错误
//   以 4 8开头的都是提示给用户看的
//   以 5 9开头的都是 服务器内部错误（比如连接不上mongodb）服务器CPU 内存
//eg:
//20000  60000 normal
//30000  70000 prompt 业务中的逻辑错误比如 redis mongodb 错误
//40000  80000 prompt 用户输入错误(需要提示给用户) 对外的
//50000  90000 system 服务器内部错误 （内部日志记录）
var errInfo={
    "syncSaveOriginalImage":{status: 900, msg:"get token error",desc:"get token from redis err"},
    "syncFindToDBerror":{status: 700, msg:"find db error",desc:"find   db error"},
    "syncUpdateToDBerror":{status: 701, msg:"find db error",desc:"update   db error"},
    "syncCreateToDBerror":{status: 702, msg:"find db error",desc:"Create   db error"},
    "syncSaveOriginalImageToDisk":{status: 600, msg:"save Original O Image error",desc:"save Original Image error"},
    "syncSavePreviewImageToDisk":{status: 601, msg:"save Preview L Image error",desc:"save preview Image error"},
    "syncSaveThumbnailMImageToDisk":{status: 602, msg:"save Thumbnail M Image error",desc:"save preview Image error"},
    "syncSaveThumbnailSImageToDisk":{status: 603, msg:"save Thumbnail S Image error",desc:"save preview Image error"},
    "syncSaveThumbnailWImageToDisk":{status: 604, msg:"save Thumbnail W Image error",desc:"save preview Image error"},
    "syncError":{status: 605, msg:"system error",desc:"promise error"}
};


function updatePhotoObJ(photo) {
    this.encounter=photo.encounter;
    this.pacId=photo.pacId;
    this.userIds=photo.userIds;
    this.photoId=photo.photoId;
    this.photoCode=photo.photoCode;
    this.shootOn=photo.shootOn;
    this.extractOn=photo.extractOn;
    this.editHistorys=photo.editHistorys;
    this.orderHistory=photo.orderHistory;
    this.originalInfo=photo.originalInfo;
    this.locationId=photo.locationId;
    if(photo.targetPoint)this.targetPoint=photo.targetPoint;
    this.tokenBy=photo.tokenBy;
    this.photoSource=photo.photoSource;
    this.checkedTime=photo.checkedTime;
    this.modifiedOn=new Date();
    this.tagBy=photo.tagBy;
    this.customerIds=photo.customerIds;
    this.allowDownload=photo.allowDownload;
    this.isVip=photo.isVip;
    this.disabled=photo.disabled;
    this.mobileEditActive=photo.mobileEditActive;
    this.thumbnail=photo.thumbnail;
    if(photo.photoStatus)this.photoStatus=photo.photoStatus;
    if(photo.checkedUser)  this.checkedUser=photo.checkedUser;
    this.tagBy=photo.tagBy;
}

function syncPhotos(req, res) {
     Promise.resolve(req.ext.params).then(function (obj) {
         if(obj.photo.customerIds && obj.photo.customerIds.length > 0){
             return Promise.each(obj.photo.customerIds, function (csId) {
                 if (csId.code) {
                     var userIds = [];
                     return Promise.resolve()
                         .then(function () {
                             return userModel.findAsync({'customerIds.code': csId.code});
                         })
                         .then(function (users) {
                             if (users && users.length > 0) {
                                 return Promise.each(users, function (ur) {
                                     userIds.push(ur._id);
                                 });
                             }
                         })
                         .then(function () {
                             return syncFileData(req, userIds).catch(function (err) {
                                 return Promise.reject(err);
                             });
                         })
                 }
             });
         }else {
             //图片解绑
             return syncFileData(req, []).catch(function (err) {
                 return Promise.reject(err);
             });
         }
    })
         .then(function () {
             return  res.ext.json([200,'success',{}]);
         })
         .catch(function (err) {
             if(err.status){
                 return res.ext.json(err);
             }else {
                 console.error(err);
                 return res.ext.json(errInfo.syncError);
             }
         });
}

// console.log(photoModel)
function  syncFileData(req, users) {
    Promise.resolve(req.ext.params).then(function (obj) {
        obj.photo.userIds = users;
        var photo=new synctools.convetphotoDataLineToOnLine(websiteStoragePath,websitePhotoStoragePath,obj.photo);
        return {
              photo:photo,
              O:obj.O,//O
              L:obj.L,//1024
              M:obj.M,//512
              S:obj.S,//128
              W:obj.W,//w512
              exist:false,
              edit:false
          }
    }).then(function (obj) {
        return photoModel.findOne({_id:obj.photo._id}).then(function (err) {
            if(err) {
                if(obj.photo.editHistorys&&obj.photo.editHistorys.length>0){
                    return {
                        photo:obj.photo,
                        O:obj.O,//O
                        L:obj.L,//1024
                        M:obj.M,//512
                        S:obj.S,//128
                        W:obj.W,//w512
                        exist:true,
                        edit:true
                    }
                }
               else  return {
                    photo:obj.photo,
                    O:obj.O,//O
                    L:obj.L,//1024
                    M:obj.M,//512
                    S:obj.S,//128
                    W:obj.W,//w512
                    exist:true,
                    edit:false
                }
            }
            else {
                return {
                    photo:obj.photo,
                    O:obj.O,//O
                    L:obj.L,//1024
                    M:obj.M,//512
                    S:obj.S,//128
                    W:obj.W,//w512
                    exist:false,
                    edit:false
                }
            }
        }).catch(function (err) {
            console.log(err);
            return Promise.reject(errInfo.syncFindToDBerror);
        });
    }).then(function (obj) {
        if(obj.exist){
            var nphoto=new updatePhotoObJ(obj.photo);
            if(!obj.edit){//没有被编辑
                return  photoModel.updateAsync({_id: obj.photo._id}, nphoto )
                    .then(function (onePhoto) {
                        console.log("upload old rawFileName :--->>>>>",obj.photo.rawFileName);
                        return Promise.reject([200,'success',{}]);
                    }).catch(function (nerr) {
                        console.log(nerr);
                        if(synctools.isArray(nerr)) return Promise.reject(nerr);
                        else  return Promise.reject(errInfo.syncUpdateToDBerror);
                    });
            }else {
                return  photoModel.updateAsync({_id: obj.photo._id},nphoto)
                    .then(function (onePhoto) {
                        return obj;
                    }).catch(function (nerr) {
                        console.log(nerr);
                        return Promise.reject(errInfo.syncUpdateToDBerror);
                    });
            }
        } else return obj;
    }).then(function (obj) {
            if(obj.O&&obj.O!=""){
                return synctools.writeStreamBase64(obj.photo.originalInfo.path,obj.O).then(function (err) {
                    if(err) return obj;
                    else  return Promise.reject(errInfo.syncSaveOriginalImageToDisk);
                })
            }
            else return obj;
    }).then(function (obj) {
        if(obj.L&&obj.L!=""){
            if(!req.ext.isundefined(obj.photo.thumbnail.x1024)
            &&!req.ext.isundefined(obj.photo.thumbnail.x1024.path)){
                return synctools.writeStreamBase64(obj.photo.thumbnail.x1024.path,obj.L).then(function (err) {
                    if(err) return obj;
                    else return Promise.reject(errInfo.syncSavePreviewImageToDisk);
                })
            }else  return obj;
        }
        else return obj;
    }).then(function (obj) {
        if(obj.M&&obj.M!=""){
            if(!req.ext.isundefined(obj.photo.thumbnail.x512)
                &&!req.ext.isundefined(obj.photo.thumbnail.x512.path)){
                return synctools.writeStreamBase64(obj.photo.thumbnail.x512.path,obj.M).then(function (err) {
                    if(err) return obj;
                    else return Promise.reject(errInfo.syncSaveThumbnailMImageToDisk);
                })
            }else  return obj;
        }
        else return obj;
    }).then(function (obj) {
            if(obj.S&&obj.S!=""){
                if(!req.ext.isundefined(obj.photo.thumbnail.x128)
                    &&!req.ext.isundefined(obj.photo.thumbnail.x128.path)){
                    return synctools.writeStreamBase64(obj.photo.thumbnail.x128.path,obj.S).then(function (err) {
                        if(err) return obj;
                        else return Promise.reject(errInfo.syncSaveThumbnailSImageToDisk);
                    })
                }else  return obj;
            }
            else return obj;
    }).then(function (obj) {
            if(obj.W&&obj.W!=""){
                if(!req.ext.isundefined(obj.photo.thumbnail.w512)
                    &&!req.ext.isundefined(obj.photo.thumbnail.w512.path)){
                    return synctools.writeStreamBase64(obj.photo.thumbnail.w512.path,obj.W).then(function (err) {
                        if(err) return obj;
                        else return Promise.reject(errInfo.syncSaveThumbnailWImageToDisk);
                    })
                }else  return obj;
            }
            else return obj;
    }).then(function (obj) {
                // console.log('#######',obj);
            if(obj.edit){
                console.log("upload edit  rawFileName :--->>>>>",obj.photo.rawFileName);
                return obj.photo;
            }else{
                return photoModel.createAsync(obj.photo).then(function (err) {
                    console.log("upload new  rawFileName :--->>>>>",obj.photo.rawFileName);
                    return obj.photo;
                }).catch(function (err) {
                    return Promise.reject(errInfo.syncCreateToDBerror);
                });
            }
        })
}
function syncFile(req,res) {
    return res.ext.json([200,'success',{}]);
  // console.log(req.ext.params.length);
  //   console.log(req.ext.params.relativePath)
  //   console.log(req.ext.params.oLength)
    // console.log(req.ext.params.O)
}

function syncData() {

}

module.exports={
    syncFileData:syncFileData,
    syncFile:syncFile,
    syncData:syncData,
    syncPhotos:syncPhotos
}