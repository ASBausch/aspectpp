/**
 * Created by manadab on 1/11/16.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');


router.post('/', function (req, res) {
    var mailOpts, smtpTrans;
    //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
    smtpTrans = nodemailer.createTransport('Gmail', {
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    console.log(req.body);
    //Mail options
    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
        to: process.env.EMAIL_ADDRESS,
        subject: 'Website contact form',
        text: req.body.message + '\n from ' + req.body.name + '\n at ' + req.body.email
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //Email not sent
        if (error) {
            console.log(error + 'you goofed')
        }
        //Email sent
        else {
            console.log('whoosh')
        }
    });

    res.redirect(req.body.location);
});

module.exports = router;

