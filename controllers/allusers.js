var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/users.js');
var Blog = require('../models/blogs.js');
var Comment = require('../models/comments.js')

var passport = require('passport');

//get index page for all authors ... each needs a link to an individual author
router.get('/', function(req,res){
	// res.send('All users index page');
	User.find({}, function(err, users){
			res.render('allusers/index.ejs', {
			users : users
		});
	});
});

//logout
router.get('/logout', function(req,res){
	console.log("LOGOUT PRESSED");
	req.logout();
	res.redirect('/');
});

//signup -- for now just link to public show page
// router.post('/', function(req,res){
// 	console.log(req.body);
// 	var newUser = new User(req.body);
// 	console.log('NEW USER ' + newUser);

// 	newUser.save(function(err,users){
// 		console.log('NEW USER SAVED');
// 		res.redirect('/users/' + newUser.id); //add a private path
// 	});
// });

//signup with authentication
router.post('/', passport.authenticate('local-signup', {
	failureRedirect: '/'}), function(req,res) {
		console.log("SUCCESS!");
		res.redirect('/users/' + req.user.id);
});

//login
router.post('/login', passport.authenticate('local-login',{
	failureRedirect: '/'}), function(req,res){
	console.log('LOGGGED IN, YA');
	res.redirect('/users/' + req.user.id);
});

//show public user index page -- all users
router.get('/:id', function(req,res){
	User.findById(req.params.id, function(err, users){
		res.render('allusers/show.ejs', {
			users : users
		});
	});
});

//show each individual page
router.get('/blog/:id', function(req,res){
	res.locals.login = req.isAuthenticated();
	res.locals.user = req.user;
	// console.log('REQ USER' + req.user);
	Blog.findById(req.params.id, function(err, blogpost){
		res.render('allusers/blogpost.ejs', {
			blogpost : blogpost 
		});
	});
});

//post for comments
router.post('/blog/:id', function(req,res){
	Blog.findById(req.params.id, function(err, blogpost){
		if (err) {console.log(err); res.send(err); }
		console.log('BLOG >>>>' + blogpost);

		console.log('Comments >>>>' + req.body.comments);
		var newComment = new Comment({ comments :req.body.comments});
		console.log('NEW COMMENT ' + newComment);

		newComment.save(function(err, comment){
			if (err) {console.log(err); res.send(err);}
			blogpost.comments.push(comment);

			blogpost.save(function(err){
			if (err) {console.log(err); res.send(err);}
				res.redirect('/allusers/blog/' + req.params.id);
			});
		});
	});
});



module.exports = router;