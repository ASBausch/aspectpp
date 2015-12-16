/**
 * Created by manadab on 12/15/15.
 */
var mongoose = require('mongoose'); // our Object Document Mapper (ODM) for MongoDB
var Schema = mongoose.Schema; // mongoose schema for defining our models

var artSchema = new Schema({
    artist:String,
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

var Art = mongoose.model('Art', artSchema);

module.exports= Art;