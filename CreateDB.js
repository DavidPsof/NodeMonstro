var Document = require('./models/document').Document;
var mongoose = require('./libs/mongoose');
var config = require('./config');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var document = new Document({
    name: "testDocumewsant2ww",
    comment: 'Для тестера 2',
    author: 'Tester',
});


document.save(function(err, user, affected) {
    if (err) throw err;
});