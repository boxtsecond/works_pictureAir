/**
 * Created by xueting-bo on 16/11/20.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;
var parkModel = require('../mongodb/Model/parkModel');
var common = require('../tools/common.js');

exports.getAllLocations = function (req, res, next) {
    var condition = {isDel: false, active: true};
    var params = req.ext.params;
    /*if(!req.ext.haveOwnproperty(params, ['parkId']) || !(/^[0-9a-fA-F]{24}$/).test(params.parkId)){
        return res.ext.json(errInfo.getAllLocations.paramsError);
    }*/
    condition._id = params.parkId;

    var resultObj = errInfo.success;
    Promise.resolve()
        .then(function () {
            return getLocationsByCondition(condition);
        })
        .then(function (locations) {
            if(locations){
                for(var i=0;i<locations.length;i++){
                    locations[i]._doc.locations=locations[i].locations;
                    for(var j= 0;j<locations[i].locations.length;j++){
                        locations[i]._doc.locations[j]._doc.subjects=locations[i].locations[j].locations;
                    }
                }
            }
            return locations;
        })
        .then(function (result) {
            resultObj.result.lands = result;
            return res.ext.json(resultObj);
        })
        .catch(function (error) {
            console.log(error);
            if(error.status){
                return res.ext.json(JSON.parse(error.message));
            }else {
                return res.ext.json(errInfo.getAllLocations.APIError);
            }
        })
}

exports.getLocationsByConditions = getLocationsByCondition;

function getLocationsByCondition(condition) {
    var locations=[];
    return parkModel.findAsync(condition, {_id: 0, 'locations': 1})
        .then(function (list) {
            if(list && list.length > 0){
                list.forEach(function(park){
                    if(park){
                        if (park.locations && park.locations.length > 0) {
                            locations=locations.concat(getChildren("0",park.locations
                                ,{locations:[],childrenIds:[]}));
                        }
                    }
                })
                return locations;
            }else {
                throw new newError(JSON.stringify(errInfo.success));
            }
        })
        .then(function (locations) {
            //升序排序
            locations = locations.sort(function (a, b) {
                if (a.orderNo > b.orderNo) {
                    return 1;
                }
                if (a.orderNo < b.orderNo) {
                    return -1;
                }
                return 0;
            })
            return locations;
        })
        .catch(function (err) {
            if(err.name == 'newError'){
                throw err;
            }
            return Promise.reject(errInfo.getAllLocations.parkError);
        });
}

function getChildren(parentId,data,results){

    var list=common.getListByPropertiesFromArray([{"field":"parentId","value":parentId},{"field":"isDel","value":false}],data);
    list.forEach(function(location){
        location.locations=[];
        location.childrenIds=[];
        results.locations.push(location);
        results.childrenIds.push(location.locationId);
        getChildren(location._id.toString(),data,location);
    })

    return results.locations;
}
