/**
 * Created by xueting-bo on 16/12/17.
 */

var resTools = require('./resTools');
exports.filterShare = function(share) {
    this.photoCode = share.photoCode;if (!this.photoCode)this.photoCode = "";
    this.shootOn = resTools.convertDateToStr(share.shootOn);if (!this.shootOn)this.shootOn = "";
    this.width = share._doc.thumbnail['x1024'].width;if (!this.width)this.width = -1;
    this.height = share._doc.thumbnail['x1024'].height;if (!this.height)this.height = -1;
    this.url = share._doc.thumbnail['x1024'].url;if (!this.url)this.url = "";
}