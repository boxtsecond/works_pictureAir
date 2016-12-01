var apns = require('apns'), options, connection;
var path = require('path');

//---------photoPass---------
options = {
    keyFile: path.join(__dirname,  'PushChatKey.pem'),
    certFile: path.join(__dirname, 'PushChatCert.pem'),
    debug: false,
    passphrase: 'pw0987123456',
    gateway: "gateway.push.apple.com"
};
connection = new apns.Connection(options);

//-----------pictureAir---------
pictureAir_options = {
    keyFile: path.join(__dirname,  'pictureAirKey.pem'),
    certFile: path.join(__dirname, 'pictureAirCert.pem'),
    debug: false,
    passphrase: '12345678',
    gateway: "gateway.sandbox.push.apple.com"
};
pictureAir_connection = new apns.Connection(pictureAir_options);

//-----------Guide Rebate---------
guideRebate_options = {
    keyFile: path.join(__dirname,  'GuideRebateKey.pem'),
    certFile: path.join(__dirname, 'GuideRebateCert.pem'),
    debug: false,
    passphrase: 'disney',
    gateway: "gateway.sandbox.push.apple.com"
};
guideRebate_connection = new apns.Connection(guideRebate_options);
console.log('open apns connection');
console.log('open pictureAir apns connection');
console.log('open guideRebate apns connection');
exports.apns = apns;
exports.connection = connection;
exports.sendNotification = function (notification, appName) {
    if (appName == null||appName=='photoPass') {
        connection.sendNotification(notification);
    }else if(appName=='pictureAir'){
        pictureAir_connection.sendNotification((notification));
    }else if(appName=='guideRebate'){
        guideRebate_connection.sendNotification((notification));
        console.log('success');
    }
}

