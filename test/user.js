/**
 * Created by meteor on 16/11/22.
 */
var assert = require('assert');
var request = require('supertest');
var should=require('should');
request = request('http://localhost:4001');

// describe('/user/register', function() {
//     it('should not register an user when loginname is empty', function(done) {
//         request.post('/user/register')
//             .send({
//                 //  username: '',
//                 password: "password"
//             })
//             .expect(200, function(err, res) {
//                 should.not.exist(err);
//                 res.body.status.should.eql(401);
//                 // res.text.should.containEql('用户名或密码不能为空');
//                 done();
//             });
//     });
//     it('should not login an user userName  illegal', function(done) {
//         request.post('/user/register')
//             .send({
//                 username: 'username',
//                 password: "password"
//             })
//             .expect(200, function(err, res) {
//                 should.not.exist(err);
//                 res.body.status.should.eql(403);
//                  //res.text.should.containEql('用户已经存在');
//                 done();
//             });
//     });
//     it('should not login an user userName  illegal', function(done) {
//         request.post('/user/register')
//             .send({
//                 username: '111111',
//                 password: "password"
//             })
//             .expect(200, function(err, res) {
//                 //console.log(res.text)
//                 should.not.exist(err);
//                 res.body.status.should.eql(403);
//                // res.text.should.have.property('status', 403);
//                 //res.text.status.should.containEql(403);
//                 // res.text.should.containEql('用户已经存在');
//                 done();
//             });
//     });
//     it('should not login an email user when it is exist', function(done) {
//         request.post('/user/register')
//             .send({
//                 username: 'www1@qq.com',
//                 password: "password"
//             })
//             .expect(200, function(err, res) {
//                 should.not.exist(err);
//                 console.log(res.text)
//                 //res.body.status.should.eql(200);
//                 // res.text.should.containEql('用户已经存在');
//                 done();
//             });
//     });
//     it('should not login an email lgcode user when it is exist', function(done) {
//        request.post('/user/register')
//            .send({
//                username: 'www@qq.com',
//                password: "password",
//                lgcode:"zh-CN"
//            })
//            .expect(200, function(err, res) {
//                should.not.exist(err);
//                console.log(res.text)
//                // res.text.should.containEql('用户已经存在');
//                done();
//            });
//     });
// });

describe('/user/login', function() {
   // it('should not login an user when loginname is empty', function(done) {
   //     request.post('/user/login')
   //         .send({
   //           //  username: '',
   //             password: "password"
   //         })
   //         .expect(200, function(err, res) {
   //             should.not.exist(err);
   //              console.log(res.text)
   //             // res.text.should.containEql('用户名或密码不能为空');
   //             done();
   //         });
   // });
//    it('should not login an user when it is exist', function(done) {
//        request.post('/user/login')
//            .send({
//                username: 'username',
//                password: "password"
//            })
//            .expect(200, function(err, res) {
//                should.not.exist(err);
//                console.log(res.text)
//                // res.text.should.containEql('用户已经存在');
//                done();
//            });
//    });
//    it('should not login an email user when it is exist', function(done) {
//        request.post('/user/login')
//            .send({
//                username: 'www@qq.com',
//                password: "password"
//            })
//            .expect(200, function(err, res) {
//                should.not.exist(err);
//                console.log(res.text)
//                // res.text.should.containEql('用户已经存在');
//                done();
//            });
//    });
//    it('should not login an email lgcode user when it is exist', function(done) {
//        request.post('/user/login')
//            .send({
//                username: 'www@qq.com',
//                password: "password",
//                lgcode:"zh-CN"
//            })
//            .expect(200, function(err, res) {
//                should.not.exist(err);
//                console.log(res.text)
//                // res.text.should.containEql('用户已经存在');
//                done();
//            });
//    });
});