///**
// * Created by meteor on 15/6/5.
// */
///*var entity_engine={
//    platformType:'engine',// engine airditor android ios web
//    assets:[
//        {
//            type:'background',//frame,clipart,background,font
//            path:'D:\\website\\assets\\engine\\background\\Disney\\GS01.jpg',
//            url:'background/Disney/GS01.jpg',
//            id:'GS01',
//            assetName:'GS01',//图片简介
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        },
//        {
//            type:'background',//frame,clipart,background,font
//            path:'D:\\website\\assets\\engine\\background\\Disney\\GS02.jpg',
//            url:'assets/engine/background/Disney/GS02.jpg',
//            id:'GS02',
//            assetName:'GS02',//图片简介
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        },
//        {
//            type:'background',//frame,clipart,background,font
//            path:'D:\\website\\assets\\engine\\background\\Disney\\GS02.jpg',
//            url:'assets/engine/background/Disney/GS02.jpg',
//            id:'GS02',
//            assetName:'GS02',//图片简介
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        },
//        ///
//        {
//            type:'background',//frame,clipart,background,font
//            path:'D:\\website\\assets\\engine\\background\\background.png',
//            url:'assets/engine/background/background.png',
//            id:'Background',
//            assetName:'Background',//图片简介
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        },
//        {
//            type:'background',//frame,clipart,background,font
//            path:'D:\\website\\assets\\engine\\background\\background_grandmayan.png',
//            url:'assets/engine/background/background_grandmayan.png',
//            id:'Grandmayan',
//            assetName:'Grandmayan',//图片简介
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'background',//frame,clipart,background,font
//            path:'D:\\website\\assets\\engine\\background\\background_stone.png',
//            url:'assets/engine/background/background_stone.png',
//            id:'Stone',
//            assetName:'Stone',//图片简介
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//         ,{
//            type:'background',//frame,clipart,background,font
//            path:'D:\\website\\assets\\engine\\background\\background_wood.png',
//            url:'assets/engine/background/background_wood.png',
//            id:'Wood',
//            assetName:'Wood',//图片简介
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        /// cliparts
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Ariel',
//            assetName:'Ariel',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\crown\\Ariel.png',
//            url:'assets/engine/cliparts/crown/Ariel.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Aurora',
//            assetName:'Aurora',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\crown\\Aurora.png',
//            url:'assets/engine/cliparts/crown/Aurora.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Belle',
//            assetName:'Belle',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\crown\\Belle.png',
//            url:'assets/engine/cliparts/crown/Belle.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Cinderella',
//            assetName:'Cinderella',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\crown\\Cinderella.png',
//            url:'assets/engine/cliparts/crown/Cinderella.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Jasmine',
//            assetName:'Jasmine',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\crown\\Jasmine.png',
//            url:'assets/engine/cliparts/crown/Jasmine.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Rapunzel',
//            assetName:'Rapunzel',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\crown\\Rapunzel.png',
//            url:'assets/engine/cliparts/crown/Rapunzel.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'SnowWhite',
//            assetName:'SnowWhite',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\crown\\SnowWhite.png',
//            url:'assets/engine/cliparts/crown/SnowWhite.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Tiana',
//            assetName:'Tiana',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\crown\\Tiana.png',
//            url:'assets/engine/cliparts/crown/Tiana.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Alien1',
//            assetName:'Alien1',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\dicai\\Alien1.png',
//            url:'assets/engine/cliparts/dicai/Alien1.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Alien2',
//            assetName:'Alien2',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\dicai\\Alien2.png',
//            url:'assets/engine/cliparts/dicai/Alien2.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Buzz',
//            assetName:'Buzz',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\dicai\\Buzz.png',
//            url:'assets/engine/cliparts/dicai/Buzz.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Duffy',
//            assetName:'Duffy',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\dicai\\Duffy.png',
//            url:'assets/engine/cliparts/dicai/Duffy.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'FairyGodmother',
//            assetName:'FairyGodmother',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\dicai\\FairyGodmother.png',
//            url:'assets/engine/cliparts/dicai/FairyGodmother.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Stitch',
//            assetName:'Stitch',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\dicai\\Stitch.png',
//            url:'assets/engine/cliparts/dicai/Stitch.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Baloon',
//            assetName:'Baloon',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\clipart_balloon.png',
//            url:'assets/engine/cliparts/clipart_balloon.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Stars',
//            assetName:'Stars',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\clipart_stars.png',
//            url:'assets/engine/cliparts/clipart_stars.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'cliparts',//frame,clipart,background,font
//            id:'Strawberry Cake',
//            assetName:'Strawberry Cake',//图片简介
//            path:'D:\\website\\assets\\engine\\cliparts\\clipart_strawberrycake.png',
//            url:'assets/engine/cliparts/clipart_strawberrycake.png',
//            width:500,
//            height:500,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//    /// font
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'1',
//            assetName:'1',//图片简介
//            font:"Arial",
//            path:'D:\\website\\assets\\engine\\font\\Arial.ttf',
//            url:'assets/engine/font/Arial.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'2',
//            assetName:'2',//图片简介
//            font:"Arial Black",
//            path:'D:\\website\\assets\\engine\\font\\Arial Black.ttf',
//            url:'assets/engine/font/Arial Black.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'3',
//            assetName:'3',//图片简介
//            font:"Calibri",
//            path:'D:\\website\\assets\\engine\\font\\Calibri.ttf',
//            url:'assets/engine/font/Calibri.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'3',
//            assetName:'3',//图片简介
//            font:"Calibri",
//            path:'D:\\website\\assets\\engine\\font\\Calibri.ttf',
//            url:'assets/engine/font/Calibri.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'4',
//            assetName:'4',//图片简介
//            font:"Calibri",
//            path:'D:\\website\\assets\\engine\\font\\Comic Sans MS.ttf',
//            url:'assets/engine/font/Comic Sans MS.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'5',
//            assetName:'5',//图片简介
//            font:"Curier New",
//            path:'D:\\website\\assets\\engine\\font\\Curier New.ttf',
//            url:'assets/engine/font/Curier New.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'6',
//            assetName:'6',//图片简介
//            font:"Georgia",
//            path:'D:\\website\\assets\\engine\\font\\Georgia.ttf',
//            url:'assets/engine/font/Georgia.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'7',
//            assetName:'7',//图片简介
//            font:"Fantasy",
//            path:'D:\\website\\assets\\engine\\font\\Fantasy.ttf',
//            url:'assets/engine/font/Fantasy.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'8',
//            assetName:'8',//图片简介
//            font:"Impact",
//            path:'D:\\website\\assets\\engine\\font\\Impact.ttf',
//            url:'assets/engine/font/Impact.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'9',
//            assetName:'9',//图片简介
//            font:"Lucida Console",
//            path:'D:\\website\\assets\\engine\\font\\Lucida Console.ttf',
//            url:'assets/engine/font/Lucida Console.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'10',
//            assetName:'10',//图片简介
//            font:"Lucida Sand Unicode",
//            path:'D:\\website\\assets\\engine\\font\\Lucida Sand Unicode.ttf',
//            url:'assets/engine/font/Lucida Sand Unicode.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'11',
//            assetName:'11',//图片简介
//            font:"Lucida Sand Unicode",
//            path:'D:\\website\\assets\\engine\\font\\Tahoma.ttf',
//            url:'assets/engine/font/Tahoma.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'12',
//            assetName:'12',//图片简介
//            font:"Times New Roman",
//            path:'D:\\website\\assets\\engine\\font\\Times New Roman.ttf',
//            url:'assets/engine/font/Times New Roman.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'13',
//            assetName:'13',//图片简介
//            font:"Trebuchet MS",
//            path:'D:\\website\\assets\\engine\\font\\Trebuchet MS.ttf',
//            url:'assets/engine/font/Trebuchet MS.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'13',
//            assetName:'13',//图片简介
//            font:"Trebuchet MS",
//            path:'D:\\website\\assets\\engine\\font\\Trebuchet MS.ttf',
//            url:'assets/engine/font/Trebuchet MS.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'font',//frame,clipart,background,font
//            id:'14',
//            assetName:'14',//图片简介
//            font:"Verdana",
//            path:'D:\\website\\assets\\engine\\font\\Verdana.ttf',
//            url:'assets/engine/font/Verdana.ttf',
//            width:0,
//            height:0,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        //frame
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'BuzzRide',
//            assetName:'BuzzRide',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\Disney\\BuzzRide.png',
//            url:'assets/engine/frame/Disney/BuzzRide.png',
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'princess01',
//            assetName:'princess01',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\Disney\\princess01.png',
//            url:'assets/engine/frame/Disney/princess01.png',
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'princess02',
//            assetName:'princess02',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\Disney\\princess02.png',
//            url:'assets/engine/frame/Disney/princess02.png',
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'Roving',
//            assetName:'Roving',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\Disney\\Roving.png',
//            url:'assets/engine/frame/Disney/Roving.png',
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'TronRide',
//            assetName:'TronRide',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\Disney\\TronRide.png',
//            url:'assets/engine/frame/Disney/TronRide.png',
//            width:2400,
//            height:1800,
//            locationId:'',//location的_id
//            active:true,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'Grainy',
//            assetName:'Grainy',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\frame_grainy.png',
//            url:'assets/engine/frame/frame_grainy.png',
//            width:1024,
//            height:768,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'Flower 1',
//            assetName:'Flower 1',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\frame_flower_1.png',
//            url:'assets/engine/frame/frame_flower_1.png',
//            width:1024,
//            height:768,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'Flower 2',
//            assetName:'Flower 2',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\frame_flower_2.png',
//            url:'assets/engine/frame/frame_flower_2.png',
//            width:1024,
//            height:768,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'Flower 3',
//            assetName:'Flower 3',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\frame_flower_3.png',
//            url:'assets/engine/frame/frame_flower_3.png',
//            width:1024,
//            height:768,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//        ,{
//            type:'frame',//frame,clipart,background,font
//            id:'Wedding',
//            assetName:'Wedding',//图片简介
//            font:"",
//            path:'D:\\website\\assets\\engine\\frame\\frame_wedding.png',
//            url:'assets/engine/frame/frame_wedding.png',
//            width:1024,
//            height:768,
//            locationId:'',//location的_id
//            active:false,//是否有效
//            thumbnailType: [], //缩略图类型
//            thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//            note:"",//图片简介
//            createdBy: 'meteor',//创建者ID
//            modifiedBy: 'meteor',
//            createtime: new Date() ,
//            modifytime: new Date()
//        }
//    ]
//};*/
//
//
//var entity_engine={
//    platformType:'mobile',// engine airditor
//     assets:[
//         {
//             type:'font',//frame,clipart,background,font
//             id:'Arial',
//             assetName:'Arial',//图片简介
//             font:"Arial",
//             path:'D:\\website\\assets\\mobile\\font\\Arial.ttf',
//             url:'assets/mobile/font/Arial.ttf',
//             width:0,
//             height:0,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [], //缩略图类型
//             thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         },
//         {
//             type:'frame',//frame,clipart,background,font
//             path:'D:\\website\\assets\\mobile\\frame\\love.png',
//             url:'assets/mobile/frame/love.png',
//             id:'love',
//             assetName:'love',//图片简介
//             width:2400,
//             height:1800,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [100,300], //缩略图类型
//             thumbnail: {
//                 "x100" : {
//                     "height" : 100,
//                     "width" : 75,
//                     "url" : "assets/mobile/frame/thumbnail/100/love.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\100\\love.png"
//                 },
//                 "x300" : {
//                     "height" : 300,
//                     "width" : 225,
//                     "url" : "assets/mobile/frame/thumbnail/300/love.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\300\\love.png"
//                 }
//             },
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         },
//         {
//             type:'frame',//frame,clipart,background,font
//             path:'D:\\website\\assets\\mobile\\frame\\love_V.png',
//             url:'assets/mobile/frame/love_V.png',
//             id:'love_V',
//             assetName:'love_V',//图片简介
//             width:1800,
//             height:2400,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [100], //缩略图类型
//             thumbnail: {
//                 "x100" : {
//                     "height" : 75,
//                     "width" : 100,
//                     "url" : "assets/mobile/frame/thumbnail/100/love_V.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\100\\love_V.png"
//                 },
//                 "x300" : {
//                     "height" : 225,
//                     "width" : 300,
//                     "url" : "assets/mobile/frame/thumbnail/300/love_V.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\300\\love_V.png"
//                 }
//             }, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         },
//         {
//             type:'frame',//frame,clipart,background,font
//             path:'D:\\website\\assets\\mobile\\frame\\princess.png',
//             url:'assets/mobile/frame/princess.png',
//             id:'princess',
//             assetName:'princess',//图片简介
//             width:2400,
//             height:1800,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [100,300], //缩略图类型
//             thumbnail: {
//                 "x100" : {
//                     "height" : 100,
//                     "width" : 75,
//                     "url" : "assets/mobile/frame/thumbnail/100/princess.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\100\\princess.png"
//                 },
//                 "x300" : {
//                     "height" : 300,
//                     "width" : 225,
//                     "url" : "assets/mobile/frame/thumbnail/300/love.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\300\\princess.png"
//                 }
//             },
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         },
//         {
//             type:'frame',//frame,clipart,background,font
//             path:'D:\\website\\assets\\mobile\\frame\\princess_V.png',
//             url:'assets/mobile/frame/love_V.png',
//             id:'princess_V',
//             assetName:'princess_V',//图片简介
//             width:1800,
//             height:2400,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [100], //缩略图类型
//             thumbnail: {
//                 "x100" : {
//                     "height" : 75,
//                     "width" : 100,
//                     "url" : "assets/mobile/frame/thumbnail/100/princess_V.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\100\\princess_V.png"
//                 },
//                 "x300" : {
//                     "height" : 225,
//                     "width" : 300,
//                     "url" : "assets/mobile/frame/thumbnail/300/princess_V.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\300\\princess_V.png"
//                 }
//             }, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         },
//         {
//             type:'frame',//frame,clipart,background,font
//             path:'D:\\website\\assets\\mobile\\frame\\Roving.png',
//             url:'assets/mobile/frame/Roving.png',
//             id:'Roving',
//             assetName:'Roving',//图片简介
//             width:2400,
//             height:1800,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [100,300], //缩略图类型
//             thumbnail: {
//                 "x100" : {
//                     "height" : 100,
//                     "width" : 75,
//                     "url" : "assets/mobile/frame/thumbnail/100/Roving.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\100\\Roving.png"
//                 },
//                 "x300" : {
//                     "height" : 300,
//                     "width" : 225,
//                     "url" : "assets/mobile/frame/thumbnail/300/Roving.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\300\\Roving.png"
//                 }
//             },
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         },
//         {
//             type:'frame',//frame,clipart,background,font
//             path:'D:\\website\\assets\\mobile\\frame\\Roving_V.png',
//             url:'assets/mobile/frame/Roving_V.png',
//             id:'Roving_V',
//             assetName:'Roving_V',//图片简介
//             width:1800,
//             height:2400,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [100], //缩略图类型
//             thumbnail: {
//                 "x100" : {
//                     "height" : 75,
//                     "width" : 100,
//                     "url" : "assets/mobile/frame/thumbnail/100/Roving_V.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\100\\Roving_V.png"
//                 },
//                 "x300" : {
//                     "height" : 225,
//                     "width" : 300,
//                     "url" : "assets/mobile/frame/thumbnail/300/Roving_V.png",
//                     "path" : "D:\\website\\assets\\mobile\\frame\\thumbnail\\300\\Roving_V.png"
//                 }
//             }, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         }
//         ,{
//             type:'cliparts',
//             id:'Alien1',
//             assetName:'Alien1',//图片简介
//             path:'D:\\website\\assets\\mobile\\cliparts\\Ariel.png',
//             url:'assets/mobile/cliparts/Ariel.png',
//             width:500,
//             height:500,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [], //缩略图类型
//             thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         }
//         ,{
//             type:'cliparts',
//             id:'Arie2',
//             assetName:'Arie2',//图片简介
//             path:'D:\\website\\assets\\mobile\\cliparts\\Arie2.png',
//             url:'assets/mobile/cliparts/Arie2.png',
//             width:500,
//             height:500,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [], //缩略图类型
//             thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         }
//         ,{
//             type:'cliparts',
//             id:'Duffy',
//             assetName:'Duffy',//图片简介
//             path:'D:\\website\\assets\\mobile\\cliparts\\Duffy.png',
//             url:'assets/mobile/cliparts/Duffy.png',
//             width:500,
//             height:500,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [], //缩略图类型
//             thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         }
//         ,{
//             type:'cliparts',
//             id:'Buzz',
//             assetName:'Buzz',//图片简介
//             path:'D:\\website\\assets\\mobile\\cliparts\\Buzz.png',
//             url:'assets/mobile/cliparts/Buzz.png',
//             width:500,
//             height:500,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [], //缩略图类型
//             thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         }
//         ,{
//             type:'cliparts',
//             id:'f-1',
//             assetName:'f-1',//图片简介
//             path:'D:\\website\\assets\\mobile\\cliparts\\f-1.png',
//             url:'assets/mobile/cliparts/f-1.png',
//             width:500,
//             height:500,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [], //缩略图类型
//             thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         }
//         ,{
//             type:'cliparts',
//             id:'f-2@2x',
//             assetName:'f-2@2x',//图片简介
//             path:'D:\\website\\assets\\mobile\\cliparts\\f-2@2x.png',
//             url:'assets/mobile/cliparts/f-2@2x.png',
//             width:500,
//             height:500,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [], //缩略图类型
//             thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         }
//         ,{
//             type:'cliparts',
//             id:'f-3@2x',
//             assetName:'f-3@2x',//图片简介
//             path:'D:\\website\\assets\\mobile\\cliparts\\f-3@2x.png',
//             url:'assets/mobile/cliparts/f-3@2x.png',
//             width:500,
//             height:500,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [], //缩略图类型
//             thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         }
//         ,{
//             type:'cliparts',
//             id:'Fairy Godmother',
//             assetName:'Fairy Godmother',//图片简介
//             path:'D:\\website\\assets\\mobile\\cliparts\\Fairy Godmother.png',
//             url:'assets/mobile/cliparts/Fairy Godmother.png',
//             width:500,
//             height:500,
//             locationId:'',//location的_id
//             active:true,//是否有效
//             thumbnailType: [], //缩略图类型
//             thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//             note:"",//图片简介
//             createdBy: 'meteor',//创建者ID
//             modifiedBy: 'meteor',
//             createtime: new Date() ,
//             modifytime: new Date()
//         }
//     ]
//};
////console.log(entity);
//var mongoDel=require('../Model/assetModel.js');
//var arrayassetsEntity=[];
//for(var assetsitemindex in entity_engine.assets){
//    var assetsitem=entity_engine.assets[assetsitemindex];
//    var assetsEntity={
//        platformType:'mobile',
//        type:assetsitem.type,//frame,clipart,background,font
//        path:assetsitem.path,
//        font:assetsitem.font,
//        url:assetsitem.url,
//        id:assetsitem.id,
//        assetName:assetsitem.assetName,//图片简介
//        width:assetsitem.width,
//        height:assetsitem.height,
//        locationId:assetsitem.locationId,//location的_id
//        active:assetsitem.active,//是否有效
//        thumbnailType: assetsitem.thumbnailType, //缩略图类型
//        thumbnail: assetsitem.thumbnail, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
//        note:assetsitem.note,//图片简介
//        createdBy: assetsitem.createdBy,//创建者ID
//        modifiedBy: assetsitem.modifiedBy,
//        createtime: assetsitem.createtime,
//        modifytime: assetsitem.modifytime
//    }
//    arrayassetsEntity.push(assetsEntity);
//}
////var assetsEntity={
////    platformType:'engine',
////    type:'background',//frame,clipart,background,font
////    path:'D:\\website\\assets\\engine\\background\\Disney\\GS01.jpg',
////    url:'background/Disney/GS01.jpg',
////    id:'GS01',
////    assetName:'GS01',//图片简介
////    width:2400,
////    height:1800,
////    locationId:'',//location的_id
////    active:true,//是否有效
////    thumbnailType: [], //缩略图类型
////    thumbnail: {}, //缩略图信息{x1024:{path:路径, width:宽, height:高， url:url}}
////    note:"",//图片简介
////    createdBy: 'meteor',//创建者ID
////    modifiedBy: 'meteor',
////    createtime: new Date() ,
////    modifytime: new Date()
////}
//
//mongoDel.insert(arrayassetsEntity,function(err){
//   console.log(err);
//});
////mongoDel.insert([],function(err){
////   console.log(err);
////});
//
////mongoDel.findAll(function(err,value){
////    console.warn(err,value)
////});
//
//
//
////var p = new mongoDel([entity,entity,entity,entity]);
//
////var potatoBag = [entity_engine];
////mongoDel.collection.insert(potatoBag, onInsert);
//////p.save(function(error){
//////    console.error(error);
//////});
////
////function onInsert(err, docs) {
////    if (err) {
////        // TODO: handle error
////        console.error(err);
////    } else {
////        console.info('%d potatoes were successfully stored.', docs.length);
////    }
////}
////
////p.save(function(err) {  //存储
////    if (err) {
////        console.error('save failed',err);
////    }else
////    console.log('save success');
////});

 var assetMode=require('../Model/assetModel.js');
var data={
    "parkId":"54855eda940b6c584ea31fb8",
    "serverId":"5553682a6614ece01241074c",
    "platformType" : "airditor",
    "type" : "background",
    "path" : "D:\\website\\assets\\engine\\background\\Disney\\GS01.jpg",
    "url" : "background/Disney/GS01.jpg",
    "id" : "GS01",
    "assetName" : "GS01",
    "width" : 2400,
    "height" : 1800,
    "locationId" : "",
    "location":"test",
    "active" : true,
    "thumbnailType" : [],
    "thumbnail" : {},
    "note" : "",
    "createdBy" : "meteor",
    "modifiedBy" : "meteor"
}
var assetEntity=new assetMode(data);
assetEntity.insert(function(err){
    console.log(err)
})
