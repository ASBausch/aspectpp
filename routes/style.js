/**
 * Created by manadab on 12/22/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Art = require('../models/aspectarts');

router.get('/:style', function(req, res, next) {
    //req.params.style carries the style that is in the current url and sets it as the search
    //parameter for our mongodb search this style path is used in the style
    //button controller to search by style
    Art.find({'style': req.params.style}, function (err, aspectarts) {
        if (err) throw err;
        res.json(aspectarts);
    });
});

module.exports = router;




