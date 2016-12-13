
//
var mongoose=require('mongoose');
var db=require('../mongodb.js');
// function testGetter(value) {
//     return value + " test";
// }
//
// /**
//  * Schema
//  */
//
// var schema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true, get: testGetter }
// });
//
// // I have also tried this.
//
// schema.path('username').get(function (value, schemaType) {
//     return value + " test";
// });
// var a = db.model('a', schema);
// a.findOne({},function (err,data) {
//     console.log(err,data);
// })
// // var aa=new a();
// // aa.username="111";
// // aa.save(function (err) {
// //   console.log(err)
// // })
//


function dob (val) {
    // console.log(dob)
    // return "123456789";
    if (!val) return val;
    return (val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear();
}
function fndobname (val) {
    console.log(val)
    return "fndobname"
}
// defining within the schema
var schema = new mongoose.Schema({
    born: {  getters: [dob],type: Date },
    str:{type:String,get: fndobname},
})
// schema.virtual('aa');
// schema.virtual('aa').set(function(name){
//     var split = name.split(' ');
//     this.name=this.born;
// });
// schema.virtual('aa').get(function(name){
//     var split = name.split(' ');
//     this.name=this.born;
// });
//
// schema.pre('save',true,function(next,done){
//     console.log("save...111.")
//     next();
//     done();
// });
// schema.pre('init',function(next){
//
//     // this.born=new Date(2000,1,1).getTime();
//     // this.str="aaaaa";
//     next();
//     // return next;
// });
// schema.post('init',function(next){
//     console.log("init....",this)
//     // this.born=new Date(2000,1,1).getTime();
//     this.born=this.born.getTime();
//     this.str="aaaaa";
//     this.aa="aaaa";
//     // next();
//     // return next;
// });

// or by retreiving its SchemaType
// var schema = new mongoose.Schema({ born: Date })
// schema.path('born').get(dob)
// schema.get ("born",function (v) {
//
//     console.log(v)
// })
var a = db.model('a', schema);
//
// var aa=new a();
// aa.born=new Date();
// aa.save(function (err) {
//   console.log(err)
// })

a.findOne({},function (err,data) {
    console.log(err,data);
})


console.log()


