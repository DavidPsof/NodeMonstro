var config = require('../config');
var User = require('../models/user').User;

exports.get = function (req, res) {
    res.render('login', {
        title: config.get('messages:title:login'),
    });
};

exports.post = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function (err, user, message) {
        if (err) {
            return next(err);
        }
        req.session.user = user;
        res.render('login', {
            title: message,
            userId: req.session.user,
            username: user.username,
        });
    });
};

