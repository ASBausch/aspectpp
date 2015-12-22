/**
 * Created by manadab on 12/20/15.
 */
    //all works from database are captured and available at /aspectarts

var express = require('express');
var router = express.Router();
var Art = require('../models/aspectarts');


router.get('/', function (req, res) {
    Art.find({}, function (err, aspectarts) {
        if (err) throw err;
        res.json(aspectarts);
        });
});



module.exports = router;
