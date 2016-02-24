var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

//require blogs schema
var blogSchema = require('./blogs.js').schema;

var userSchema = new Schema();

userSchema.add({
		name : {type: String, required: true},
		email  : {type: String, required: true},
		password : {type: String, required: true},
		blog : [blogSchema]
});

//need to  define bcrypt methods here
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}


var User = mongoose.model('User', userSchema);

module.exports = User;