//Requirements
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');


var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/very_blog';

//for home page
var User = require('./models/users.js');
var Blog = require('./models/blogs.js');

//pass port config load
require('./config/passport')(passport);

//middleware
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//passport middleware
var passport = require('passport');

var session = require('express-session');

app.use(session({name: 'blog_auth_app', secret: 'something'}));
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', function(req,res,next){
// 	res.locals.login = req.isAuthenticated();
// });

//index page
app.get('/', function(req,res){
	User.find({}, function(err, users){
		res.render('index.ejs', {
			users : users
		});
	})
});

//controllers
//for public access
var allusersController = require('./controllers/allusers.js');
app.use('/allusers', allusersController);

//for private access <<<<<<<<< for some reason this is breaking it
var usersController = require('./controllers/users.js');
app.use('/users', usersController);

//blog controller???? 


//mongoose
mongoose.connect(mongoURI);

mongoose.connection.on('error', function(){
	console.log('MONGO not connected');
})

//port
mongoose.connection.once('open', function(){
		console.log('MONGO connected');
		app.listen(port, function(){
		console.log("Listening on port:" + port);
	});
});
