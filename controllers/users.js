var express = require('express');
var router = express.Router();

var User = require('../models/users.js');
var Blog = require('../models/blogs.js');

//INDEX ==>>>> private show page for user=
router.get('/:id', function(req,res) {
	User.findById(req.params.id, function(err, user){
		// console.log(user);
		res.render('user/index.ejs', {
			user : user
		});
	});
});

// //SHOW ===> get show/edit page
// router.get('/:id/edit', function(req,res) {
// 	User.findById(req.params.id, function(err, user) {
// 		res.render('user/show.ejs', {
// 			user : user
// 		});
// 	});
// });

//need an edit page ... goes to id/edit/blog_id
router.get('/edit/:id', function(req, res){
	Blog.findById(req.params.id, function(err, blogpost){
		if (err) {console.log(err); res.send(err); };
		console.log(blogpost);
		res.render('user/edit.ejs', {
			blogpost : blogpost
		});
	});
});

//logout???

//go to CREATE PAGE ===>>> new/create page
router.get('/:id/new', function(req,res){
	User.findById(req.params.id, function(err, user){

		res.render('user/new.ejs', {
			user : user
		});
	});
});
//create new blog post on new/create page
router.post('/:id/new', function(req,res){
	User.findById(req.params.id, function(err, user) {
		console.log('REQ BODY >>>>>>>' + req.body + '----END---' + user);
		//create new blog post
		var newBlog = new Blog(req.body);

		console.log('NEW BLOG: ' + newBlog + '-------');

		//savenew blog post
		newBlog.save(function(err, blogs) {
			if(err) {console.log(err); res.send(err);}

			console.log(blogs + '----SAVED NEW BLOG POST!!!!----');

			user.blog.push(blogs);

			console.log('BLOG POST ' + blogs + 'PUSHED INTO USER: ' + user + '----------');

			user.save(function(err){
				if (err) {console.log(err); res.send(err); };
				res.redirect('/users/' + req.params.id);
			});
		});
	});
});


//need a put function here

//need a delete function somewhere
router.post('/:id/edit/blog_id', function(req,res){
	
});


module.exports = router;

//////////////////////////
////OLDCODE//////////////
//create new blog post
// router.post('/:id/new', function(req,res){
// 	User.findById(req.params.id, function(err, user) {

// 		user.blog.push(req.body);

// 		user.save(function(err, result){
// 			if (err) {console.log(err); res.send(err); };

// 			console.log('SAVED' + user);
// 			res.redirect('/users/' + req.params.id);
// 		});
// 	});
// });

