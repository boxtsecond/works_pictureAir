/**
 * Created by meteor on 16/12/10.
 */

var path=require("path"),url=require("url"),fs=require("fs-extra");
var Promise=require('bluebird');
Promise.promisifyAll(fs);
// console.log(fs);

function ConvertBase64TOBuffer(data_base64){
    return new Promise(function (resolve, reject) {
        if(data_base64&&data_base64.toString().trim()!=''){
            var base64Data =data_base64.toString().replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer(base64Data, 'base64');
            return resolve(dataBuffer);
        }else return reject(false);
    });
};

function WriteBase64Buffer(filepath,data_base64){
    return new Promise(function (resolve, reject) {
         // var writerStream = fs.createWriteStream(filepath);
         //  writerStream.write(data_base64,'UTF8');
         //  writerStream.end();
         //  writerStream.on('finish', function() {
         //   return resolve(filepath);
         //  });
         //
         //  writerStream.on('error', function(err){
         //      console.error(err);
         //    return reject(null);
         //  });
        return  fs.ensureDirAsync(path.dirname(filepath)).then(function (err) {
            return fs.writeFile(filepath,data_base64,function (err) {
                if(err) return reject(err);
                else return resolve(filepath)
            });
        });
    }).catch(function (err) {
          return Promise.reject(null);
    });
};

function writeStreamBase64(filepath,data_base64){
   return  ConvertBase64TOBuffer(data_base64).then(function (buffer) {
       return WriteBase64Buffer(filepath,buffer);
    }).then(function (err) {
       return Promise.resolve(err)
   }).catch(function (err) {
       return Promise.resolve(null);
   })
};
// writeStreamBase64(path.join(__dirname,"1113.jpg"),
//     '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')
//     .then(function (err) {
//         console.log("@@@",err)
//     }).catch(function (er) {
//     console.log(er)
// })
// var writeStream = fs.createWriteStream(path.join(__dirname,"11.jpg"));
// console.log(writeStream)

// console.log(fs.createWriteStream(new Buffer('',
//      'base64')));

// var  websiteStoragePath="/data/website";
function AesEn (cryptkey, iv, cleardata) {
    try {
        var crypto=require("crypto");
        var encipher = crypto.createCipheriv('aes-128-cbc', cryptkey, iv),
            encoded  = encipher.update(cleardata, 'utf8', 'hex');
        encoded += encipher.final( 'hex' );
        return encoded;
    }catch(err){
        console.log(err)
        return null;
    }
}
function AesDe(cryptkey, iv, secretdata) {
    try {
        var crypto=require("crypto");
        var  decipher = crypto.createDecipheriv('aes-128-cbc', cryptkey, iv),
            decoded = decipher.update(secretdata, 'hex', 'utf8');
        decoded += decipher.final('utf8');
        return decoded;
    }catch(err){
        return null;
    }
}
function enUrl(strUrl){
    var KEY="PICTUREAIR082816";
    var IV ="PICTUREAIR082816";
    return "media/"+AesEn(KEY,IV,"/"+strUrl);
}
function deUrl(strUrl){
    var KEY="PICTUREAIR082816";
    var IV ="PICTUREAIR082816";
    return AesDe(KEY,IV,strUrl)
}

function replaceAll(str,s1,s2){
    return str.replace(new RegExp(s1,"gm"),s2);
}
function convertPathToOnline(websiteStoragePath,websitePhotoStoragePath,siteId,opath) {
    var mpath=replaceAll(opath,'\\\\',"/");
    var objPath=path.join(websitePhotoStoragePath,siteId,mpath.substr(mpath.indexOf('/photos')+7));
    return {
        path:objPath,
        url:enUrl(url.format(objPath.substr(websiteStoragePath.length+1)))
    };
}

function convetphotoDataLineToOnLine(websiteStoragePath,websitePhotoStoragePath,photo) {
    this.siteId=photo.siteId;
    this.thumbnail=photo.thumbnail;
    this.engineInfo=photo.engineInfo;
    this.originalInfo=photo.originalInfo;
    var originalInfoObj=convertPathToOnline(websiteStoragePath,websitePhotoStoragePath, this.siteId,this.originalInfo.path);
    for (var item in this.thumbnail){
        var thumbnailitemObj=convertPathToOnline(websiteStoragePath,websitePhotoStoragePath, this.siteId,this.thumbnail[item].path);
        this.thumbnail[item].path=thumbnailitemObj.path;
        this.thumbnail[item].url=thumbnailitemObj.url;
    }
    this.originalInfo.path= originalInfoObj.path;
    this.originalInfo.url= originalInfoObj.url;
    this._id=photo._id;
    this.appServerIP=photo.appServerIP;
    this.storageServerIP=photo.storageServerIP;
    this.presetId=photo.presetId;
    this.photoId=photo.photoId;
    this.photoCode=photo.photoCode;
    this.rawFileName=photo.rawFileName;
    this.originalFileName=photo.originalFileName;
    this.name=photo.name;
    this.locationId=photo.locationId;
    this.shootOn=photo.shootOn;
    this.extractOn=photo.extractOn;
    this.parentId=photo.parentId;
    this.checkedTime=photo.checkedTime;
    this.tokenBy=photo.tokenBy;
    this.createdOn=photo.createdOn;
    this.modifiedOn=photo.modifiedOn;
    this.mimeType=photo.mimeType;
    this.modifiedBy=photo.modifiedBy;
    this.createdBy=photo.createdBy;
    this.photoStatus=photo.photoStatus;
    this.photoSource=photo.photoSource;
    this.allowDownload=photo.allowDownload;
    this.isVip=photo.isVip;
    this.isFree=photo.isFree;
    this.disabled=photo.disabled;
    this.thumbnailType=photo.thumbnailType;
    this.editHistorys=photo.editHistorys;
    this.tagBy=photo.tagBy;
    this.comments=photo.comments;
    this.orderHistory=photo.orderHistory;
    this.favoriteCount=photo.favoriteCount;
    this.likeCount=photo.likeCount;
    this.editCount=photo.editCount;
    this.shareInfo=photo.shareInfo;
    this.visitedCount=photo.visitedCount;
    this.downloadCount=photo.downloadCount;
    this.userIds=photo.userIds;
    this.customerIds=photo.customerIds;
    this.mobileEditActive=photo.mobileEditActive;
    this.presetName=photo.presetName;
    this.hasSynced=photo.hasSynced;
    this.userId=photo.userId;
    this.pacId=photo.pacId;
    this.encounter=photo.encounter;
    this.justForOriginal=photo.justForOriginal;
    this.receivedOn=photo.receivedOn;
    this.uploadCount=photo.uploadCount;
    this.isUpload=photo.isUpload;
    this.__v=photo.__v;
    this.faces=photo.faces;

    // "photo_id" : "584b9b64b7cc322c24080632",
    // "targetPoint" : "",
    //     "bundleWithPPP" : false,
    //     "videoStatus" : "init",
}






module.exports={
    convetphotoDataLineToOnLine:convetphotoDataLineToOnLine,
    writeStreamBase64:writeStreamBase64
}