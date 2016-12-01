

var fs = require('fs');
var Promise = require('bluebird');
var readFileAsync = Promise.promisify(fs.readFile)


//var readFileAsync = function(name){
//    return new Promise(function(resolve, reject){
//        fs.readFile(name, function(err, data){
//            if(err) {
//                reject(err);
//            } else {
//                resolve(data);
//            }
//        });
//    })
//};
readFileAsync('../config.json')
    .then(function(data1){
        console.log(data1);
        return readFileAsync('2.txt');
    },function(err){
        console.log(err);
    })
    .then(function(data2){
        console.log(data2);
    },function(err){
        console.log(err);
    })
    .catch(function(err){
        console.error(err)
    })