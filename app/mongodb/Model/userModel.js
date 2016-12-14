var collectionname='user';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');
var SchemaInfo=require('../Schema/'+collectionname+'Schema.js');
var Schema = new mongoose.Schema(SchemaInfo.config,SchemaInfo.options);
Schema.statics.updateUserFromId = function(id,pwd, callback) {
    return this.model(collectionname).find({_id:id},{$set: {password: pwd}}, callback);
}
//##################实例方法##################

Schema.virtual('name1').get(function () {
    return this.name.first + ' ' + this.name.last;
});
// Schema.virtual('name.full').get(function(){
//     return this.name=">>>>"
//     // console.log('phone_number = ' +this.phone_number)
//     // if(this.phone_number == undefined | this.invite_code == undefined){
//     //     return false;
//     // }
//     // return this.invite_code.length >= 2 && this.phone_number > 0
// });


Schema.methods.insert= function(callback) {
    return this.save(callback);
};
// Schema.post('save',function(next){
//     console.log("save....")
//     //next();
//     return next;
// });
// Schema.pre('save',true,function(next,done){
//     console.log("save...111.")
//      next();
//      done();
// });
// Schema.post('init',function(next){
//     console.log("init....")
//     //next();
//     return next;
// });
var model=db.model(collectionname, Schema);
module.exports=model;

// var Promise=require('bluebird');
// model.find({},function (err,data) {
//     Promise.each(data,function (item,index) {
//         if(!item.userPP){
//             model.update({_id:item._id},
//                 {
//                     "$set":{
//                         "userPP":("PWUP" + item._id.toString().substr(12, 12).toUpperCase())
//                        },
//                     "$push":{"customerIds":{
//                         code:("PWUP" + item._id.toString().substr(12, 12).toUpperCase()),
//                         "bindOn":new Date()
//                     }}
//                 },function(err){
//
//                 });
//               console.log(item,index)
//         }
//         // console.log(item,index)
//     })
//
// })
