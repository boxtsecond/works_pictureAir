///**
// * Created by meteor on 16/11/22.
// */
//var assert = require('assert');
//var request = require('supertest');
//var should=require('should');
//request = request('http://localhost:4001');
//describe('Array', function() {
//    describe('#indexOf()', function() {
//        it('should return -1 when the value is not present', function() {
//            assert.equal(-1, [1,2,3].indexOf(5));
//            assert.equal(-1, [1,2,3].indexOf(0));
//        });
//    });
//});
//describe('login', function() {
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