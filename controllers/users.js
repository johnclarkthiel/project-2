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

//need an edit page ... goes to id/edit/blog_id
router.get('/edit/:id', function(req, res){
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
	Blog.findById(req.params.id, function(err, blogpost) {
		if (err) {console.log(err); res.send(err); };
		// console.log('BLOGPOST' + blogpost);
		res.render('user/show.ejs', {
			blogpost : blogpost
		});
	});
});


//logout???

//UPDATE --> need a put function here
router.put('/:id', function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body, function(err,blogpost){
		console.log("REQ PARAMS ID " + req.params.id);
		if (err) {console.log(err); res.send(err); };
		console.log('BLOGGER >>>>> ' + blogpost);

		User.find(blogpost.blogger,
			// {'$set' : {
			// 	'blog.$.title' : blogpost.title, 'blog.$.hed' : blogpost.hed,
			// 	'blog.$.dek' : blogpost.dek, 'blog.$.published' : blogpost.published}
			// }, 
			function(err,user){
			if (err) {console.log(err); res.send(err); };
			console.log(user.name);
			console.log('USER' + user);
			res.redirect('/users/show/' + req.params.id)
		})
	});
});
//db.users.update({'blog._id' : ObjectId("56ca11b4eef82a913168a770")}, {'$set' : { 'blog.$.title' : 'New Greg', 'blog.$.hed' : 'New Greg'}})
//,{'$set' : {'blog.$.title' : blogpost.title, 'blog.$.hed' : blogpost.hed, 'blog.$.dek' : blogpost.dek, 'blog.$.published' : blogpost.published}}
//{$set: {blog : {'blog.$.title' : blogpost.title, 'blog.$.hed' : blogpost.hed,'blog.$.dek' : blogpost.dek, 'blog.$.published' : blogpost.published}}}, {multi: false},
//need a delete function somewhere
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
