/**
 * Created by xueting-bo on 16/12/5.
 */
var resTools = require('./resTools');
exports.filterPhoto = function(photo, isPaid) {
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
    this.userIds=photo.userIds;if(!this.userIds)this.userIds="";
    this.presetId=photo.presetId;if(!this.presetId)this.presetId="";
    this.targetPoint=photo.targetPoint;if(!this.targetPoint)this.targetPoint="";
    this.downloadCount=photo.downloadCount;if(!this.downloadCount)this.downloadCount=0;
    this.customerIds=photo.customerIds;if(!this.customerIds)this.customerIds=[];
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

    this.thumbnail = {};
    for(var i in photo.thumbnail){
        this.thumbnail[i] = {};
        for(var j in photo.thumbnail[i]){
            if(j != 'path'){
                this.thumbnail[i][j] = photo.thumbnail[i][j];
            }
        }
    }
    //this.thumbnail=photo.thumbnail;if(!this.thumbnail)this.thumbnail={};
    if(isPaid){
        this.originalInfo ={};
        for(var k in photo._doc.originalInfo){
            if(k != 'path'){
                this.originalInfo[k] = photo.originalInfo[k];
            }
        }
    }
    //this.originalInfo=photo.originalInfo;if(!this.originalInfo)this.originalInfo={};
}