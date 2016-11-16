/**
 * Created by meteor on 15/7/28.
 */
//require('./global');
function getphotosize(photosizelist,size){
    var  result=null;
    for(var item in photosizelist){
        photosizeItem=photosizelist[item];
        if(photosizeItem.px.width==size.width&&photosizeItem.px.height==size.height)
            result=photosizeItem;
    }
    return result;
}
function  getphotoSizeInfo(languag,size,cbSize){
    async.waterfall([
        function(cb){
            var photosizePath=path.join(__dirname,'package');
            photosizePath=path.join(photosizePath,"photosize_"+languag+".json");
            fs.exists(photosizePath,function(exists){
                if(exists) cb(null,photosizePath);
                else  cb(404,photosizePath+ ' photosizePath is not exist');
            });
        },function(photosizePath,cb){
           fs.readJSONFile(photosizePath,'utf8',function(err,photosize){
               if(err) cb(404,photosizePath+'photosizefile is not exist');
               else cb(null,photosize);
           });
        },
        function(photosize,cb){
           // var result=getphotosize(photosize.size,size);
           //cb(result ? null:401,result);
            var photosizeItemResult=null;
            for(var item in photosize.size){
                 photosizeItem=photosize.size[item];
                if(photosizeItem.px.width==size.width&&photosizeItem.px.height==size.height)
                    photosizeItemResult=photosizeItem;
            }
            cb(photosizeItemResult ? null:404,photosizeItemResult);
        }
    ],function(err,result){
        cbSize(err ? null:result);
    });
}
module.exports={
    getphotoSizeInfo:getphotoSizeInfo
};
//
//getphotoSizeInfo('zh-cn',{width:3508,height:2480},function(size){
//    console.log(size)
//});
//getphotoSizeInfo('zh-cn',{width:1800,height:2400},function(size){
//    console.log(size)
//});