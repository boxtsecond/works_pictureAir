'use strict';
var fs = require('fs'),
    path = require('path'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    morgan = require('morgan'),
    logger = require('./logger'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
   //errorhandler = require('errorhandler'),
    multer=require('multer'),
    cookieParser = require('cookie-parser'),
    consolidate = require('consolidate'),
     compress = require('compression');
var reqExt=require("../middleware/reqExt");
//var logger=require('./logger');
module.exports = function() {
    // Initialize express app
    var app = express();

    // Setting application local variables
//    app.locals.title = config.app.title;
    // Passing the request url to environment locals
    app.use(function(req, res, next) {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });
    // Should be placed before express.static
    app.use(compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));
//??? Enable logger (morgan)
//    app.use(morgan('dev'));
    // create a write stream (in append mode)


// setup the logger
    app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
        ,limit: '50mb'
    }));
    app.use(bodyParser.json(
        {limit: '50mb'}
    ));
    app.use(methodOverride());
    // CookieParser should be above session
    app.use(cookieParser());
    app.use(reqExt())
    //passport(app);
//    app.use(multer()); // for parsing multipart/form-data
//    app.use(multer({ dest: './uploads/'}));


    //app.use(multer({
    //     inMemory: true,
    //    rename: function (fieldname, filename) {
    //        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    //    }
    //}))



//    app.use(multer({
//        dest: './uploads/', inMemory: true,
//        rename: function (fieldname, filename) {
//            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
//        }
//    }))
//   app.set('views', path.join(__dirname, '../app/views'));
    //app.engine('.html', require('ejs').__express);
    //app.set('view engine', 'html');
  //  console.log(path.join(__dirname, '../static/appPreset'));
  //  app.use(express.static(path.join(__dirname, '..','static')));
//    app.use(express.static(path.join(__dirname, '../app/public')));
//    app.use(express.static(path.join(__dirname, '../app/files')));
//    app.use(express.static(path.join(__dirname, '../app/uploads')));



// Define routes.



//    app.get('*', function(req, res) {
//        var Data404={"title":"404","url":req.path};
//        var filepath404=path.join(__dirname,"sysviews" ,"404.html");
//         res.render(filepath404,Data404);
//    })



    if (process.env.NODE_ENV === 'development') {
        // only use in development
        app.use(errorhandler())
    }

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.

    //所有请求都会调用的操作
    app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.set('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method=="OPTIONS") 
        res.send(200); 
    else 
        next();
    });
    // Use helmet to secure Express headers

    // Passing the request url to environment locals

    // Should be placed before express.static

    // Showing stack errors
    // Return Express server instance



    return app;
};
