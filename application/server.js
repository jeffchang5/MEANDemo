'use strict';
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var gplace_api = require('./config/gplace_api');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var user = require('./models/user');
var request = require('request');


var queryURL = (gplace_api.url +
    gplace_api.parameters +
    '&key=' +
    gplace_api.key
);

app.set('view engine', 'jade');
app.use(bodyParser.json())

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost:27017/user');
app.use('api/*', function(req, res, next) {
    if (req.isAuthenticated == true) {
        next();
    } else {
        res.json({
            auth: false
        });
        res.end();
    }
})



app.get('/', function(req, res) {
    res.render('intro');
});
app.post('/signup', function(req, res) {

	var data = req.body;
	user.checkUser(data.username, function (bool) {
		if (bool) {
		  	res.json({
	        	auth: false,
	        	error: "User already exists"
	    	});
	  	}
		else {
		    req.isAuthenticated = true;
		    user.save(data.username, data.password);
		    res.json({
		        auth: true
		    });
		}
	});



});
app.post('/login', function(req, res) {

	var data = req.body;


	user.login(data.username, data.password, function (person, err) {
		if (data.password == person.password) {
			console.log("password is correct");
		  	res.json({
	    		user: person,
	    		err: err
			});
		}
		else {
	  		console.log("Incorrect password.");
		  	res.json({
		    	user: null,
		    	err: true
			});
		}
	});
});

app.post('/api/view/id', function(req, res, next) {
    res.redirect('/users/' + req.username);

});

console.log('Listening on port ' + port);
app.listen(port);