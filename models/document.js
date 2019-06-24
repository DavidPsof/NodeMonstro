var async = require('async');
var HttpError = require('../error').HttpError;
var config = require('../config');
var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

mongoose.connect(config.get('mongoose:uri'), {useNewUrlParser: true, useCreateIndex: true});

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

schema.statics.getAllDocs = function () {
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

schema.statics.findDocs = function(callback){
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

exports.Document = mongoose.model('Document', schema);
