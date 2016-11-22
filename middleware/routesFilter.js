//login
//register
//logout
//auth

//api
//cache
//redis mem
//var user = require('../app/mongodb/Model/userModel');
//function register(req, res){
//    var Nuser=new user({ username : req.body.username });
//    user.register(Nuser, req.body.password, function(err, account) {
//        if (err) {
//            res.json({status:500,msg:err})
//            return res.render('register', { account : account });
//        }else{
//            passport.authenticate('local')(req, res, function () {
//                //res.redirect('/');
//                res.json({status:201,msg:"err yes"})
//            });
//        }
//
//
//    });
//}
//module.exports.register=register;
