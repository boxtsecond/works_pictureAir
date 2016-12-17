/**
 * Created by meteor on 16/11/22.
 */
var crypto=require('crypto');
function md5(str){
    var md5sum=crypto.createHash('md5');
    md5sum.update(str);
    str=md5sum.digest('hex');
    return str;
}
var assert = require('assert');
var request = require('supertest');
var should=require('should');
request = request('http://localhost:4001');

describe('/auth/getAccessToken', function() {
    // it('should getAccessToken', function(done) {
    //     request.post('/auth/getAccessToken')
    //         .send({
    //             appid: '6c8c8dc48280ed2163136ad416e1dbfe',
    //             password: "password",
    //             t:1,
    //             lg:"zh-CN"
    //         })
    //         .expect(200, function(err, res) {
    //             console.log(res.body);
    //             done();
    //         });
    //
    // });

    // it('should getAccessToken2', function(done) {
    //    request.post('/g/user/sendsms')
    //        .send({
    //            //access_token:  'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTMzNjcsImV4cCI6MTQ4MDM5MzM3NywiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiN2I3NWFiNzBiNWViMTFlNmJlYjRiMzUwZjA1YzkxZGIiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.NVLQeD19yRj5x6oAMGnjYP7ZjicYgeX7wptoaflfWCN1kI3jT-r_xPyzIKUbV5K0fyicE8qjE6vlxdun5mk_FyHTDzAHbBVFXsNVT3emH0pOm7SVunmK2jrmYB3TX-x8YTkRmv-Re-8cDe6eEBT9f9ojrguCz15ZuVsx5KlBzZyOMlV8VW10xnkr3Yp3q-QKSX2HcJF57DHMwdMEoHIL25ExVmztBjeXKjJBC3wXJfqVGCuWoJv38ck4OagHJY4w2ZYw5iU1rzqWyZWp1AnqDWsYIDhW_79sI6UWXamVNbgErUE6Pn37ee5H-KD7ArRLk3rnXy_OUO6bFojavNSkNQ',
    //            // access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTM4ODUsImV4cCI6MTQ4MDk5ODY4NSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiYjA2NWE2ZTBiNWVjMTFlNjk4Mzg5ZGU1YjllMGJkYzQiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.1dja2V8T6Vdl6cQIp0fSGRY5bEpCVjkWEp9wHUoMqhTzKi3MInnTaerK71F612NN67zNOVUi6e1tO6lIf-QwL6_tAS0PdsV8Dz2gyxXjf13fkbf1dyYD2cQYxFH3roSFok5adayVCT0qWXu7skPp5mfiMU8Thf0l_qTEDH_VvdnHPvZqEuGnSqLQRFkCAFtJh9364P3172pDx4Oe10_t1a7Q0rmCjK2qyf2z6czPiezftWat08McIeKfIrO8YQS_-52myWR8H3QyhmM3D1oCHHHlMl1sLH7-mXYvRaZ6WKluWjNEFywijDo3PQ7TcrYA7vdiTEat2DkCJo8pzxTh-Q',
    //            access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODE2OTQ4MTEsImV4cCI6MTQ4MjI5OTYxMSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiYTQ3NGRkNzBjMWMxMTFlNmFhYjA2ZDVkYjE0ZjczZjkiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.d7EGPexfqKT4Z0rNcz-l_hiaGpLBfoacwazRvpnSQFi8rgMTPuOqMgBOONM4JMGYYs1H4SipE_U9VsydrM6DMtv9vBfSrISgUBwdymxgfmLgzV_ORN_KAui4T9mpG1d5_8gC0GChtXYNdEULAALSSnHUBDf6spNcGD5eJfNSH5Ih9LKk6dz0mAAAzdzQw8aW5JqUXLgbiRgiDkClMRUkv_GtrDpW9fM47_x9NgDK4hd7Jpp-KI_jDjtdNSbc5RDCJMvqL2JSFzc563SFb4aMlCD8b0hpMQuRYJBpkuai0ANg81C2FddUglNwn0ZYZjKgXlH8UzrEPUP8D9r4KiEXhQ',
    //            //appid: '6c8c8dc48280ed2163136ad416e1dbfe',
    //            phone: "8618321538399",
    //            // phone: "8615802136305",
    //             type:0
    //        })
    //        .expect(200, function(err1, res1) {
    //            console.log(res1.body)
    //            console.log(res1.body.result.validateCode)
    //            should.not.exist(err1);
    //
    //        });
    // });

    // it('should register', function(done) {
    //    request.post('/g/user/register')
    //        .send({
    //            // username: '8618321538399',
    //            access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODE3Njc5MjUsImV4cCI6MTQ4MjM3MjcyNSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiZTAxNGFmNDBjMjZiMTFlNmIwNjIyOWE5MWViODNiMjEiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MCwibGciOiJlbi1VUyJ9.HzZKsUDIonJmSwmNowoG_lno6l57GFeDD26vmybJ4lQudx49Wr_MdUCUVC4zwen9_xgguF-xHd54g2gkuWG1sbUHpHLkLY35-CBiYov_ZWHO6KGxT0J3W_QmHCGzxLaTIOl8pjMxcZFhsK4GJoSMLZ-nbVy_giYQ12x-rR_FKBK2Nm652e85H1q6xKcE5FB8IhL6Md2N8mVfTLs57lOBCkmqUtGgotpCwoY0yGyRXlagGqMu5j-ZoVsgIhqytOEXLAE_611Ggb4K2nkfa4CfZMEVmRd_TICUDF4rq_mQs0qxQZlXRhIFC0YXDbqMG29JkTRXMCa2Zq68xHXSyvp6Tg',
    //            // username: 'meteor.liu@pictureworks.biz',
    //            username: '123@123.com',
    //            password: md5("123456"),
    //            vcode:'000184'
    //            //000094
    //        })
    //        .expect(200, function(err1, res1) {
    //            console.log(res1.body)
    //            should.not.exist(err1);
    //            done();
    //            // res.text.should.containEql('用户名或密码不能为空');
    //
    //        });
    // });

    it('should login', function(done) {
        request.post('/g/user/login')
            .send({
                access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODE4ODU2NTQsImV4cCI6MTQ4MjQ5MDQ1NCwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiZmMxZGFiNzBjMzdkMTFlNjlkMWE5NWE3YmFiZThjZTgiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.GKjhhbhps9GVFlEzHh56RD6BWTR8yKFp5pZgUnRmF6fI74d7_WfxWNQpkPEeM1gxHtOLy44g1yJd--mT974YkGWTfJ-u607YXCEkWrkkTyH8vtt3BOyhFMNsZNNn3PhloobZOaD1lTw_9vRoClJGUnI4qlBh1Ubh30Inq5QXNtrgn78XG5Ky9wiFCwbbeoE7LaD2VAi091Rzswsh-hLkbFjmms4P7LFEhAr8NmXHbwAhPktamb3si6NJNGR4wXw8RP3IYKTIzkCAiNYSFIa_G6_vdAX3ziKVxEGy290dQ7Wfr0MGUjl-UfnU0O5MgqAjDypWeIHXGBv4sa8KaN9f9w',
                username: '8615802136305',
                password: md5("123456")
                // username: '1@1.com',
                // password: md5("000000")
            })
            .expect(200, function(err1, res1) {
                console.log(res1.body)
                // console.log(res1.body.result.user.customerIds)
                should.not.exist(err1);
                done();
                // res.text.should.containEql('用户名或密码不能为空');
            });
    });

    // it('should sendsms forgotpwd', function(done) {
    //    request.post('/g/user/sendsms')
    //        .send({
    //            access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODE1MTc1NDksImV4cCI6MTQ4MjEyMjM0OSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiZWMzZDYxMjBjMDI0MTFlNmEwMTIzMWJjMGI5ZGRlNmUiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.pFQLSjzyqMmxDnlYGbM7-xx65tShwjYahfYAnLoQE854eCQcwWEX6X9tYswTE61F6wK5Ybh6B2BoAM4xGNsarrsZ2cXGlWRPl6CLHm-_cRDl1eKGp04eGPxjqvLBIEoeNHaU9KLETdg-bnE1jH1LlyJpmHm1kkeuwqFv_imeaOeBiTxjXnpu16OVdkOqnXe__VhdVkVuuadGBQ5HQ3XOZjQRgS7Fkpo8joay54NqfUXYRiDSG-2y75s_aL6kGrQBWyrKpN8hZytstbSRtYWvUknjNasUt6VxcGYJucrlkGKyrSRMYI5sYcOSOWnP1U-5TxrcINUbNSn8O5iIm7jADg',
    //      // access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTM4ODUsImV4cCI6MTQ4MDk5ODY4NSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiYjA2NWE2ZTBiNWVjMTFlNjk4Mzg5ZGU1YjllMGJkYzQiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.1dja2V8T6Vdl6cQIp0fSGRY5bEpCVjkWEp9wHUoMqhTzKi3MInnTaerK71F612NN67zNOVUi6e1tO6lIf-QwL6_tAS0PdsV8Dz2gyxXjf13fkbf1dyYD2cQYxFH3roSFok5adayVCT0qWXu7skPp5mfiMU8Thf0l_qTEDH_VvdnHPvZqEuGnSqLQRFkCAFtJh9364P3172pDx4Oe10_t1a7Q0rmCjK2qyf2z6czPiezftWat08McIeKfIrO8YQS_-52myWR8H3QyhmM3D1oCHHHlMl1sLH7-mXYvRaZ6WKluWjNEFywijDo3PQ7TcrYA7vdiTEat2DkCJo8pzxTh-Q',
    //            //appid: '6c8c8dc48280ed2163136ad416e1dbfe',
    //             phone: "8618321538399",
    //             type:1
    //        })
    //        .expect(200, function(err1, res1) {
    //            console.log(res1.body)
    //            console.log(res1.body.result.validateCode)
    //
    //        });
    // });
    //it('should forgotpwd', function(done) {
    //    request.post('/user/forgotpwd')
    //        .send({
    //            access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTM4ODUsImV4cCI6MTQ4MDk5ODY4NSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiYjA2NWE2ZTBiNWVjMTFlNjk4Mzg5ZGU1YjllMGJkYzQiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.1dja2V8T6Vdl6cQIp0fSGRY5bEpCVjkWEp9wHUoMqhTzKi3MInnTaerK71F612NN67zNOVUi6e1tO6lIf-QwL6_tAS0PdsV8Dz2gyxXjf13fkbf1dyYD2cQYxFH3roSFok5adayVCT0qWXu7skPp5mfiMU8Thf0l_qTEDH_VvdnHPvZqEuGnSqLQRFkCAFtJh9364P3172pDx4Oe10_t1a7Q0rmCjK2qyf2z6czPiezftWat08McIeKfIrO8YQS_-52myWR8H3QyhmM3D1oCHHHlMl1sLH7-mXYvRaZ6WKluWjNEFywijDo3PQ7TcrYA7vdiTEat2DkCJo8pzxTh-Q',
    //            username: '8618321538399',
    //            password: md5("123456"),
    //            vcode: '000140'
    //        })
    //        .expect(200, function(err1, res1) {
    //            console.log(res1.body)
    //            should.not.exist(err1);
    //            done();
    //            // res.text.should.containEql('用户名或密码不能为空');
    //
    //        });
    //});


    //it('should getAccessToken', function(done) {
    //    request.post('/user/sendsms')
    //        .send({
    //            access_token:"access_token",
    //            appid: '6c8c8dc48280ed2163136ad416e1dbfe',
    //            password: "password",
    //            t:1,
    //            lg:"zh-CN"
    //        }).set('auth',"auth")
    //        .expect(200, function(err1, res1) {
    //            console.log(res1.body)
    //            should.not.exist(err1);
    //            // res.body.status.should.eql(401);
    //            // res.text.should.containEql('用户名或密码不能为空');
    //            done();
    //        });
    //});

    // it('should login', function(done) {
    //     request.post('/p/user/switchlg')
    //         .send({
    //             // access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTM4ODUsImV4cCI6MTQ4MDk5ODY4NSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiYjA2NWE2ZTBiNWVjMTFlNjk4Mzg5ZGU1YjllMGJkYzQiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.1dja2V8T6Vdl6cQIp0fSGRY5bEpCVjkWEp9wHUoMqhTzKi3MInnTaerK71F612NN67zNOVUi6e1tO6lIf-QwL6_tAS0PdsV8Dz2gyxXjf13fkbf1dyYD2cQYxFH3roSFok5adayVCT0qWXu7skPp5mfiMU8Thf0l_qTEDH_VvdnHPvZqEuGnSqLQRFkCAFtJh9364P3172pDx4Oe10_t1a7Q0rmCjK2qyf2z6czPiezftWat08McIeKfIrO8YQS_-52myWR8H3QyhmM3D1oCHHHlMl1sLH7-mXYvRaZ6WKluWjNEFywijDo3PQ7TcrYA7vdiTEat2DkCJo8pzxTh-Q',
    //             //access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODA5NDU4MTcsImV4cCI6MTQ4MTU1MDYxNywiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiM2RlOTM2NzU4NGE2MTQ3ZTY3ZWRlMjdjNWJjOTI1NWYiLCJ0IjoxLCJsZyI6InpoLUNOIn0.WrW0j-rhdrvm2tnBiiGHru4AkOEkViNfPfc5VRTFKXS2T9LzugF9Xbf6xRfhu9I6rIeTGmeqnwI8nJiwfBJMKGjfyA0ciXmfDF-QOSCmSgKcNZvuttDrBY4wspxaqMH9kscrgZKJ8ZFWlq1A7anrMADhewTqBq1zG73ohJyX8KSh04OOtQ4qRhNgKD7oJzp29mO7ZWzL32xUyXGiJzVxDqAVkARz6IK-HtCsa_vIlH9vZkj0B5BH302zGkSdK_7SAhxjkaa5D0aTFrXKDOl3UdL0C29Qgc19LK2kjEqU-LlggRCLDX5I_amhfzZC6CjwpGaRPqs7bwyMaeHIefDsrA',
    //             access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODA5NDY5MTMsImV4cCI6MTQ4MTU1MTcxMywiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiM2RlOTM2NzU4NGE2MTQ3ZTY3ZWRlMjdjNWJjOTI1NWYiLCJ0IjoxLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwibGciOiJ6aC1DTiJ9.YaffcxXMQi04U51_ExsUl39gQr-_zw-OXyhB62p1Nu16dOJA2zq58xLW-KpnZG5C9FpkTr_69GriQ5yUut_hw_tGb_2YYZuYjsP41B4xU6oazdNOCBFs5Opo3rhAt5NmegeH_BQI0FCI0WNM-GY5Y9ZvY5U4RMgFCCP5GAveJtMsKDU9t2U3IAiACXOunkovw7Knfzi3-svavZOm3dg2iTjqhl_GU6F0mU8y9dXIW2UzUriNtLI1YvdXv8n0IPnd3MdHejOP-oVyB2BjnRJZ-Cz0UChDGegqMf8RLLaHduwvG76hhwaSp1nb_CG640CdsHpAy_i85Zzy7Q14wsaK2w',
    //             // lg:"zh-CN"
    //             lg:"en-US"
    //
    //         })
    //         .expect(200, function(err1, res1) {
    //             console.log(res1.body)
    //             done();
    //             // res.text.should.containEql('用户名或密码不能为空');
    //         });
    // });
    // it('should login', function(done) {
    //     request.post('/g/cache/carousel')
    //         .send({
    //             // access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODAzOTM4ODUsImV4cCI6MTQ4MDk5ODY4NSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiYjA2NWE2ZTBiNWVjMTFlNjk4Mzg5ZGU1YjllMGJkYzQiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.1dja2V8T6Vdl6cQIp0fSGRY5bEpCVjkWEp9wHUoMqhTzKi3MInnTaerK71F612NN67zNOVUi6e1tO6lIf-QwL6_tAS0PdsV8Dz2gyxXjf13fkbf1dyYD2cQYxFH3roSFok5adayVCT0qWXu7skPp5mfiMU8Thf0l_qTEDH_VvdnHPvZqEuGnSqLQRFkCAFtJh9364P3172pDx4Oe10_t1a7Q0rmCjK2qyf2z6czPiezftWat08McIeKfIrO8YQS_-52myWR8H3QyhmM3D1oCHHHlMl1sLH7-mXYvRaZ6WKluWjNEFywijDo3PQ7TcrYA7vdiTEat2DkCJo8pzxTh-Q',
    //             //access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODA5NDU4MTcsImV4cCI6MTQ4MTU1MDYxNywiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiM2RlOTM2NzU4NGE2MTQ3ZTY3ZWRlMjdjNWJjOTI1NWYiLCJ0IjoxLCJsZyI6InpoLUNOIn0.WrW0j-rhdrvm2tnBiiGHru4AkOEkViNfPfc5VRTFKXS2T9LzugF9Xbf6xRfhu9I6rIeTGmeqnwI8nJiwfBJMKGjfyA0ciXmfDF-QOSCmSgKcNZvuttDrBY4wspxaqMH9kscrgZKJ8ZFWlq1A7anrMADhewTqBq1zG73ohJyX8KSh04OOtQ4qRhNgKD7oJzp29mO7ZWzL32xUyXGiJzVxDqAVkARz6IK-HtCsa_vIlH9vZkj0B5BH302zGkSdK_7SAhxjkaa5D0aTFrXKDOl3UdL0C29Qgc19LK2kjEqU-LlggRCLDX5I_amhfzZC6CjwpGaRPqs7bwyMaeHIefDsrA',
    //             access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODA5NDY5MTMsImV4cCI6MTQ4MTU1MTcxMywiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiM2RlOTM2NzU4NGE2MTQ3ZTY3ZWRlMjdjNWJjOTI1NWYiLCJ0IjoxLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwibGciOiJ6aC1DTiJ9.YaffcxXMQi04U51_ExsUl39gQr-_zw-OXyhB62p1Nu16dOJA2zq58xLW-KpnZG5C9FpkTr_69GriQ5yUut_hw_tGb_2YYZuYjsP41B4xU6oazdNOCBFs5Opo3rhAt5NmegeH_BQI0FCI0WNM-GY5Y9ZvY5U4RMgFCCP5GAveJtMsKDU9t2U3IAiACXOunkovw7Knfzi3-svavZOm3dg2iTjqhl_GU6F0mU8y9dXIW2UzUriNtLI1YvdXv8n0IPnd3MdHejOP-oVyB2BjnRJZ-Cz0UChDGegqMf8RLLaHduwvG76hhwaSp1nb_CG640CdsHpAy_i85Zzy7Q14wsaK2w',
    //             // lg:"zh-CN"
    //             lg:"en-US"
    //
    //         })
    //         .expect(200, function(err1, res1) {
    //             console.log(res1.body)
    //             done();
    //             // res.text.should.containEql('用户名或密码不能为空');
    //         });
    // });

    // it('should login', function(done) {
    //     request.post('/g/user/sendemailpwd')
    //         .send({
    //             access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODEwMTcxNzUsImV4cCI6MTQ4MTYyMTk3NSwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiZTYyM2YxZjBiYjk3MTFlNmJmYWJlMzFmMGM3OGFhODYiLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwidCI6MSwibGciOiJ6aC1DTiJ9.FVfppNwtbekdEPDkLKz4QmQnETBeDwaIROThQ8hMPYgNx7mQ8AkTRfez5I-598hfLQ-EyYnkLGuMcnew8bh5bkTrgXoLKStyGIdWNvoV5csAXwXDOwODTETxLu5sJdg3OhSjVHspAT_K-9kPS3lEwS-7G8bs5ilrO16HKlGUsvdSjhsuzq6D1EZlpYCXkbfI_ne_bj1SqqZhOakZlYBMZXVokzf33-U7XKRJ4SkkLKfw861BdOQ46CnzUlkjObe3L1imx2dipbC6XCyL8ibLy9MD9Nruw5qWJ-Mk9gNzPINISRS5JA2lse8JztwRj4Hizef0rkH4-F1vRCJy5SXYXw',
    //             username: 'meteor.liu@pictureworks.biz'
    //         })
    //         .expect(200, function(err1, res1) {
    //             console.log(res1.body)
    //             done();
    //             // res.text.should.containEql('用户名或密码不能为空');
    //         });
    // });

    //            password: md5("123456")

    // it('should login', function(done) {
    //     request.post('/p/user/getuser')
    //         .send({
    //             access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODE1MjMzOTYsImV4cCI6MTQ4MjEyODE5NiwiaXNzIjoicGljdHVyZUFpciIsImF1ZGllbmNlIjoiM2RlOTM2NzU4NGE2MTQ3ZTY3ZWRlMjdjNWJjOTI1NWYiLCJ0IjoxLCJhcHBpZCI6IjZjOGM4ZGM0ODI4MGVkMjE2MzEzNmFkNDE2ZTFkYmZlIiwibGciOiJ6aC1DTiJ9.awi_rIohTU6iqFSNDSgZA2OJiMB49D6yuEuFItoFk0nx3kzhAS-5-k6dAN-6g2861Q44cNKE7dpIdIQ6Xr4RvSdyMjvqcOf3NlmTum5d1FoEYTsffPbvI41WVvw7v9dA8Ipq1TnOrtBCD9_IKw3toztQ89n0aIAGvaRdEQqQLoeo1BEV4vm6IM8veIB23NW4MO2aKAXWzSsmyI1kZSKfh_qqW_NCMncCnTjr1lTzMJyAyZ20YeGIGzQgVfb2u9LeqYR9LUPIwSa55eToT_D-54O1XDTL3j3GLoQb5e0hGpQu8wz52VT0OtXaNW23mC00E3Q0L48tAVk7LEzGIi56Kg'
    //             // ,username: '8618321538399',
    //             // password: md5("123456")
    //         })
    //         .expect(200, function(err1, res1) {
    //             console.log(res1.body)
    //             should.not.exist(err1);
    //             done();
    //             // res.text.should.containEql('用户名或密码不能为空');
    //         });
    // });
});