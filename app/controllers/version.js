/**
 * Created by meteor on 16/11/22.
 */
var rq=require('../rq');
var Promise=rq.Promise;
function  geIosUp(req,res) {
    Promise.resolve().then(function (err) {

    });



}
function  geAndroidUp(req,res) {

}

module.exports={
    geIosUp:geIosUp,
    geAndroidUp:geAndroidUp
};
