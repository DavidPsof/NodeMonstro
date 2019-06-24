var config = require('../config');
var Document = require('../models/document').Document;

exports.get = function (req, res) {
    var number = req.params.id;
    Document.findDoc(number, function (document) {
        //res.send({document});
        res.render('document', {
            title: document.name,
            author: document.author,
            comment: document.comment,
            username: req.session.user.username
        });
    });
};