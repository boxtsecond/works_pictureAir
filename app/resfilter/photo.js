/**
 * Created by xueting-bo on 16/12/5.
 */

exports.filterPhoto = function(photo) {
    this._id=photo._id; if(!this._id)this._id="";
    this.siteId=photo.siteId;if(!this.siteId)this.siteId="";
    this.photoId=photo.photoId;if(!this.photoId)this.photoId="";
    this.photoCode=photo.photoCode;if(!this.photoCode)this.photoCode="";
    this.name=photo.name; if(!this.name)this.name="";
    this.locationId=photo.locationId; if(!this.locationId)this.locationId="";
    this.thumbnail=photo.thumbnail;if(!this.thumbnail)this.thumbnail="";
    this.shootOn=photo.shootOn;if(!this.shootOn)this.shootOn="";
    this.isFree=photo.isFree;if(!this.isFree)this.isFree="";
    this.parentId=photo.parentId;if(!this.parentId)this.parentId="";
    this.createdOn=photo.createdOn;if(!this.createdOn)this.createdOn="";
    this.userIds=photo.userIds;if(!this.userIds)this.userIds="";
}