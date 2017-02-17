/**
 * Created by xueting-bo on 16/12/12.
 */

exports.filterPPPCardToUserDB = function (card) {
    this.siteIds = card.siteIds;
    this.locationIds = card.locationIds;
    this.productIds = card.productIds;
    this.PPPCode = card.PPPCode;
    this.PPPType = card.PPPType;
    this.oType = card.productIds;
    this.days = card.days;
    this.bindOn = card.bindOn;
    this.expiredDay = card.expiredDay;
    this.expiredOn = card.expiredOn;
    this.soldOn = card.soldOn;
    this.active = card.active;
    this.photoCount = card.photoCount;
}

exports.createCardCodeToDB = function (card) {
    this.siteIds = card.siteIds;
    this.PPPCode = card.PPPCode;
    this.SN = card.SN;
    this.PPPType = card.PPPType;
    this.oType = card.oType;if(!this.oType)this.oType='Gift';
    this.days = card.days;if(!this.days)this.days=1;
    this.ownerId = '';
    this.userId = '';
    this.PPCode = '';
    this.expiredDay = card.expiredDay;if(!this.expiredDay)this.expiredDay=1;
    this.levels = card.levels;if(!this.levels)this.levels=1;
    this.createdBy = card.user;
    this.modifiedBy = card.user;
    this.effectiveOn = new Date('1970-01-01');
    this.ownOn = new Date('1970-01-01');
    this.soldOn = new Date('1970-01-01');
    this.expiredOn = card.expiredOn;
}