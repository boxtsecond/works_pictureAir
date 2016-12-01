/**
 * Created by meteor on 16/11/22.
 */
var assert = require('assert');
var request = require('supertest');
var should=require('should');
request = request('http://localhost:4001');

describe('/auth/getAccessToken', function() {
    it('should not register an user when loginname is empty', function(done) {
        request.post('/auth/getAccessToken')
            .send({
                appid: 'aaaa',
                password: "password"
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                console.log(res.body)
                //res.body.status.should.eql(401);
                // res.text.should.containEql('用户名或密码不能为空');
                done();
            });
    });
    it('should not register an user when loginname is empty', function(done) {
        request.post('/auth/getAccessToken')
            .send({
                appid: '6c8c8dc48280ed2163136ad416e1dbfe',
                password: "password",
                t:1,
                lg:"zh-CN"

            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                console.log(res.body)
                //res.body.status.should.eql(401);
                // res.text.should.containEql('用户名或密码不能为空');
                done();
            });
    });
    //it('should not login an user userName  illegal', function(done) {
    //    request.post('/user/register')
    //        .send({
    //            username: 'username',
    //            password: "password"
    //        })
    //        .expect(200, function(err, res) {
    //            should.not.exist(err);
    //            res.body.status.should.eql(403);
    //             //res.text.should.containEql('用户已经存在');
    //            done();
    //        });
    //});
    //it('should not login an user userName  illegal', function(done) {
    //    request.post('/user/register')
    //        .send({
    //            username: '111111',
    //            password: "password"
    //        })
    //        .expect(200, function(err, res) {
    //            //console.log(res.text)
    //            should.not.exist(err);
    //            res.body.status.should.eql(403);
    //           // res.text.should.have.property('status', 403);
    //            //res.text.status.should.containEql(403);
    //            // res.text.should.containEql('用户已经存在');
    //            done();
    //        });
    //});
    //it('should not login an email user when it is exist', function(done) {
    //    request.post('/user/register')
    //        .send({
    //            username: 'www1@qq.com',
    //            password: "password"
    //        })
    //        .expect(200, function(err, res) {
    //            should.not.exist(err);
    //            console.log(res.text)
    //            //res.body.status.should.eql(200);
    //            // res.text.should.containEql('用户已经存在');
    //            done();
    //        });
    //});
});
