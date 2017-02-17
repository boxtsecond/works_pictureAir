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
    //public
    app.use('/f',require('./publicRoute'));
    //Guest
    app.use('/g',auth.authGuest,require('./guestRoute'));
    //Private
    app.use('/p',auth.authUser,require('./privateRoute'));
    //secret
    app.use('/s',auth.authSystem,require('./secretRoute'));
    app.use('*',auth.authGuest);
    return app;
};