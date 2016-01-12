/**
 * Created by manadab on 1/11/16.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
    res.json(data);
    console.log(data)
});

router.post('/', function (req, res) {
    var mailOpts, smtpTrans;
    //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
    smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: "asbausch@gmail.com",
            pass: "sweetpea55!"
        }
    });

    console.log(req.body);
    //Mail options
    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
        to: 'asbausch@gmail.com',
        subject: 'Website contact form',
        text: req.body.message
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //Email not sent
        if (error) {
            console.log(error + 'yougoofed')
        }
        //Email sent
        else {
            console.log('whoosh')
        }
    });
    res.redirect(req.body.location);
});

module.exports = router;

