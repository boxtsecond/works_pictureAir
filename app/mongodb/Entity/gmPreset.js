/**
 * Created by meteor on 14-9-19.
 */
var entity={
    typename: "minion",
    name: "beach",
    jsonfilename:"minionbeach",
    jsonpath:"/x//xxx/xxx/xxx/xxx27"+Math.random(Math.round(Math.pow(2,53)-1)),
    "layers": [
        {
            "role": "background",
            "ishide": false,
            "type": "image",
            "file_id": "",
            "file_path": "/Users/meteor/Desktop/gmginefolder/assets/preset/minions_beach_bg.jpg",
            "filter":  []
        },
        {
            "role": "main",
            "ishide": false,
            "type": "image",
            "file_id": "",
            "file_path": "",
            "x": 100,
            "y": 900,
            "filter":  []

        },
        {
            "role": "foreground",
            "ishide": false,
            "type": "image",
            "file_id": "",
            "file_path":  "/Users/meteor/Desktop/gmginefolder/assets/preset/minions_beach_fg.png",
            "x": 0,
            "y": 0,
            "filter":  []
        }, {
            "role": "timetext",
            "ishide": false,
            "type": "text",
            "text": "WelcometoPictureAir",
            "font": "/Users/meteor/Desktop/gmginefolder/assets/font/SimHei.ttf",
            "fontsize": 40,
            "fontcolor": "#F7C62D",
            "x": 0,
            "y": 0
        },
        {
            "role": "watermark",
            "ishide": false,
            "type": "image",
            "file_path": "/Users/meteor/Desktop/gmginefolder/assets/watermark/logo.png",
            "x": 0,
            "y": 0
        }
    ],
    author: 'admin',
    use:true,
    createtime: new Date(),
    upadatetime: new Date()
}
module.exports=entity;

