var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newComment = new Schema();

newComment.add({
		comments : { type: String, required: true }
});

var Comment = mongoose.model('Comment', newComment);

module.exports = Comment;

