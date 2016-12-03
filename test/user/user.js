///**
// * Created by meteor on 16/11/22.
// */
//var assert = require('assert');
//var request = require('supertest');
//var should=require('should');
//request = request('http://localhost:4001');
//
//describe('/auth/getAccessToken', function() {
//    //it('should getAccessToken', function(done) {
//    //    request.post('/auth/getAccessToken')
//    //        .send({
//    //            appid: '6c8c8dc48280ed2163136ad416e1dbfe',
//    //            password: "password",
//    //            t:1,
//    //            lg:"zh-CN"
//    //        })
//    //        .expect(200, function(err, res) {
//    //            request.post('/user/sendsms')
//    //                .send({
//    //                    access_token:res.body.result.access_token,
//    //                    //appid: '6c8c8dc48280ed2163136ad416e1dbfe',
//    //                    //password: "password",
//    //                    //t:1,
//    //                    //lg:"zh-CN"
//    //                }).set('authorization', res.body.result.access_token)
//    //                .expect(200, function(err1, res1) {
//    //                    console.log(res1.body)
//    //                    should.not.exist(err1);
//    //                    // res.body.status.should.eql(401);
//    //                    // res.text.should.containEql('用户名或密码不能为空');
//    //                    //done();
//    //                });
//    //            //console.log(res.body)
//    //            //should.not.exist(err);
//    //           // res.body.status.should.eql(401);
//    //            // res.text.should.containEql('用户名或密码不能为空');
//    //            done();
//    //        });
//    //});
//    //
//    //it('should getAccessToken2', function(done) {
//    //    request.post('/user/sendsms')
//    //        .send({
//    //            //access_token:  'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTMzNjcsImV4cCI6MTQ4MDM5MzM3NywiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiN2I3NWFiNzBiNWViMTFlNmJlYjRiMzUwZjA1YzkxZGIiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.NVLQeD19yRj5x6oAMGnjYP7ZjicYgeX7wptoaflfWCN1kI3jT-r_xPyzIKUbV5K0fyicE8qjE6vlxdun5mk_FyHTDzAHbBVFXsNVT3emH0pOm7SVunmK2jrmYB3TX-x8YTkRmv-Re-8cDe6eEBT9f9ojrguCz15ZuVsx5KlBzZyOMlV8VW10xnkr3Yp3q-QKSX2HcJF57DHMwdMEoHIL25ExVmztBjeXKjJBC3wXJfqVGCuWoJv38ck4OagHJY4w2ZYw5iU1rzqWyZWp1AnqDWsYIDhW_79sI6UWXamVNbgErUE6Pn37ee5H-KD7ArRLk3rnXy_OUO6bFojavNSkNQ',
//    //            access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTM4ODUsImV4cCI6MTQ4MDk5ODY4NSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiYjA2NWE2ZTBiNWVjMTFlNjk4Mzg5ZGU1YjllMGJkYzQiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.1dja2V8T6Vdl6cQIp0fSGRY5bEpCVjkWEp9wHUoMqhTzKi3MInnTaerK71F612NN67zNOVUi6e1tO6lIf-QwL6_tAS0PdsV8Dz2gyxXjf13fkbf1dyYD2cQYxFH3roSFok5adayVCT0qWXu7skPp5mfiMU8Thf0l_qTEDH_VvdnHPvZqEuGnSqLQRFkCAFtJh9364P3172pDx4Oe10_t1a7Q0rmCjK2qyf2z6czPiezftWat08McIeKfIrO8YQS_-52myWR8H3QyhmM3D1oCHHHlMl1sLH7-mXYvRaZ6WKluWjNEFywijDo3PQ7TcrYA7vdiTEat2DkCJo8pzxTh-Q',
//    //            //appid: '6c8c8dc48280ed2163136ad416e1dbfe',
//    //             phone: "8615935159642",
//    //             type:0,
//    //        })
//    //        .expect(200, function(err1, res1) {
//    //            console.log(res1.body)
//    //            console.log(res1.body.result.validateCode)
//    //            should.not.exist(err1);
//    //
//    //        });
//    //});
//
//    //it('should register', function(done) {
//    //    request.post('/user/register')
//    //        .send({
//    //            access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTM4ODUsImV4cCI6MTQ4MDk5ODY4NSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiYjA2NWE2ZTBiNWVjMTFlNjk4Mzg5ZGU1YjllMGJkYzQiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.1dja2V8T6Vdl6cQIp0fSGRY5bEpCVjkWEp9wHUoMqhTzKi3MInnTaerK71F612NN67zNOVUi6e1tO6lIf-QwL6_tAS0PdsV8Dz2gyxXjf13fkbf1dyYD2cQYxFH3roSFok5adayVCT0qWXu7skPp5mfiMU8Thf0l_qTEDH_VvdnHPvZqEuGnSqLQRFkCAFtJh9364P3172pDx4Oe10_t1a7Q0rmCjK2qyf2z6czPiezftWat08McIeKfIrO8YQS_-52myWR8H3QyhmM3D1oCHHHlMl1sLH7-mXYvRaZ6WKluWjNEFywijDo3PQ7TcrYA7vdiTEat2DkCJo8pzxTh-Q',
//    //            username: '8615935159642',
//    //            password: "123456",
//    //            vcode:'000112'
//    //            //000094
//    //        })
//    //        .expect(200, function(err1, res1) {
//    //            console.log(res1.body)
//    //            should.not.exist(err1);
//    //            done();
//    //            // res.text.should.containEql('用户名或密码不能为空');
//    //
//    //        });
//    //});
//
//    //it('should login', function(done) {
//    //    request.post('/user/login')
//    //        .send({
//    //            access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTM4ODUsImV4cCI6MTQ4MDk5ODY4NSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiYjA2NWE2ZTBiNWVjMTFlNjk4Mzg5ZGU1YjllMGJkYzQiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.1dja2V8T6Vdl6cQIp0fSGRY5bEpCVjkWEp9wHUoMqhTzKi3MInnTaerK71F612NN67zNOVUi6e1tO6lIf-QwL6_tAS0PdsV8Dz2gyxXjf13fkbf1dyYD2cQYxFH3roSFok5adayVCT0qWXu7skPp5mfiMU8Thf0l_qTEDH_VvdnHPvZqEuGnSqLQRFkCAFtJh9364P3172pDx4Oe10_t1a7Q0rmCjK2qyf2z6czPiezftWat08McIeKfIrO8YQS_-52myWR8H3QyhmM3D1oCHHHlMl1sLH7-mXYvRaZ6WKluWjNEFywijDo3PQ7TcrYA7vdiTEat2DkCJo8pzxTh-Q',
//    //            username: '8618321538399',
//    //            password: "password"
//    //        })
//    //        .expect(200, function(err1, res1) {
//    //            console.log(res1.body)
//    //            should.not.exist(err1);
//    //            done();
//    //            // res.text.should.containEql('用户名或密码不能为空');
//    //
//    //        });
//    //});
//
//    //it('should getAccessToken', function(done) {
//    //    request.post('/user/sendsms')
//    //        .send({
//    //            access_token:"access_token",
//    //            appid: '6c8c8dc48280ed2163136ad416e1dbfe',
//    //            password: "password",
//    //            t:1,
//    //            lg:"zh-CN"
//    //        }).set('auth',"auth")
//    //        .expect(200, function(err1, res1) {
//    //            console.log(res1.body)
//    //            should.not.exist(err1);
//    //            // res.body.status.should.eql(401);
//    //            // res.text.should.containEql('用户名或密码不能为空');
//    //            done();
//    //        });
//    //});
//});