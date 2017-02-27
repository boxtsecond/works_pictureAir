/**
 * Created by xueting-bo on 16/12/2.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;

exports.carousel = function (req, res, next) {
    if (!req) {
        return res.ext.json(errInfo.carousel.paramsError);
    }
    var str={
        "index":{
            "slide":[  {"url":"h5/assets/slide/index/01.png","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"},
                {"url":"h5/assets/slide/index/02.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"},
                {"url":"h5/assets/slide/index/03.png","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"},
                {"url":"h5/assets/slide/index/04.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"},
                {"url":"h5/assets/slide/index/05.png","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"}
            ]
        },
        "login":{
            "slide": [  {"url":"h5/assets/slide/login/01.jpg","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"},
                {"url":"h5/assets/slide/login/02.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"},
                {"url":"h5/assets/slide/login/03.jpg","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"},
                {"url":"h5/assets/slide/login/04.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"},
                {"url":"h5/assets/slide/login/05.jpg","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"},
            ]
        },
        "home":{
            "slide": [  {"url":"h5/assets/slide/home/01.png","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"},
                {"url":"h5/assets/slide/home/02.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"},
                {"url":"h5/assets/slide/home/03.png","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"},
                {"url":"h5/assets/slide/home/04.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"},
                {"url":"h5/assets/slide/home/05.png","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"}
            ],
            "webslide": [  {"url":"h5/assets/webslide/01.png","title":"pictureAir01","link":"https://www.legoland.jp","type":"jpg"},
                {"url":"h5/assets/webslide/02.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"},
                {"url":"h5/assets/webslide/03.png","title":"pictureAir","link":"https://www.legoland.jp","type":"jpg"},
                {"url":"h5/assets/webslide/04.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"}
            ]
        }
    };
    // var resultObj = errInfo.success;
    // resultObj.result = str;
    return res.ext.json([200,"success",str]);
}