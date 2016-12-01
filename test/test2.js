///**
// * Created by meteor on 16/11/22.
// */
//var assert = require('assert');
//var request = require('supertest');
//var should=require('should');
//request = request('http://localhost:4001');
//describe('login1111111111', function() {
//    it('should not login an user when loginname is empty', function(done) {
//        request.post('/user/login')
//            .send({
//                username: '',
//                password: "password"
//            })
//            .expect(200, function(err, res) {
//                should.not.exist(err);
//                // console.log(res.text)
//                // res.text.should.containEql('用户名或密码不能为空');
//                done();
//            });
//    });
//    it('should not login an user when it is exist', function(done) {
//        request.post('/user/login')
//            .send({
//                username: 'username',
//                password: "password"
//            })
//            .expect(200, function(err, res) {
//                should.not.exist(err);
//                // res.text.should.containEql('用户已经存在');
//                done();
//            });
//    });
//});