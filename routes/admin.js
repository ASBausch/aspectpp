/**
 * Created by manadab on 12/15/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
//var mongoose = require('mongoose');
//var Art = require('../models/aspectarts');

router.get('/', function(req, res, next) {
    /** GET makes the url available while res(responce)
     renders the file named "admin.html"
     */
    res.sendFile('admin.html', { root: path.join(__dirname, '../public') });
});

module.exports = router;