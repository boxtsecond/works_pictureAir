/**
 * Created by meteor on 16/11/22.
 */
// midileware
var auth=require('../rq').auth;
//console.log(auth)
module.exports=function(app){
    //app.use('/',require('./index'));
    app.use('/auth',require('./auth'));
    app.use('/sync',require('./sync'));
    //Guest
    app.use('/g',auth.authGuest,require('./guestRoute'));
    app.use('/p',auth.authUser,require('./privateRoute'));
    app.use('*',auth.authGuest);
    return app;
};