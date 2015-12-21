/**
 * Created by manadab on 12/20/15.
 */
var express = require('express');
var router = express.Router();
var Art = require('../models/aspectarts');


router.get('/', function (req, res) {
    Art.find({}, function (err, aspectarts) {
        if (err) throw err;
        res.send(aspectarts);
        console.log(aspectarts);
        });

});

module.exports = router;
