'use strict';
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var gplace_api = require('./config/gplace_api');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
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
app.use('api/*', function(req, res, next) {
	if (req.isAuthenticated == true) {
		next();
	}
	else {
		res.json({auth:false});
		res.end();
	}
})


app.get('/', function(req, res) {
	res.render('intro');	
});
app.post('/signup', function(req, res) {
	req.isAuthenticated = true;
	console.log(req.body);
	res.json({auth:true});

});
app.get('/loggedin', function(req, res) {

});

app.post('/api/view/id', function(req, res, next) {
	res.redirect('/users/' + req.username);

});

console.log('Listening on port ' + port);
app.listen(port);


