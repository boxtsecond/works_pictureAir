var util = require('util')

var AbstractError = function (msg, constr) {
    Error.captureStackTrace(this, constr || this)
    this.message = msg || 'Error'
}
util.inherits(AbstractError, Error)
AbstractError.prototype.name = 'Abstract Error'

var DatabaseError = function (msg) {
    DatabaseError.super_.call(this, msg, this.constructor)
}
util.inherits(DatabaseError, AbstractError)
DatabaseError.prototype.name = 'Database Error'

module.exports = {
    Database: DatabaseError
}
var ApplicationError = {
    Database: DatabaseError
}

function getUserById(id, callback) {
    if (!id) {
        return callback(new Error('Id is required'))
    }

    if (id > 10) {
        throw new Error('first argument must be a string or Buffer');
       // return callback(new ApplicationError.Database('Id cant ↵ be higher than 10'))
    }

    callback(null, { name: 'Harry Goldfarb' })
}

getUserById(11,function(err){
    console.log(err)
})