var async = require('async');
var HttpError = require('../error').HttpError;
var config = require('../config');
var mongoose = require('../libs/mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

mongoose.connect(config.get('mongoose:uri'), {useNewUrlParser: true, useCreateIndex: true});

autoIncrement.initialize(mongoose.connection);

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: Number,
        unique: true,
        required: true
    },
    comment: {
        type: String,
        unique: false,
        required: true
    },
    author: {
        type: String,
        unique: false,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(autoIncrement.plugin, {model: 'Document', field: 'number'});

schema.statics.addDocument = function (name, comment, author, callback) {
    var Document = mongoose.model('Document', schema);
    async.waterfall([
        function (callback) {
            var newDocument = new Document({
                name: name,
                comment: comment,
                author: author,
            });
            newDocument.save(function (err, document) {
                if (err) throw err;
                callback(document);
            });
        }
    ], callback);
};

schema.statics.findDoc = function (number, callback) {
    var Document = mongoose.model('Document', schema);
    async.waterfall([
        function (callback) {
            Document.findOne({number: number}, callback);
        },
        function (document, callback) {
            callback(document);
        }
    ], callback);
};

schema.statics.findDocs = function (callback) {
    var Document = mongoose.model('Document', schema);
    async.waterfall([
        function (callback) {
            Document.find({}, callback);
        },
        function (documents, callback) {
            callback(documents);
        }
    ], callback);
};

schema.statics.updateDocument = function (number, name, comment, callback) {
    var Document = mongoose.model('Document', schema);
    async.waterfall([
        function (callback) {
            Document.updateOne({number: number}, {name: name, comment: comment}, function (err, document) {
                if (err) throw err;
                callback(document);
            });
        }
    ], callback);
};

exports.Document = mongoose.model('Document', schema);
