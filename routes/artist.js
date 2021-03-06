/**
 * Created by manadab on 12/22/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Art = require('../models/aspectarts');

router.get('/:artist', function(req, res, next) {
    Art.find({"artist": req.params.artist}, function (err, aspectarts) {
        if (err) throw err;
        res.json(aspectarts);
    });
});


module.exports = router;