////var fs = require("fs");
////Promise.promisifyAll(fs);
////// Now you can use fs as if it was designed to use bluebird promises from the beginning
////
////fs.readFileAsync("file.js", "utf8").then(function(err){
////    // console.log(err)
////},function(err){
////    return err;
////    //console.log(err)
////}).then(function(err){
////    console.log('...',err)
////})
////
//
////
////function async_error() {
////    setTimeout(function(){
////        throw new Error("Error");
////    },10)
////}
////
////function run() {
////    try {
////        async_error();
////    } catch (err) {
////        console.log(err);
////    }
////}
////
////run();
////
////process.on('uncaughtException',function(err){
//// console.log(err)
////})
//var Promise=require('bluebird')
//function test(p){
//    return new Promise(function (resolve, reject) {
//        resolve("a");
//    });
//}
//
//
//test('1').then(function(err){
//    return  Promise.resolve(err);
//}).then(function(er){
//    //console.log("aaaa",er)
//    return test('2').then(function(err){
//          return  Promise.resolve("bbbb"+err);
//      })
//
//    //return  Promise.resolve("bbbb"+er);
//}).then(function(er){
//    console.log("111",er)
//})
//    .catch(function (err) {
//    reject({status: 501, msg:  "db error"});
//});
//http://www.cnblogs.com/benwu/articles/5705604.html
//var jwt = require('jsonwebtoken');
////var token=jwt.sign({
////    data: 'foobar'
////}, 'secret', { expiresIn: '1h' });
////console.log(token)
////var token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'secret');
////console.log(token)
////var decoded = jwt.verify(token, 'shhhhh');
////console.log(decoded) // bar
//
// //verify a token symmetric
//jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNDc5OTcwNDcyLCJleHAiOjE0Nzk5NzQwNzJ9.pdq3i1Ck5xZukiw0x3QvP9_rmL-NsdzofqPsair8gz4", 'secret', function(err, decoded) {
//    console.log(decoded) // bar
//});
var fs=require("fs");
var jwt = require('jsonwebtoken');
var certPrivate = fs.readFileSync('../private.key');  // get private key
var certPublic = fs.readFileSync('../public.pem');  // get public key
var acctoken={
    foo: 'bar',
    jwtid:"id",//md5(username)
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
}
var token = jwt.sign(acctoken, certPrivate, { algorithm: 'RS256'},{ expiresIn: '7d' });
console.log(token);
// sign asynchronously
//jwt.sign({ foo: 'bar' }, certPrivate, { algorithm: 'RS256' }, function(err, token) {
//    console.log(token);
//});
//access_token
jwt.verify(token, certPublic,function(err, decoded) {
    console.log(decoded) // bar
});
////console.log(cert)
//jwt.verify({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, cert, function(err, decoded) {
//    console.log(decoded.foo) // bar
//});

//console.log(new Date(1479975822))


