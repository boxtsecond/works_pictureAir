/**
 * Created by meteor on 16/12/9.
 */

var synctools=require("./synctools");
var Promise=require('bluebird');
var  websiteStoragePath="/data/website";
var  websitePhotoStoragePath="/data/website/photos";
var photoModel=require("../../mongodb/Model/photoModel");
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
};


function updatePhotoObJ(photo) {
    this.encounter=photo.encounter;
    this.pacId=photo.pacId;
    this.userId=photo.userId;
    this.photoId=photo.photoId;
    this.photoCode=photo.photoCode;
    this.shootOn=photo.shootOn;
    this.extractOn=photo.extractOn;
    this.editHistorys=photo.editHistorys;
    this.originalInfo=photo.originalInfo;
    this.locationId=photo.locationId;
    this.targetPoint=photo.targetPoint;
    this.tokenBy=photo.tokenBy;
    this.photoSource=photo.photoSource;
    // this.targetPoint=photo.targetPoint;
    this.checkedTime=photo.checkedTime;
    this.modifiedOn=new Date();
    this.tagBy=photo.tagBy;
    this.customerIds=photo.customerIds;
    this.allowDownload=photo.allowDownload;
    this.isVip=photo.isVip;
    this.disabled=photo.disabled;
    this.mobileEditActive=photo.mobileEditActive;
    this.thumbnail=photo.thumbnail;
    this.photoStatus=photo.photoStatus;
    this.checkedUser=photo.checkedUser;
    this.tagBy=photo.tagBy;
}

// console.log(photoModel)
function  syncFileData(req,res) {
    Promise.resolve(req.ext.params).then(function (obj) {
          var photo=new synctools.convetphotoDataLineToOnLine(websiteStoragePath,websitePhotoStoragePath,obj.photo);
          return {
              photo:photo,
              O:obj.O,//O
              L:obj.L,//1024
              M:obj.M,//512
              S:obj.S,//128
              W:obj.W//w512
          }
    }).then(function (obj) {
            if(obj.O&&obj.O!=""){
                return synctools.writeStreamBase64(obj.photo.originalInfo.path,obj.O).then(function (err) {
                    if(err) return obj;
                    else return obj;
                })
            }
            else return obj;
    }).then(function (obj) {
        if(obj.L&&obj.L!=""){
            if(!req.ext.isundefined(obj.photo.thumbnail.x1024)
            &&!req.ext.isundefined(obj.photo.thumbnail.x1024.path)){
                return synctools.writeStreamBase64(obj.photo.thumbnail.x1024.path,obj.L).then(function (err) {
                    if(err) return obj;
                    else return obj;
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
                    else return obj;
                })
            }else  return obj;
        }
        else return obj;
    })
        .then(function (obj) {
            if(obj.S&&obj.S!=""){
                if(!req.ext.isundefined(obj.photo.thumbnail.x128)
                    &&!req.ext.isundefined(obj.photo.thumbnail.x128.path)){
                    return synctools.writeStreamBase64(obj.photo.thumbnail.x128.path,obj.S).then(function (err) {
                        if(err) return obj;
                        else return obj;
                    })
                }else  return obj;
            }
            else return obj;
        })
        .then(function (obj) {
            if(obj.W&&obj.W!=""){
                if(!req.ext.isundefined(obj.photo.thumbnail.w512)
                    &&!req.ext.isundefined(obj.photo.thumbnail.w512.path)){
                    return synctools.writeStreamBase64(obj.photo.thumbnail.w512.path,obj.W).then(function (err) {
                        if(err) return obj;
                        else return obj;
                    })
                }else  return obj;
            }
            else return obj;
        })
        .then(function (obj) {
            return obj.photo;
        })
        .then(function (photo) {
            return photoModel.findOne({_id:photo._id}).then(function (err) {
                if(err) {
                    //如果数据已经存在,更新数据
                    var nphoto=new updatePhotoObJ(photo);
                    return  photoModel.update({_id: photo.id},{$set:nphoto},{ multi: true })
                        .then(function (onePhoto) {
                            console.log("upload update rawFileName :--->>>>>",photo.rawFileName);
                            return Promise.reject([200,'success',{}]);
                    }).catch(function (nerr) {
                            console.log("upload update rawFileName :--->>>>>",photo.rawFileName);
                            return Promise.reject([300,'success',{}]);
                    });
                }
                else return photo;
            }).catch(function (err) {
                return photo;
            });
        })
        .then(function (photo) {
                // console.log('#######',obj);
              return photoModel.createAsync(photo).then(function (err) {
                  return photo;
              }).catch(function (err) {
                  return Promise.reject([300,'success',{}]);
              });
        }).then(function (photo) {
            console.log("upload rawFileName :--->>>>>",photo.rawFileName);
               res.ext.json([200,'success',{}]);
        })
        .catch(function (err) {
            console.error(err);
          res.ext.json(err);
    });
}
function syncFile(req,res) {
    res.ext.json([200,'success',{}]);
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
    syncData:syncData
}