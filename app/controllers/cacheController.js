/**
 * Created by xueting-bo on 16/12/2.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;

exports.carousel = function (req, res, next) {
    if (!req) {
        return res.ext.json(errInfo.carousel.paramsError);
    }
    var str={
<<<<<<< HEAD
            "index":{
                "slide":[  {"url":"h5/assets/slide/01.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                    {"url":"h5/assets/slide/02.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                    {"url":"h5/assets/slide/03.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                    {"url":"h5/assets/slide/04.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                    {"url":"h5/assets/slide/05.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"}
                 ]
            },
            "login":{
                "slide": [  {"url":"h5/assets/slide/01.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                    {"url":"h5/assets/slide/02.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                    {"url":"h5/assets/slide/03.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                    {"url":"h5/assets/slide/04.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                    {"url":"h5/assets/slide/05.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                  ]
            },
          "home":{
            "slide": [  {"url":"h5/assets/slide/01.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                {"url":"h5/assets/slide/02.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                {"url":"h5/assets/slide/03.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                {"url":"h5/assets/slide/04.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"},
                {"url":"h5/assets/slide/05.png","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"png"}
            ],
             "webslide": [  {"url":"h5/assets/webslide/01.jpg","title":"pictureAir01","link":"http://192.168.8.107/h5/test.html","type":"jpg"},
                  {"url":"h5/assets/webslide/02.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"},
                  {"url":"h5/assets/webslide/03.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"},
                  {"url":"h5/assets/webslide/04.jpg","title":"pictureAir","link":"http://www.birdpark.com.sg","type":"jpg"}
              ]
          }
=======
        "index":{
            "slide":[  {"url":"http://192.168.8.107/h5/assets/slide/01.png","title":"pictureAir01","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/02.png","title":"pictureAir02","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/03.png","title":"pictureAir03","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/04.png","title":"pictureAir04","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/05.png","title":"pictureAir05","link":"http://www.birdpark.com.sg/","type":"png"}
            ]
        },
        "login":{
            "slide": [  {"url":"http://192.168.8.107/h5/assets/slide/01.png","title":"pictureAir01","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/02.png","title":"pictureAir02","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/03.png","title":"pictureAir03","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/04.png","title":"pictureAir04","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/05.png","title":"pictureAir05","link":"http://www.birdpark.com.sg/","type":"png"},
            ]
        },
        "home":{
            "slide": [  {"url":"http://192.168.8.107/h5/assets/slide/01.png","title":"pictureAir01","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/02.png","title":"pictureAir02","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/03.png","title":"pictureAir03","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/04.png","title":"pictureAir04","link":"http://www.birdpark.com.sg/","type":"png"},
                {"url":"http://192.168.8.107/h5/assets/slide/05.png","title":"pictureAir05","link":"http://www.birdpark.com.sg/","type":"png"}
            ],
            "webslide": [  {"url":"http://192.168.8.107//h5/assets/webslide/01.jpg","title":"pictureAir01","link":"http://www.birdpark.com.sg/","type":"jpg"},
                {"url":"http://192.168.8.107//h5/assets/webslide/02.jpg","title":"pictureAir02","link":"http://www.birdpark.com.sg/","type":"jpg"},
                {"url":"http://192.168.8.107//h5/assets/webslide/03.jpg","title":"pictureAir03","link":"http://www.birdpark.com.sg/","type":"jpg"},
                {"url":"http://192.168.8.107//h5/assets/webslide/04.jpg","title":"pictureAir04","link":"http://www.birdpark.com.sg/","type":"jpg"}
            ]
        }
>>>>>>> 79e1b6edbf13582e97b6e33dd107efec74398507
    };
    // var resultObj = errInfo.success;
    // resultObj.result = str;
    return res.ext.json([200,"success",str]);
}