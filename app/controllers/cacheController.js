/**
 * Created by xueting-bo on 16/12/2.
 */
var errInfo = require('../resfilter/resInfo.js').errInfo;

exports.carousel = function (req, res, next) {
    if (!req) {
        return res.ext.json(errInfo.carousel.paramsError);
    }
    var str={
        "page":{
            "index":{
                "slide":[  {"url":"http://192.168.8.107/h5/assets/slide/01.png","title":"pictureAir01","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/02.png","title":"pictureAir02","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/03.png","title":"pictureAir03","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/04.png","title":"pictureAir04","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/05.png","title":"pictureAir05","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/06.png","title":"pictureAir06","link":"http://192.168.8.107/h5/test.html","type":"png"}
                ]
            },
            "login":{
                "slide": [  {"url":"http://192.168.8.107/h5/assets/slide/01.png","title":"pictureAir01","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/02.png","title":"pictureAir02","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/03.png","title":"pictureAir03","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/04.png","title":"pictureAir04","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/05.png","title":"pictureAir05","link":"http://192.168.8.107/h5/test.html","type":"png"},
                    {"url":"http://192.168.8.107/h5/assets/slide/06.png","title":"pictureAir06","link":"http://192.168.8.107/h5/test.html","type":"png"}
                ]
            }
        }
    };
    var resultObj = errInfo.success;
    resultObj.result = str;
    return res.ext.json(resultObj);
}