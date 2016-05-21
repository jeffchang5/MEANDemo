var mongoose = require('mongoose');

var User = function() {
    this.userSchema = mongoose.Schema({
        username: String,
        password: String
    });
	this.userModel = mongoose.model('User', this.userSchema);
};


User.prototype.save = function(username, password) {
    var newUser = new this.userModel({
        username: username,
        password: password
    });
    newUser.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Added a new user');
        }
    });
};

User.prototype.checkUser = function(username, callback) {
	this.userModel.findOne({ 'username': username}, function (err, person) {
		if (person != null) {

			callback(person);
		}
		else {
			callback(false, null);
		}

	})
};
User.prototype.login = function(username, password, callback) {
	this.userModel.findOne({ 'username': username}, function (err, person) {

		if (person == null) {
			callback(err);
		}
		else {
			callback(person);
		}

	})
};
module.exports = new User();