var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users.js');
var Blog = require('../models/blogs.js');
mongoose.set('debug', true); //was going insane trying to figure out update/put until a kind fellow on Stack O. advised using this

var passport = require('passport');

// //restricted access 
router.get('/', function(req,res){
	res.locals.login = req.isAuthenticated();
	User.findById(req.params.id, function(err,user){
		if (err) {console.log(err); res.send(err); };
		res.render('users/index.ejs', {
			user : user 
		})
	})
})

//logout
router.get('/:id/logout', function(req,res){
	req.logout();
	res.redirect('/allusers');
});


// INDEX ==>>>> private show page for user=
// router.get('/:id', function(req,res) {
// 	User.findById(req.params.id, function(err, user){
// 		// console.log(user);
// 		res.render('user/index.ejs', {
// 			user : user
// 		});
// 	});
// });

//show page for user only
router.get('/:id', loggedIn, function(req,res){
	if (req.params.id == req.user.id) {
		User.findById(req.params.id, function(err, user){
			res.render('user/index.ejs', {
				user : user
			});
		});
	}//<< if close
});


//go to CREATE PAGE ===>>> new/create page
router.get('/:id/new', function(req,res){
	res.locals.user = req.user;
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

//need an edit page ... goes to id/edit/blog_id
router.get('/edit/:id', function(req, res){
	res.locals.user = req.user;
	Blog.findById(req.params.id, function(err, blogpost){
		if (err) {console.log(err); res.send(err); };
		// console.log(blogpost);
		res.render('user/edit.ejs', {
			blogpost : blogpost
		});
	});
});

//SHOW ===> get show/edit page
router.get('/show/:id', function(req,res) {
	res.locals.user = req.user;
	Blog.findById(req.params.id, function(err, blogpost) {
		if (err) {console.log(err); res.send(err); };
		// console.log('BLOGPOST' + blogpost);
		res.render('user/show.ejs', {
			blogpost : blogpost
		});
	});
});


//UPDATE --> need a put function here
router.put('/:id', function(req,res){
	res.locals.user = req.user;
	Blog.findByIdAndUpdate(req.params.id, req.body, function(err,blogpost){
		console.log("REQ PARAMS ID " + req.params.id);
		if (err) {console.log(err); res.send(err); };
		console.log('BLOGGER >>>>> ' + blogpost.blogger);

		User.findById(blogpost.blogger,
 
			function(err,user){
			if (err) {console.log(err); res.send(err); };
			console.log('USER Blog' + user.blog);
			var bloggy = user.blog;
			console.log('Bloggy ' + bloggy);
			// console.log('BLOGGY ID ' + bloggy.id);
			for (var i = 0; i < bloggy.length; i++) {
				if (bloggy[i].id == req.params.id) {
					user.blog[i].title = blogpost.title;
					console.log(user.blog[i].title);
					user.blog[i].hed = blogpost.hed;
					console.log(user.blog[i].hed);
					user.blog[i].dek = blogpost.dek;
					console.log(user.blog[i].dek);
					user.blog[i].published = blogpost.published;
					console.log(user.blog[i].published);
				}//<<<<<<< end if
			}//<<<<<<<< end for
			user.save(function (err) {
				res.redirect('/users/show/' + req.params.id)
			});
		});
	});
});

router.delete('/:id', function(req,res){

	console.log(req.body.blog_id);

		Blog.findByIdAndRemove(req.body.blog_id, function(err,blogpost){
			if (err) {console.log(err); res.send(err); };
			console.log('BLOG POST >>>> ' + blogpost);
			var btitle = blogpost.title;
			var bid = blogpost.id;

			User.update({}, {$pull: {blog : { title : btitle }}}, {multi : true}, function(err,userb){
				console.log('USER BLOG >>>>' + userb);
				if (err) {console.log(err); res.send(err); };
				res.redirect('/users/' + req.params.id);	
		});
	});
});

//login check
function loggedIn(req,res,next){
	console.log('LOGGED IN CHECKER');
	if (req.isAuthenticated()) {
		console.log('YAY, AUTHENTICATED/LOGGED IN');
		return next();
	} else {
		res.redirect('/');
	}
}


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
			// Blog.find(req.params.id, function(err,userblog){
			// 	console.log('BLOG FIND' + userblog);
			// 	var deleteArr = [];

			// 	userblog.forEach(function(title){
			// 		// console.log("FOR EACH " + title._id);
			// 		deleteArr.push(title._id);
			// 	})

			// 	User.find({ _id: { $in: deleteArr} } , function(err, users){
			// 		console.log('USER BLOG' + users);
			// 		if (err) {console.log(err); res.send(err); };
			// 		res.redirect('/users/' + req.params.id);
			// 	});
			// });
//users.update({'blog.title' : "Old Greg"}, {'$set' : { 'blog.$.title' : 'New Greg'}})
//{ _id : blogpost.blogger}, { blog  :{$elemMatch : {"_id" : req.params.id}}}
// router.put('/show/:id', function(req,res){
// 	Blog.findByIdAndUpdate(req.params.id, req.body, function(err, blogpost){
// 		if (err) {console.log(err); res.send(err); };
// 		User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
// 			res.redirect('/allusers/blog/' + req.params.id);
// 		})
// 	})
// })

//		User.update({}, {$pull: { blog  :{$elemMatch : {"_id" : req.params.id}}}}, {multi : true}, 
			// function(err,user){
			// 	if (err) {console.log(err); res.send(err); };
			// 	console.log('USER BLOG >>>>> ' + user);

			// 	User.find({}, function(err,user){
			// 		console.log(user[0].blog);
			// 		user[0].blog.push(req.body);
			// 		if (err) {console.log(err); res.send(err); };
			// 		res.redirect('/users/show/' + req.params.id);		
			// 	});	

//db.users.update({'blog._id' : ObjectId("56ca11b4eef82a913168a770")}, {'$set' : { 'blog.$.title' : 'New Greg', 'blog.$.hed' : 'New Greg'}})
//,{'$set' : {'blog.$.title' : blogpost.title, 'blog.$.hed' : blogpost.hed, 'blog.$.dek' : blogpost.dek, 'blog.$.published' : blogpost.published}}
//{$set: {blog : {'blog.$.title' : blogpost.title, 'blog.$.hed' : blogpost.hed,'blog.$.dek' : blogpost.dek, 'blog.$.published' : blogpost.published}}}, {multi: false},
//need a delete function somewhere
