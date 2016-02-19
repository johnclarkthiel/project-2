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


//middleware
app.use(express.static('public'))
app.use(morgan('dev'));



//test index page
app.get('/', function(req,res){
	res.render('index.ejs');
});

//controllers
var allusersController = require('./controllers/allusers.js') 

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
