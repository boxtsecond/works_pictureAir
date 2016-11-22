var routes=require("../app/routes/routes.js")
module.exports = function (app) {
    //app.use('/',require('../app/routes/index.js'));
    routes(app);
    app.get('*', function(req, res){
        res.json({status:404,msg:"",result:{}});
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