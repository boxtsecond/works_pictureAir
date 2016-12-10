var NodeCache = require( "node-cache" );
var rmsCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

var cache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
// obj = { my: "Special", variable: 42 };
// myCache.set( "myKey", obj, function( err, success ){
//     if( !err && success ){
//         console.log( success );
//         // true
//         // ... do something ...
//         myCache.get("myKey",function (err1,obj) {
//             console.log( err1, obj);
//         })
//     }
// });


models.exports={
    cache:cache,
    rmsCache:rmsCache
}