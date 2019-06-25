var config = require('../config');
var Document = require('../models/document').Document;

exports.post = function (req, res) {
    var number = req.body.number;
    var author = req.body.author;

    Document.deleteDocument(number, author, function (err) {
        if (!err) {
            res.render('succesfullUpdate', {
                message: 'Документ успешно удален'
            });
        } else {
            res.render('succesfullUpdate', {
                message: 'При удалении документа произошла ошибка'
            });
        }
    });
};