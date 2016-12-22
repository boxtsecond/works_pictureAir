/**
 * Created by xueting-bo on 16/12/22.
 */

var fs_extra = require('fs-extra');
var redisclient=require('../redis/redis').redis;

//先从redis缓存中找，找不到再从mongo中找
//audience --- redis's key, modelName --- mongo's model name, condition --- mongo's find condition
function findInfo(audience, modelName, condition) {
    return Promise.resolve()
        .then(function () {
            if(audience){
                return redisclient.get('access_token:'+audience)
                    .then(function (info) {
                        if(info){
                            return {redis:JSON.parse(info)};
                        }else {
                            return false;
                        }
                    })
            }else {
                return false;
            }
        })
        .then(function (find) {
            if(!find){
                var mongoModel = requireModel(modelName);
                if(mongoModel){
                    return mongoModel.findAsync(condition)
                        .then(function (info) {
                            return {mongo: info};
                        })
                }else {
                    return false;
                }
            }else {
                return find;
            }
        })
        .catch(function (error) {
            console.log(error);
            return false;
        })
}

function requireModel(modelName) {
    var _dirname = process.cwd();
    var modelDir = path.join(_dirname, '/mongodb/Model', modelName + 'Model.js');
    var exists = fs_extra.existsSync(modelDir);
    return exists ? require(modelDir) : null;
}

module.exports={
    findInfo:findInfo
};
