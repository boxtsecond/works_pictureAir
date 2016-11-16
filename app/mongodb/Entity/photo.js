function photoitemObj(engineConfig,actioninfo,tempLayersJsonObjObj,photoStatus,actionitem){
    var thumbnails=engineConfig.thumbnails;
    var thumbnailSeting=engineConfig.thumbnailSeting;
    var exif=actioninfo.newexiftdata,photo=tempLayersJsonObjObj.photo;
    var photoFilanme=actioninfo.rawfilename;
    //console.log("actionitem",actionitem);
    if(actionitem){
        //photoFilanme=path.basename(photo.path, path.extname(photo.path)) +"_"+actionitem+  path.extname(photo.path);
        photoFilanme=path.basename(photo.path);
        photoFilanme=path.basename(photo.path, path.extname(photo.path)) + path.extname(photo.path);
    }
    this.appServerIP=engineConfig.config.sys.appServerIP;
    this.storageServerIP=engineConfig.config.sys.storageServerIP;
    this.faces={
        "faces" : [
            {
                "height" : 244,
                "width" : 244,
                "y" : 492,
                "x" : 480
            },
            {
                "width" : 200,
                "height" : 200,
                "y" : 391,
                "x" : 1330
            }
        ],
        "image" : [
            {
                "height" : 1800,
                "width" : 2400
            }
        ]
    };
    // console.log(tempLayersJsonObjObj.presetId,tempLayersJsonObjObj.presetName,actionitem)
    this.presetId=tempLayersJsonObjObj.presetId;
    this.presetName=tempLayersJsonObjObj.presetName;
    // if(!actionitem) this.presetName=actionitem;
    this.siteId=engineConfig.config.sys.siteId.toString().toUpperCase();
    this.photoId=engineConfig.config.sys.siteId  +engineConfig.config.sys.siteTerminalCode+ actioninfo.ImagedataString;
    this.photoId=this.photoId.toString().toUpperCase();
    this.photoCode=this.photoId;
    //console.log("...",engineConfig.config.sys.siteId+engineConfig.config.sys.siteTerminalCode + actioninfo.ImagedataString)
    //this.photoCode=getphotocode(photoId);
    //console.error(this.photoCode);
    this.rawFileName=actioninfo.rawfilename;
    this.originalFileName=photoFilanme.toString().toLocaleLowerCase();
    //this.rawFileName=photoFilanme;
    this.name= photoFilanme;
    this.locationId=util.getLocationIdFromFilename(photoFilanme);
    this.locationId= this.locationId.toString().toLowerCase();
    this.shootOn=new Date(1990,1,1) ;
    this.extractOn=  new Date();
    //console.log('photo',photo);
    var photofilaPath=path.join(actioninfo.photos_PrefixString,photoFilanme);
    this.originalInfo= {
        originalName:photoFilanme,
        path:photofilaPath,
        width: photo.width,
        height:photo.height,
        url:util.enUrl(url.format(photofilaPath.substring(actioninfo.photosServerPath.toString().length + 1)))
    };
    this.editHistorys=[];//originalInfo thumbnail
    //this.thumbnailType= [ "x1024", "x512","x128"];
    this.thumbnailType= [];
    this.thumbnail= {};
    this.GPS=exif.GPS;
    //this.GPS= {
    //    ImageUniqueID: '',
    //    GPSInfo: '',
    //    GPSLatitudeRef: '',
    //    GPSLatitude: '',
    //    GPSLongitudeRef: '',
    //    GPSLongitude: '',
    //    GPSAltitudeRef: '',
    //    GPSAltitude: '',
    //    GPSTimeStamp: '',
    //    GPSDateStamp: ''
    //};
    this.parentId= '';
    this.disabled= engineConfig.config.sys.disabledPhotos;
    this.checkedTime=new Date(1990,1,1);
    if(photoStatus=="checked") {
        this.checkedTime=new Date();
        this.disabled=false;
    }
    if(photoStatus=="unchecked") this.disabled=true;
    this.isFree= false;
    this.isVip= false;
    this.allowDownload= false;
    this.photoSource="engine";
    this.engineInfo={
        chroma:false,
        width: exif.size.width,
        height: exif.size.height,
        rawPath: actioninfo.rawBackPath,
        rawUrl:'',
        imageJson:'',
        imageJsonUrl:'',
        originalPath: actioninfo.rawBackPath,
        originalUrl:'',
        ticketNum: '',
        ticketPrefix: actioninfo.imgPrefix.toString().toUpperCase(),
        Orientation:"-1",
        deleted: false,
        rawthumbnail: {},//raw 文件夹
        originalthumbnail:  {}// original backup 文件夹
    };
    if(actioninfo.state==1){
        this.engineInfo.chroma=true;
    }
    this.tokenBy= '';
    this.photoStatus=photoStatus;
    this.createdOn= new Date();
    this.createdBy= 'engine';
    this.modifiedBy= 'engine';
    this.modifiedOn= new Date();
    if(util.haveOwnproperty(exif,"Orientation")) this.engineInfo.Orientation=exif.Orientation;
    // console.log(this.engineInfo.Orientation.toString());
    if(this.engineInfo.Orientation.toString().trim()=="6"||this.engineInfo.Orientation.toString().trim()=="8"){
        if(this.originalInfo.width>this.originalInfo.height){
            this.originalInfo.width=tempLayersJsonObjObj.photo.height;
            this.originalInfo.height=tempLayersJsonObjObj.photo.width;
        }
    }
    if(util.haveOwnproperty(exif,'location'))
        this.location= exif.location;
    this.shootOn=actioninfo.shootOnTime;
    this.GPS = exif.location;
    //console.log(thumbnailSeting,"thumbnailSeting"); 
    var TempthumbnailWH=null,TempthumbnailWH2;
    for (var thumbnailSetingitem in thumbnailSeting) {
        for (var item in thumbnails) {
            if(thumbnailSeting[thumbnailSetingitem]==thumbnails[item].width){
                //  console.log(thumbnails[item].width,"thumbnailSetingitem");
                // TthumbnailSetingitem++; 
                if(item>0)TempthumbnailWH2=TempthumbnailWH;
                TempthumbnailWH=thumbnailSetingitem;

                var valueitem =thumbnailSetingitem;
                this.thumbnailType.push(valueitem);
                this.thumbnail[valueitem] = {};
                //this.thumbnail[valueitem] = {};
                thumbnails[item].path = path.join(actioninfo.thumbnails_PrefixString, thumbnails[item].saveFolder.toString(), photoFilanme);
                //if (thumbnails[item].type.toString().toLowerCase() == "preview")   this.preview_url = url.format(thumbnails[item].path.substring(actioninfo.photosServerPath.toString().length + 1));
                //if (thumbnails[item].type.toString().toLowerCase() == "thumbnail")   this.thumbnail_url = url.format(thumbnails[item].path.substring(actioninfo.photosServerPath.toString().length + 1));
                this.thumbnail[valueitem].path = thumbnails[item].path;
                this.thumbnail[valueitem].url =  util.enUrl(url.format(thumbnails[item].path.substring(actioninfo.photosServerPath.toString().length + 1)));
                if(this.originalInfo.width>=this.originalInfo.height){
                    var resize_thumbnail={
                        "width":this.originalInfo.width,
                        "height":this.originalInfo.height
                    }
                    if(item>0&&TempthumbnailWH2){
                        resize_thumbnail.width=this.thumbnail[TempthumbnailWH2].width;
                        resize_thumbnail.height=this.thumbnail[TempthumbnailWH2].height;
                    }
                    var thumnailwidth=thumbnails[item].width,thumnailheight=enginelib.resizeWHthumbnailsHeight(thumbnails[item].width,resize_thumbnail.width,resize_thumbnail.height);
                    this.thumbnail[valueitem].width =thumnailwidth ;
                    this.thumbnail[valueitem].height = thumnailheight;
                }else{
                    var resize_thumbnail={
                        "width":this.originalInfo.width,
                        "height":this.originalInfo.height
                    }
                    if(item>0&&TempthumbnailWH2){
                        resize_thumbnail.width=this.thumbnail[TempthumbnailWH2].width;
                        resize_thumbnail.height=this.thumbnail[TempthumbnailWH2].height;
                    }
                    var thumnailwidth=thumbnails[item].width;
                    this.thumbnail[valueitem].height = thumnailwidth;
                    this.thumbnail[valueitem].width =enginelib.resizeWHthumbnailsHeight(thumnailwidth,resize_thumbnail.height,resize_thumbnail.width) ;
                }
            }
        }
    }
    for (var thumbnailTypeItem in this.thumbnailType) {
        var typeItem=this.thumbnailType[thumbnailTypeItem];
        var rawthumbnailPath=path.join(actioninfo.raw_PrefixString, thumbnails[item].saveFolder.toString(), actioninfo.rawfilename);
        this.engineInfo.rawthumbnail[typeItem] = {
            path:rawthumbnailPath,
            url: util.enUrl(url.format(rawthumbnailPath.substring(actioninfo.photosServerPath.toString().length + 1)))
        };
        var originalthumbnailPath=path.join(actioninfo.original_PrefixString, thumbnails[item].saveFolder.toString(), actioninfo.rawfilename);
        this.engineInfo.originalthumbnail[typeItem] = {
            path:originalthumbnailPath,
            url: util.enUrl(url.format(originalthumbnailPath.substring(actioninfo.photosServerPath.toString().length + 1)))
        };
    }
    //console.log(this.engineInfo);
    var cid = require('objectid')();
    this._id = cid;
    this.parentId = cid;
    var toimagepath=enginelib.getJsonPathFromimagesourcePath(tempLayersJsonObjObj.photo.path);
    var engininfoRawURL = path.join(engineConfig.folderPrefix.rawPath, '..');
    var engininfoBackupURL = path.join(engineConfig.folderPrefix.originalPath, '..');
    if((engininfoRawURL.charAt(engininfoRawURL.length-1)=="\\")==true||(engininfoRawURL.charAt(engininfoRawURL.length-1)=="/")==true){
        engininfoRawURL=engininfoRawURL.toString().substring(0,engininfoRawURL.length-1);
    }
    if((engininfoBackupURL.charAt(engininfoBackupURL.length-1)=="\\")==true||(engininfoBackupURL.charAt(engininfoBackupURL.length-1)=="/")==true){
        engininfoBackupURL=engininfoBackupURL.toString().substring(0,engininfoBackupURL.length-1);
    }
    this.engineInfo.rawUrl = util.enUrl(url.format(actioninfo.rawBackPath.substring(engininfoRawURL.toString().length+1)));
    this.engineInfo.originalPath = actioninfo.BackPath;
    this.engineInfo.originalUrl = util.enUrl(url.format(actioninfo.BackPath.toString().substring(engininfoBackupURL.toString().length+1)));
    this.engineInfo.imageJson = toimagepath;
    this.engineInfo.imageJsonUrl =util.enUrl(url.format(toimagepath.substring(actioninfo.photosServerPath.toString().length +1)));
    if(photoFilanme.toString().indexOf('-')>0){
        this.engineInfo.ticketNum=photoFilanme.toString().substring(photoFilanme.toString().lastIndexOf('-')+1,photoFilanme.toString().lastIndexOf('.'));
    }else
        this.engineInfo.ticketNum=photoFilanme.toString().substring(photoFilanme.toString().lastIndexOf('_')+1,photoFilanme.toString().lastIndexOf('.'));

    //console.error(this);
}



function insertCopyToNewPhotoItem(engineConfig,oldPhotoitem){
    this.appServerIP=appServerIP
    this.storageServerIP
    this.faces
    this.presetId
    this.presetName
    this.siteId
    this.photoId
    this.photoCode
    this.rawFileName
    this.originalFileName
    this.name
    this.locationId
    this.shootOn
    this.extractOn
    this.thumbnail
    this.parentId
    this.checkedTime
    this.tokenBy
    this.createdOn=new Date();
    this.modifiedOn
    this.modifiedBy
    this.createdBy='airditor'
    this.photoStatus
    this.photoSource
    this.engineInfo
    this.allowDownload
    this.isVip
    this.isFree
    this.disabled
    this.thumbnailType
    this.editHistorys
    this.originalInfo
    this.tagBy



}