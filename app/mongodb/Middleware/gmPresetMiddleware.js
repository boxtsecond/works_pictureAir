/**
 * Created by meteor on 14-9-19.
 */
//Serial串行
var schema = new Schema();
schema.pre('save',function(next){
    //做点什么
    next();
});
//Parallel并行
//var schema = new Schema(...);
//schema.pre('save',function(next,done){
//    //下一个要执行的中间件并行执行
//    next();
//    doAsync(done);
//});


//
//schema.pre('save',function(next){
//    var err = new Eerror('some err');
//    next(err);
//});
//entity.save(function(err){
//    console.log(err.message); //some err
//});