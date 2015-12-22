/**
 * Created by manadab on 12/15/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Art = require('../models/aspectarts');

router.get('/', function(req, res, next) {

    res.sendFile('single.html', { root: path.join(__dirname, '../public') });
});


module.exports = router;
