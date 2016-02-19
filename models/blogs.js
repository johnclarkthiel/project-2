var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newBlog = new Schema({
		title : { type: String, unique: true, required: true },
		hed : {type : String, required: true},
		dek : {type : String, required: true},
		date : {type : Date, default: Date.now,required: true }
});

var Blog = mongoose.model('Blog', newBlog);
module.exports = Blog;