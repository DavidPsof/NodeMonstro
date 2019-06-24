var User = require('./models/user').User;
var mongoose = require('./libs/mongoose');
var config = require('./config');

var user = new User({
    username: "Tester34",
    password: "secret"
});

user.save(function(err, user, affected) {
    if (err) throw err;
});