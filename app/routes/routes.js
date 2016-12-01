/**
 * Created by meteor on 16/11/22.
 */
// midileware
var auth=require('../rq').auth;
//console.log(auth)
module.exports=function(app){
    app.use('/',require('./index'));
    app.use('/user',auth.authGuest ,require('./user'));
    //app.use('/user',require('./user'));
    app.use('/auth',require('./auth'));
    //app.use('/photo',require('../photoRoute.js'));
    //app.use('/park',require('../parkRoute.js'));
    //app.use('/shop',require('../shopRoute.js'));
    //app.use('/card',require('../cardRoute.js'));
    return app;
};