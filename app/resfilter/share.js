/**
 * Created by xueting-bo on 16/12/17.
 */


exports.filterShare = function(share) {
    this.photoCode = share.photoCode;if (!this.photoCode)this.photoCode = "";
    this.shootOn = share.shootOn;if (!this.shootOn)this.shootOn = "";
    this.path = share.thumbnail.x1024.path;if (!this.thumbnail.x1024.path)this.thumbnail.x1024.path = "";
    this.width = share.thumbnail.x1024.width;if (!this.thumbnail.x1024.width)this.thumbnail.x1024.width = "";
    this.height = share.thumbnail.x1024.height;if (!this.thumbnail.x1024.height)this.thumbnail.x1024.height = "";
    this.url = share.thumbnail.x1024.url;if (!this.thumbnail.x1024.url)this.thumbnail.x1024.url = "";
}