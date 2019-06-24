var config = require('../config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.user) {
        res.render('index', {
            title: config.get('messages:title:general'),
            username: req.session.user.username
        });
    } else {
        res.render('index', {
            title: config.get('messages:title:general'),
            username: ''
        });
    }

});
router.get('/login', require('./login').get);
router.post('/login', require('./login').post);

router.get('/registrate', require('./registration').get);
router.post('/registrate', require('./registration').post);

router.post('/logout', require('./logout').post);

module.exports = router;