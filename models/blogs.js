var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = require('./users.js');
var commentSchema = require('./comments.js').schema;

var newBlog = new Schema();

newBlog.add({
		title : { type: String, unique: true, required: true },
		hed : {type : String},
		dek : {type : String, requried: true},
		date : {type : Date, default: Date.now},
		published : {type: Boolean},
		blogger : [userSchema],
		comments : [commentSchema]
});

var Blog = mongoose.model('Blog', newBlog);
module.exports = Blog;

//add imagee and link fields