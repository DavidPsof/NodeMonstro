var config = require('../config');
var Document = require('../models/document').Document;

exports.post = function (req, res) {
    var name = req.body.name;
    var comment = req.body.comment;
    var author = req.body.author;
    var number = req.body.number;

    Document.updateDocument(number, name, comment, function (document) {
        if (document) {
            res.render('succesfullUpdate', {
                message: 'Документ успешно обновлен'
            });
        } else {
            res.render('succesfullUpdate', {
                message: 'При обновлении документа произошла ошибка'
            });
        }
    });
};