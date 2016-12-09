/**
 * Created by meteor on 16/12/8.
 */
const NodeCache = require( "node-cache" );
// const myCache = new NodeCache();

const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

obj = { my: "Special", variable: 42 };
myCache.set( "myKey", obj, function( err, success ){
    if( !err && success ){
        console.log( success );
        // true
        // ... do something ...
        myCache.get("myKey",function (err1,obj) {
            console.log( err1, obj);
        })
    }
});