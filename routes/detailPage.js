/**
 * Created by manadab on 12/31/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Art = require('../models/aspectarts');

router.get('/:detail', function(req, res, next) {
    Art.find({"_id": req.params.detail}, function (err, aspectarts) {
        if (err) throw err;
        res.json(aspectarts);
    });
});


module.exports = router;