var Document = require('../models/document').Document;
var async = require('async');
var config = require('../config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    Document.findDocs(function (documents) {
        if (req.session.user) {
            res.render('index', {
                title: config.get('messages:title:general'),
                username: req.session.user.username,
                user: req.session.user,
                documents: documents
            });
        } else {
            res.render('index', {
                title: config.get('messages:title:general'),
                username: '',
                documents: documents
            });
        }
    });


});
router.get('/login', require('./login').get);
router.post('/login', require('./login').post);

router.get('/registrate', require('./registration').get);
router.post('/registrate', require('./registration').post);

router.post('/logout', require('./logout').post);

router.get('/document/:id', require('./document').get);
router.post('/document/', require('./document').post);
router.post('/updateDocument/', require('./updateDocument').post);
router.post('/deleteDocument/', require('./deleteDocument').post);

module.exports = router;