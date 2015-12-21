/**
 * Created by manadab on 12/15/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
    /** GET makes the url available while res(responce)
     renders the file named "admin.html"
     */
    res.sendFile('admin.html', { root: path.join(__dirname, '../public') });
});


//using mongoose to simplify our data grab
//mongoose.connect('mongodb://localhost/aspect');
////this creates our new collection and sets the model for it
var Art = mongoose.model('aspectArt',
    {   addArtist:String,
        titleOne:String,
        styleOne:String,
        yearOne:Number,
        urlOne:String,
        publicDomainOne:Boolean,
        collectedByOne:String,
        titleTwo:String,
        styleTwo:String,
        yearTwo:Number,
        urlTwo:String,
        publicDomainTwo:Boolean,
        collectedByTwo:String,
        titleThree:String,
        styleThree:String,
        yearThree:Number,
        urlThree:String,
        publicDomainThree:Boolean,
        collectedByThree:String
    });


router.post('/', function(req, res, next) {
    //takes data from our submission and inserts it into the database
    var artist = new Art({
        addArtist: req.body.addArtist,
        titleOne: req.body.titleOne,
        styleOne: req.body.styleOne,
        yearOne: req.body.yearOne,
        urlOne: req.body.urlOne,
        publicDomainOne: req.body.publicDomainOne,
        collectedByOne: req.body.collectedByOne,
        titleTwo: req.body.titleTwo,
        styleTwo: req.body.styleTwo,
        yearTwo: req.body.yearTwo,
        urlTwo: req.body.urlTwo,
        publicDomainTwo: req.body.publicDomainTwo,
        collectedByTwo: req.body.collectedByTwo,
        titleThree: req.body.titleThree,
        styleThree: req.body.styleThree,
        yearThree: req.body.yearThree,
        urlThree: req.body.urlThree,
        publicDomainThree: req.body.publicDomainThree,
        collectedByThree: req.body.collectedByThree
    });
    console.log(artist);
    artist.save(function(err){
       if(err) console.log('meow %s', err);
    });
    res.redirect('/admin')
});

module.exports = router;