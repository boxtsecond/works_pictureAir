/**
 * Created by meteor on 16/11/22.
 */
// midileware
var auth=require('../rq').auth;
//console.log(auth)
module.exports=function(app){
    app.use('/',require('./index'));
    //Guest
    app.use('/auth',require('./auth'));
    //app.use('/user',auth.authGuest ,require('./user'));
    app.use('/cache',auth.authGuest,require('./cacheRoute.js'));
    app.use('/user',auth.authGuest,require('./user'));

    app.use('/user',auth.authUser,require('./userRoute'));
    app.use('/photo',auth.authUser,require('./photoRoute.js'));
    app.use('/park',auth.authUser,require('./parkRoute.js'));
    app.use('/shop',auth.authUser,require('./shopRoute.js'));
    app.use('/card',auth.authUser,require('./cardRoute.js'));
    return app;
};