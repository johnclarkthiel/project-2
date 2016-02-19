var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrpyt-nodejs');
//require blogs schema
var blogSchema = require('./blogs.js').schema;

var userSchema = new Schema({
		name : {type: String, required: true},
		email  : {type: String, unique: true, required: true},
		password : {type: String, required: true},
		blog : [blogSchema]
});

//need to  define bcrypt methods here







var User = mongoose.model('User', userSchema);

module.exports = User;