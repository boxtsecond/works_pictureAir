/**
 * Created by xueting-bo on 2017/3/2.
 */

exports.filterProductToDB = function (req, params) {
    this.name = params.name;
    this.nameAlias = params.nameAlias || '';
    this.code = params.code;
    this.sequence = req.ext.sh1(params.name+params.code);
    this.description = params.description || '';
    this.brand = params.brand;
    this.pictures = params.pictures || [];
    this.copywriter = params.copywriter || '';
    this.createdBy = params.user;
    this.modifiedBy = params.user;
    this.isAllowBuy = params.isAllowBuy;
    this.entityType = params.entityType;
    this.keyword = params.keyword || '';
    this.isPost = params.isPost || false;
    this.active = params.active;
    this.deleted = params.deleted;
    this.priceList = params.priceList;
}
