var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = require('./users.js').schema;

var newBlog = new Schema({
		title : { type: String, unique: true, required: true },
		hed : {type : String},
		dek : {type : String, requried: true},
		date : {type : Date, default: Date.now},
		published : {type: Boolean}
		// author : [userSchema]
});

var Blog = mongoose.model('Blog', newBlog);
module.exports = Blog;