/**
 * Created by xueting-bo on 16/11/21.
 */

var errInfo = require('../resfilter/resInfo.js').errInfo;
var filters = require('../resfilter/resfilter.js');
var productModel = require('../mongodb/Model/productModel');
var redisclient=require('../rq').redisclient;
var config = require('../../config/config.js').config.configJSONData;
var findInfo = require('../resfilter/cacheTools.js').findInfo;

exports.addProduct = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, ['name', 'code', 'user', 'priceList'])){
        return res.ext.json(errInfo.addProduct.paramsError);
    }
    Promise.resolve()
        .then(function () {
            return Promise.each(params.priceList, function (price) {
                if(!req.ext.checkExistProperty(price, ['siteId', 'currency', 'amount'])){
                    return Promise.reject(errInfo.addProduct.priceError);
                }
            })
        })
        .then(function () {
            var mongoProduct = new filters.product.filterProductToDB(req, params);
            return productModel.createAsync(mongoProduct)
                .then(function (pdt) {
                    var redisProduct = new filters.product.filterProductToDB(req, pdt);
                    return redisclient.hset(config.redis.productList, pdt.sequence,JSON.stringify(redisProduct));
                });
        })
        .catch(function (err) {
            if(err.status){
                return res.ext.json(err);
            }else {
                console.log(err);
                return res.ext.json(errInfo.addProduct.promiseError);
            }
        })
}

exports.getAllProduct = function (req, res, next) {
    var productInfo = {};
    Promise.resolve()
        .then(function () {
            return findInfo('hgetall', config.redis.productList, 'product', {active: true, deleted: false});
        })
        .then(function (info) {
            if (info && info.redis) {
                for(var i in info.redis){
                    productInfo[i] = JSON.parse(info.redis[i]);
                }
            } else if (info && info.mongo) {
                return Promise.each(info.mongo, function (pdts) {
                    var pushProduct = new filters.product.filterProductToDB(req, pdts);
                    productInfo[pdts.sequence] = pushProduct;
                    return redisclient.hset(config.redis.productList, pdts.sequence, JSON.stringify(pushProduct));
                })
            }
        })
        .then(function () {
            var resultObj = errInfo.success;
            resultObj.result = productInfo;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            console.log(error);
            return res.ext.json(errInfo.getAllProduct.promiseError);
        })
}

function getCondition(req, params) {
    var condition = {};
    for(var i in params){
        var cdt = params[i];
        switch (true){
            case /^name$/.test(i):
                if(req.ext.isArray(cdt)){
                    condition.name = {'$in': cdt};
                }else if(req.ext.isstring(cdt)){
                    var idArr = cdt.split(',');
                    condition.name = {'$in': idArr};
                }
                break;
            case /^code$/.test(i):
                if(req.ext.isArray(cdt)){
                    condition.code = {'$in': cdt};
                }else if(req.ext.isstring(cdt)){
                    var idArr = cdt.split(',');
                    condition.code = {'$in': idArr};
                }
                break;
            case /^keyword$/.test(i):
                if(req.ext.isArray(cdt)){
                    condition.keyword = {'$in': cdt};
                }else if(req.ext.isstring(cdt)){
                    var idArr = cdt.split(',');
                    condition.keyword = {'$in': idArr};
                }
                break;
            case /^siteId$/.test(i):
                if(req.ext.isArray(cdt)){
                    condition['priceList.siteId'] = {'$in': cdt};
                }else if(req.ext.isstring(cdt)){
                    var idArr = cdt.split(',');
                    condition['priceList.siteId'] = {'$in': idArr};
                }
                break;
            case /^sequence$/.test(i):
                if(req.ext.isArray(cdt)){
                    condition.sequence = {'$in': cdt};
                }else if(req.ext.isstring(cdt)){
                    var idArr = cdt.split(',');
                    condition.sequence = {'$in': idArr};
                }
                break;
            default:
                break;
        }
    }
    condition.active = true;
    condition.deleted = false;
    return condition;
}

exports.getProductByCondition = function (req, res, next) {
    var params = req.ext.params;
    if(!req.ext.checkExistProperty(params, params.condition)){
        return res.ext.json(errInfo.getProductByCondition.paramsError);
    }
    var condition = getCondition(req, params);
    Promise.resolve()
        .then(function () {
            return productModel.findAsync(condition);
        })
        .then(function (products) {
            var resultObj = errInfo.success;
            resultObj.result = {};
            resultObj.result.products = products;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            console.log(error);
            return res.ext.json(errInfo.getProductByCondition.promiseError);
        })
}
