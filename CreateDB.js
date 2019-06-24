var Document = require('./models/document').Document;
var mongoose = require('./libs/mongoose');
var config = require('./config');

var document = new Document({
    name: "testDocument2",
    number: 2,
    comment: 'Для тестера 2',
    author: 'Tester',
});



document.save(function(err, user, affected) {
    if (err) throw err;
});