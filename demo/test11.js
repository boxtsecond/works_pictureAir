/**
 * Created by meteor on 16/12/7.
 */
// var SMTPConnection = require('smtp-connection');
//
// var options={
//     // pool: true,
//     host :"smtp.office365.com",
//     port : 587,
//     // service: 'smtp.office365.com',
//     // host :"outlook.office365.com",
//     // port:995,
//     // secure: true, // use SSL
//     //
//     auth: { user: 'do-not-reply@pictureair.com', pass: 'CN-SH-PA-6001' },
//     secure:false,
//     ignoreTLS:false,
//     // secure:true,
//     // debug:true
//     //  secureConnection: false,
//     // ignoreTLS: false ,
//
//     requireTLS: false
// }
// var connection = new SMTPConnection(options);
//
// connection.connect(function (err,aa) {
//     console.log(err);
// })
// connection.login({
//     domain: 'smtp.office365.com',
//     workstation: 'windows-workstation',
//     user: 'do-not-reply@pictureair.com',
//     pass: 'CN-SH-PA-6001'
// }, function (err) {
//     console.log(err)
// });


//
// var nodemailer  = require("nodemailer");
// var smtpTransport = nodemailer.createTransport( {
//     host : 'smtp.office365.com',
//     port : 587,
//     // secure: false, // use SSL
//     auth: {
//         user: "do-not-reply@pictureair.com",
//         pass: 'CN-SH-PA-6001'
//     }
// });
// smtpTransport.sendMail({
//     // from    : 'do-not-reply@pictureair.com'
//         from: 'PictureAir.com Auto-Mailer <do-not-reply@pictureair.com>'
//     , to      : "meteor.liu@pictureworks.biz"
//         // ,
//     // envelope: {
//     //     from: 'PictureAir.com Auto-Mailer <do-not-reply@pictureair.com>', // used as MAIL FROM: address for SMTP
//     //     to: 'meteor.liu@pictureworks.biz' // used as RCPT TO: address for SMTP
//     // }
//     , subject : 'test'
//     , html    : 'test '
// }, function(err, res) {
//     console.log(err, res);
// });


// var m = /(\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}-\d{2}\d{2}:\d{2}:\d{2})|(\d{2}:\d{2}:\d{2})/;
// console.log(m.test("2012-01-23 21:08:29"))