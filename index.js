
// var debug = require('debug')('enginePreset');
// var app = require('./config/express')();
// require('./config/routes')(app);
// app.set('port', process.env.PORT || 4001);
// var server = app.listen(app.get('port'), function() {
//     debug('Express server listening on port ' + server.address().port);
// });
//


//require("./config/global");
//var deubg=debug('pictureEngineAPI');
//var app = require('./config/express')();
//require('./config/routes')(app);
//app.set('port', process.env.PORT || config.config.port);
//var server = app.listen(app.get('port'), function() {
//    debug('Express server listening on port ' + server.address().port);
//});

//console.log(new Date(parseInt("854726400000")))
require("./config/global");
//if ( cluster.isMaster ) {
//    for ( var i=0; i<os.cpus().length; ++i ){
//        cluster.fork();
//    }
//    cluster.on( 'online', function( worker ) {
//        console.log( 'Worker ' + worker.process.pid + ' is online.' );
//    });
//    cluster.on('listening',function(worker,address){
//        console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
//    });
//    cluster.on( 'exit', function( worker, code, signal ) {
//        console.log( 'worker ' + worker.process.pid + ' died.' );
//    });
//} else if (cluster.isWorker){
//    var deubg=debug('pictureEngineAPI');
//    var app = require('./config/express')();
//    require('./config/passport')(app);
//    require('./config/routes')(app);
//    app.set('port', process.env.PORT || config.config.port);
//    var server = app.listen(app.get('port'), function() {
//        debug('Express server listening on port ' + server.address().port);
//    });
//}


var deubg=debug('pictureEngineAPI');
var app = require('./config/express')();
require('./config/passport')(app);
require('./config/routes')(app);
app.set('port', process.env.PORT || config.config.port);
var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});