var routes=require("../app/routes/routes.js");
module.exports = function (app) {
    //app.use('/',require('../app/routes/index.js'));
    routes(app);
    app.get('*', function(req, res){
        return res.json({ status: 421, msg: 'unauthorized'});
      });
    app.use(function(err, req, res, next) {
                if (!err) return next();
              else  {
                    res.json({status:500,msg:JSON.stringify(err.stack),result:{}});
                    return;
                }

     });
    return;
};