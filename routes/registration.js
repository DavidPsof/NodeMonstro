var User = require('../models/user').User;
var mongoose = require('../libs/mongoose');
var async = require("async");

exports.get = function (req, res) {
    res.render('registration', {title: 'создайте новый аккаунт'});
};

exports.post = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.registrate(username, password, function (err, user, message) {
        if (err) {
            return next(err);
        }
        res.render('registration', {
            title: message
        });
    });
};

