var config = require('../config');
var Document = require('../models/document').Document;

exports.get = function (req, res) {
    var number = req.params.id;
    Document.findDoc(number, function (document) {
        if (document) {
            res.render('document', {
                user: req.session.user,
                title: document.name,
                author: document.author,
                comment: document.comment,
                number: document.number,
                username: req.session.user.username
            });
        } else {
            res.render('succesfullUpdate', {
                message: 'Документ не найден'
            });
        }
    });
};

exports.post = function (req, res) {
    var name = req.body.name;
    var comment = req.body.comment;
    var author = req.body.author;
    Document.addDocument(name, comment, author, function (document) {
        if (document) {
            res.render('document', {
                message: 'Документ успешно создан',
                title: document.name,
                author: document.author,
                comment: document.comment,
                username: req.session.user.username
            });
        } else {
            res.render('document', {
                message: 'При создании документа произошла ошибка'
            });
        }


    });
};