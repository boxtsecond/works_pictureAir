var collectionname='user';//数据表
var mongoose=require('mongoose');
var db=require('../mongodb.js');


function fndob (val) {
    if (!val) return val;
    return (val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear();
}
function fndobname (val) {
    console.log(val)
    return "fndobname"
}
function fndobbindOn (val) {
    console.log("######",val)
    // return new Date(2018)
}

function obfuscate (cc) {
    return '****-****-****-' + cc.slice(cc.length-4, cc.length);
}
var personSchema = new mongoose.Schema({
    name: {
        first: String,
        last: {type:String,index:true,get: obfuscate}
    },
    str:{type:String,get: fndobname},
    aa: String,
    born: { type: Date, get: fndob},
    customerIds: [
        {
            code: {type: String, index: true}, //pp
            bindOn:{type:Date,get: obfuscate}
        }
    ],
    creditCardNumber: { type: String, get: obfuscate }
    });
// .get(function(arg) {
//     return "aaa";
// });

// personSchema.virtual('name.full').get(function(){
//     return this.name.first + ' ' + this.name.last;
// });

console.log(personSchema.path('name'))
var Person = db.model('p', personSchema);


// Person.insert({},function (err,dt) {
//     console.log(dt)
// })
// var p=new Person();
// p.name.first='first';
// p.name.last='last';
Person.findOne({},function (err,data) {
    console.log(err,data);
})
// p.save(function (err,data) {
//     console.log(err,data);
// })
// console.log(p)
//     p.save(function (err) {
//         console.log(err);
//     })
// create a document
// var bad = new Person();
// bad.save()


function dob (val) {
    if (!val) return val;
    return (val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear();
}

// defining within the schema
var bornSchema = new mongoose.Schema({ born: { type: Date, get: dob }})
var born = db.model('b', bornSchema);

// var b=new born();
// b.born=new Date();
// b.save(function (err) {
//     console.log(err);
// })
// // or by retreiving its SchemaType
// var s = new Schema({ born: Date })
// s.path('born').get(dob)