/**
 * Created by meteor on 15/7/28.
 */

//node default require,global,process,__filename,__dirname, module,exports
// setTimeout,clearTimeout,setInterval,clearInterval,Buffer
// Class
//console.log(setInterval, Buffer);

//******system for node ********/
global.sys = require('util');
global.util = require('util');
global.dgram =require('dgram')
global.path=require('path');
global.url=require('url');
global.os=require('os');
global.crypto=require('crypto') ;
global.assert=require('assert') ;
global.child_process=require('child_process') ;
global.spawn=child_process.spawn;
global.exec=child_process.exec ;
global.execFile=child_process.execFile ;
global.fork=child_process.fork ;
global.cluster=require('cluster');
global.dns = require('dns');
global.http = require('http');
global.https = require('https');
global.net = require('net');
global.util=require('util');
global.events = require("events");
global.punycode = require("punycode");
global.querystring = require("querystring");
global.readline = require("readline");
global.repl = require("repl");
global.string_decoder = require("string_decoder");
global.tls = require("tls");
global.tty = require("tty");
global.dgram = require("dgram");
global.vm = require('vm');
global.zlib = require('zlib');
global.fs=fs=require('fs');
global.punycode=fs=require('punycode');
global.readline = require('readline');
global.repl = require('repl');
global.domain=require('domain');
//******system for node ********/
//******package for node ********/
//global.engine=require('engine');
//global.fs=engine.fs;
//global.async=engine.async;
global.debug=require('debug');
global._=require('lodash');
global.Promise=require('bluebird');
global.bluebird=global.Promise;
global.imagesize=require('image-size');
//global.engine=require('engine');

// console.trace(console)
//console.time('100-elements');
//for (var i = 0; i < 100000000; i++) {
//    ;
//}
//console.timeEnd('100-elements');
//******package for node ********/

//******soft Definition for node ********/
global.config=require('../config/config');
global.log=config.logger;
global.language='zh-cn';
//******soft Definition for node ********/

