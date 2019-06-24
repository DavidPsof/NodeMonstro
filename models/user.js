var crypto = require('crypto');
var async = require('async');
var util = require('util');
var HttpError = require('../error').HttpError;
var config = require('../config');
var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
mongoose.connect(config.get('mongoose:uri'), {useNewUrlParser: true, useCreateIndex: true});

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });


schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.registrate = function (username, password, callback) {
    var User = mongoose.model('User', schema);

    async.waterfall([
        function (callback) {
            User.findOne({username: username}, callback);
        },
        function (user, callback) {
            if (!user) {
                //нужна проверка типов данных чтоб ошибки не было
                var newUser = new User({
                    username: username,
                    password: password
                });
                newUser.save(function (err, user, affected) {
                    if (err) throw err;
                    callback(null, newUser, config.get('messages:user:registrate:succes'));
                });
            } else {
                callback(null, null, config.get('messages:user:registrate:fail:userIsset'));
            }
        }
    ], callback);
};

schema.statics.authorize = function (username, password, callback) {
    var User = mongoose.model('User', schema);

    async.waterfall([
        function (callback) {
            User.findOne({username: username}, callback);
        },
        function (user, callback) {
            var message = '';
            if (user) {
                if (user.checkPassword(password)) {
                    message = config.get('messages:user:auth:succes');
                    callback(null, user, message);
                } else {
                    message = config.get('messages:user:auth:fail');
                    callback(null, null, message);
                }
            }
        }
    ], callback);
};

exports.User = mongoose.model('User', schema);