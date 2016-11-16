///**
// * Created by meteor on 15/8/4.
// */
var licenseMode=require('../Model/licenseModel.js');
var data={
    "userId":"55c02e6f50d4e7da0fe6a216",
    uuid:"bab58665f0e146e3b3d1e26f04682695",
    license:[
        {
            ieduuid:"b65f596be30644d59879116609db09e2",
            productcode:"7a1ac986765b466195322734a9f05f8b",
            platform:"windows",
            environment:{},
            environmentlast:{}
        }
    ],
    product:"9999999",
    dbpwd:"p1ctur3",
    //timeoverdue:"2015-9-9-19-29-41",
    //verifytime:"2015-8-3-17-28-41",
    //prompttime:"2015-8-6-17-28-41",
    credit:100,
    expired:false,
    lastloginTime:new Date() ,
    note:"",
    createdBy:"system",
    modifiedBy: "system",
    createtime:new Date() ,
    modifytime:new Date()
};
//var assetEntity=new licenseMode(data);
//assetEntity.insert(function(err){
//    console.log(err)
//});

 licenseMode.findFromuuid("bab58665f0e146e3b3d1e26f04682695",function(err,data){
     console.log(err,data);
       data[0].dbpwd='p1ctur3';
     licenseMode.UpdateById(data[0]._id,data[0],function(errr){
         console.log(errr);
     });
 });
