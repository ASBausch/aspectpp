/**
 * Created by manadab on 12/22/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Art = require('../models/aspectarts');

router.get('/', function(req, res, next) {
    Art.find({}, {'styleOne': 1, 'urlOne': 1, 'urlTwo': 1, 'urlThree': 1}, function (err, aspectarts) {
        if (err) throw err;
        res.json(aspectarts);
    });
});

module.exports = router;




