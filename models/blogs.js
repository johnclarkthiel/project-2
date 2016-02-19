var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = require('./blogs.js').schema;

var newBlog = new Schema({
		title : { type: String, unique: true, required: true },
		hed : {type : String, required: true},
		dek : {type : String, required: true},
		date : {type : Date, default: Date.now,required: true },
		published : {type: Boolean, required: true},
		author : [userSchema]
});

var Blog = mongoose.model('Blog', newBlog);
module.exports = Blog;