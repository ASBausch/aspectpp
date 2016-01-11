/**
 * Created by manadab on 12/15/15.
 */
var mongoose = require('mongoose'); // our Object Document Mapper (ODM) for MongoDB
var Schema = mongoose.Schema; // mongoose schema for defining our models

var artSchema = new Schema({
    artist:String,
    style: String,
    works: [
        {
            title: String,
            yearCompleted: Number,
            url: String,
            publicDomain: Boolean,
            collectedBy: String
        }
        ],
    wikiLocation: String
});

var Art = mongoose.model('aspectarts', artSchema);
module.exports= Art;
