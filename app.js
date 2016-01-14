var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var expressValidator = require('express-validator');
var index = require('./routes/index');
var admin = require('./routes/admin');
var single = require('./routes/single');
var style = require('./routes/style');
var artist = require('./routes/artist');
var detailPage = require('./routes/detailPage')
var Art = require('./models/aspectarts');
var aspectarts = require('./routes/aspectarts');
var app = express();
var contact = require('./routes/contact');
var nodemailer = require('nodemailer');


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//may not use
//app.use(expressValidator());
app.use('/', index);
//app.use('/admin', admin);
app.use('/single', single);
app.use('/aspectarts', aspectarts);
app.use('/style', style);
app.use('/artist', artist);
app.use('/detailPage', detailPage);
app.use('/contact', contact);


// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string //hosted on mongolabs
//var dbURI = 'mongodb://localhost:27017/aspect';
var dbURI = 'mongodb://aspect:aspectarts@ds045465.mongolab.com:45465/aspect';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

app.set('port', process.env.PORT || 5000);


app.listen(app.get('port'), function(){
  //get whatever port has been set so that it works for any port set out of express
  //test to see if it runs
  console.log('Listening on port: ', app.get('port'));
});

//serve static pages
//app.use('/pages', express.static(path.join(__dirname, 'admin')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
