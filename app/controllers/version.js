/**
 * Created by meteor on 16/11/22.
 */
var rq=require('../rq');
var Promise=rq.Promise;
function  geIosUp(req,res) {
    Promise.resolve(req.ext.params).then(function (obj) {

    }).catch(function(err){
        res.ext.json(err);
    });
}
function  geAndroidUp(req,res) {

}

module.exports={
    geIosUp:geIosUp,
    geAndroidUp:geAndroidUp
};
