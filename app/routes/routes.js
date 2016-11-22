/**
 * Created by meteor on 16/11/22.
 */
module.exports=function(app){
    app.use('/',require('./index.js'));
    app.use('/user',require('./user.js'));
    //app.use('/photo',require('../photoRoute.js'));
    //app.use('/park',require('../parkRoute.js'));
    //app.use('/shop',require('../shopRoute.js'));
    //app.use('/card',require('../cardRoute.js'));
    return;
};