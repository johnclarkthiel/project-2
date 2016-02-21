var express = require('express');
var router = express.Router();

var User = require('../models/users.js');
var Blog = require('../models/blogs.js');

//get index page for all authors ... each needs a link to an individual author
router.get('/', function(req,res){
	// res.send('All users index page');
	User.find({}, function(err, users){
			res.render('allusers/index.ejs', {
			users : users
		});
	});
});

//logout ??? 

//signup -- for now just link to public show page
router.post('/', function(req,res){
	console.log(req.body);
	var newUser = new User(req.body);
	console.log('NEW USER ' + newUser);

	newUser.save(function(err,users){
		console.log('NEW USER SAVED');
		res.redirect('/users/' + newUser.id); //add a private path
	});
});

//login

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
	Blog.findById(req.params.id, function(err, blogpost){
		res.render('allusers/blogpost.ejs', {
			blogpost : blogpost 
		});
	});
});



module.exports = router;