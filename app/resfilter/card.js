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