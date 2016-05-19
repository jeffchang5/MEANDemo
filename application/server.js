'use strict';
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var gplace_api = require('./config/gplace_api');
var queryURL = (gplace_api.url +
			gplace_api.parameters +
			'&key=' +
			gplace_api.key
);

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/bower_components'));
app.get('/', function(req, res) {
	// if (req.isAuthenticated = false) {
	// 	res.render('intro');	
	// }
	//res.render('intro');
	//res.sendFile('index.html', {root: __dirname} );

});

app.get('/api/create', function(req, res) {

});

app.post('/api/view/id', function(req, res, next) {
	res.redirect('/users/' + req.username);

});

console.log('Listening on port ' + port);
app.listen(port);


