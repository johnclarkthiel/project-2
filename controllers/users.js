var express = require('express');
var router = express.Router();

var User = require('../models/users.js');
var Blog = require('../models/blogs.js');

//INDEX ==>>>> private show page for user=
router.get('/:id', function(req,res) {
	User.find(req.params.id, function(err, user){
		res.render('user/index.ejs', {
			user : user
		});
	});
});

//SHOW ===> get show/edit page
router.get('/:id/edit', function(req,res) {
	User.find(req.params.id, function(err, user) {
		res.render('user/show.ejs', {
			user : user
		});
	});
});

//logout???

//go to CREATE PAGE ===>>> new/create page
router.get('/:id/new', function(req,res){
	User.find(req.params.id, function(err, user){
		res.render('user/new.ejs', {
			user : user
		});
	});
});

//create new blog post on new/create page

//need a put function here

//need a delete function somewhere


module.exports = router;