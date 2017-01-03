/**
 * Created by xueting-bo on 16/12/5.
 */
var resTools = require('./resTools');
//customerIds --- 用户实际拥有的卡（数组）
exports.filterPhoto = function(photo, isPaid, customerIds, flag) {
    this._id=photo._id; if(!this._id)this._id="";
    this.siteId=photo.siteId;if(!this.siteId)this.siteId="";
    this.photoId=photo.photoId;if(!this.photoId)this.photoId="";
    this.photoCode=photo.photoCode;if(!this.photoCode)this.photoCode="";
    this.name=photo.name; if(!this.name)this.name="";
    this.locationId=photo.locationId; if(!this.locationId)this.locationId="";
    this.shootOn=resTools.convertDateToStr(photo.shootOn); if(!this.shootOn)this.shootOn="";
    this.shootDate=resTools.convertDateToStrYYMMDD(photo.shootOn);if(!this.shootDate)this.shootDate="";
    this.isFree=photo.isFree;if(!this.isFree)this.isFree="";
    this.parentId=photo.parentId;if(!this.parentId)this.parentId="";
    this.createdOn=photo.createdOn;if(!this.createdOn)this.createdOn="";
    this.extractOn=photo.extractOn;if(!this.extractOn)this.extractOn="";
    this.userIds=photo.userIds;if(!this.userIds)this.userIds=[];
    this.presetId=photo.presetId;if(!this.presetId)this.presetId="";
    this.targetPoint=photo.targetPoint;if(!this.targetPoint)this.targetPoint="";
    this.downloadCount=photo.downloadCount;if(!this.downloadCount)this.downloadCount=0;
    this.comments=photo.comments;if(!this.comments)this.comments=[];
    this.visitedCount=photo.visitedCount;if(!this.visitedCount)this.visitedCount=0;
    this.disabled=photo.disabled;if(!this.disabled)this.disabled=false;
    this.likeCount=photo.likeCount;if(!this.likeCount)this.likeCount=0;
    this.isFree=photo.isFree;if(!this.isFree)this.isFree=false;
    this.likeCount=photo.likeCount;if(!this.likeCount)this.likeCount=0;
    this.shareInfo=photo.shareInfo;if(!this.shareInfo)this.shareInfo=[];
    this.createdBy=photo.createdBy;if(!this.createdBy)this.createdBy="";
    this.mobileEditActive=photo.mobileEditActive;if(!this.mobileEditActive)this.mobileEditActive=true;
    this.modifiedOn=photo.modifiedOn;if(!this.modifiedOn)this.modifiedOn="";
    this.allowDownload=photo.allowDownload;if(!this.allowDownload)this.allowDownload=false;
    this.editCount=photo.editCount;if(!this.editCount)this.editCount=0;
    this.isPaid=isPaid;if(!this.isPaid)this.isPaid=false;
    //this.thumbnail=photo.thumbnail;if(!this.thumbnail)this.thumbnail={};
    this.thumbnail = {};
    for(var i in photo.thumbnail){
        this.thumbnail[i] = {};
        for(var j in photo.thumbnail[i]){
            if(j != 'path'){
                this.thumbnail[i][j] = photo.thumbnail[i][j];
            }
        }
    }
    //this.originalInfo=photo.originalInfo;if(!this.originalInfo)this.originalInfo={};
    if(isPaid){
        this.originalInfo ={};
        for(var k in photo._doc.originalInfo){
            if(k != 'path'){
                this.originalInfo[k] = photo.originalInfo[k];
            }
        }
    }
    //this.customerIds=photo.customerIds;if(!this.customerIds)this.customerIds=[];
    this.customerIds = [];
    if(flag){
        if(customerIds && customerIds.length > 0){
            for(var n = 0; n < customerIds.length; ++n){
                for(var m = 0; m < photo.customerIds.length; ++m){
                    if(customerIds[n] == photo.customerIds[m].code){
                        this.customerIds.push(photo.customerIds[m]);
                    }
                }
            }
        }
    }else {
        for(var l = 0; l < customerIds.$in.length; ++l){
            this.customerIds.push({code: customerIds.$in[l]});
        }
    }
}

exports.filterPhotoFromOldSys = function(photo) {
    this._id=photo._id; if(!this._id)this._id="";
    this.siteId=photo.siteId;if(!this.siteId)this.siteId="";
    this.photoId=photo.photoId;if(!this.photoId)this.photoId="";
    this.photoCode=photo.code;if(!this.photoCode)this.photoCode="";
    this.name=photo.name; if(!this.name)this.name="";
    this.locationId=photo.locationId; if(!this.locationId)this.locationId="";
    this.shootOn=resTools.convertDateToStr(photo.shootOn); if(!this.shootOn)this.shootOn="";
    this.shootDate=resTools.convertDateToStrYYMMDD(photo.shootOn);if(!this.shootDate)this.shootDate="";
    this.isFree=photo.isFree;if(!this.isFree)this.isFree="";
    this.parentId=photo.parentId;if(!this.parentId)this.parentId="";
    this.createdOn=photo.createdOn;if(!this.createdOn)this.createdOn="";
    this.extractOn=photo.extractOn;if(!this.extractOn)this.extractOn="";
    this.userIds=photo.userIds;if(!this.userIds)this.userIds=[];
    this.presetId=photo.presetId;if(!this.presetId)this.presetId="";
    this.targetPoint=photo.targetPoint;if(!this.targetPoint)this.targetPoint="";
    this.downloadCount=photo.downloadCount;if(!this.downloadCount)this.downloadCount=0;
    this.comments=photo.comments;if(!this.comments)this.comments=[];
    this.visitedCount=photo.visitedCount;if(!this.visitedCount)this.visitedCount=0;
    this.disabled=photo.disabled;if(!this.disabled)this.disabled=false;
    this.likeCount=photo.likeCount;if(!this.likeCount)this.likeCount=0;
    this.isFree=photo.isFree;if(!this.isFree)this.isFree=false;
    this.likeCount=photo.likeCount;if(!this.likeCount)this.likeCount=0;
    this.shareInfo=photo.shareInfo;if(!this.shareInfo)this.shareInfo=[];
    this.createdBy=photo.createdBy;if(!this.createdBy)this.createdBy="";
    this.mobileEditActive=photo.mobileEditActive;if(!this.mobileEditActive)this.mobileEditActive=true;
    this.modifiedOn=photo.modified_on;if(!this.modifiedOn)this.modifiedOn="";
    this.allowDownload=photo.allowDownload;if(!this.allowDownload)this.allowDownload=false;
    this.editCount=photo.editCount;if(!this.editCount)this.editCount=0;
    this.isPaid=true;
    //this.thumbnail=photo.thumbnail;if(!this.thumbnail)this.thumbnail={};
    this.thumbnail = {
        x128: {
            width: 240,
            height: 180,
            url: photo.thumbnail
        },
        x1024: {
            width: 1024,
            height: 768,
            url: photo.preview
        }
    };

    this.originalInfo ={
        width: 2400,
        height: 1800,
        url: photo.url
    };
    this.customerIds = [];

}