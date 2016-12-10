/**
 * Created by meteor on 16/12/9.
 */
var rq=require('../rq');
var errInfo=rq.resInfo.errInfo;
var Promise=rq.Promise;


function filterSyncFileDataParams(req){
    return new Promise(function (resolve, reject) {
        var result={
            params:req.ext.params,
            //visitTime: new Date(),
            lg:'en-US',
            uuid:rq.uuid.v1().trim().replace(/-/g,''),
            //visitIP:req.ext.ip,
            t:0,
            appid:""
        };
        if(!req.ext.haveOwnproperty(result.params,'appid')){
            return reject(errInfo.authParamAppidError);
        }else {
            result.appid=result.params.appid;
            if(req.ext.haveOwnproperty(result.params,'uuid')) result.uuid=result.params.uuid;
            if(req.ext.haveOwnproperty(result.params,'t')) result.t=result.params.t;
            if(req.ext.haveOwnproperty(result.params,'lg')) result.lg=result.params.lg;
            return  resolve(result);
        }
    });
};
function  syncFileData() {

}

function syncFile() {

}

function syncData() {

}

module.exports={
    syncFileData:syncFileData,
    syncFile:syncFile,
    syncData:syncData
}