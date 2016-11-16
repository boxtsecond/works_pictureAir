 var parkmodel=require('../Model/parkMode.js');

 parkmodel.find({},function(err,data){

  console.log(err,data);
 });
 console.log(parkmodel);