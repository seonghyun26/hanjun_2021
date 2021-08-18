const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

const cookieParser = require('cookie-parser');
router.use(cookieParser());

const URL = 'http://hyungu.asuscomm.com/';
// const URL_test='http://115.85.181.94:3000/arduino';

const template = require('./template/arduino_template.js');

// Send a request to Arduino server to get current status
router.get('/', function (req, res) {
    const saved_pw = req.cookies.lock;
    console.log("Arduino pw:", saved_pw)
    if ( saved_pw == undefined || saved_pw != 'dpzh' ) res.redirect('/arduino/lock');
    else {
        request({
            url: URL,
            method: 'GET',
            timeout: 2000
        }, function (error, response, body) {
            if ( response == undefined ){
                console.log("Arduino Offline");
                res.sendFile(__dirname + "/html/arduino_offline.html");
            }
            else if (error) throw error;
            else {
                console.log("Arduino Online");
                const $ = cheerio.load(body);
                const currentStatus = $("button").toArray().map( x => { return $(x).text()});;
                console.log(currentStatus);
                const html_aButton = template.button_format('A',currentStatus[0] );
                const html_bButton = template.button_format('B',currentStatus[1] );
                const html_cButton = template.button_format('C',currentStatus[2] );
                const html = template.HTML("", html_aButton, html_bButton, html_cButton);
                res.write(html);
                res.end();
            }
        });
    }
});


//
router.get('/lock', function (req, res) {
    res.sendFile(__dirname + "/html/arduino_lock.html");
})

router.post('/lock', function (req, res) {
    res.cookie('lock', 'dpzh');
    res.redirect('/arduino');
})


// Send ON/OFF signal to Arduino Server
router.post('/:letter/:on_off', function (req, res) {
    const query_letter = req.params.letter;
    const query_on_off = req.params.on_off;
    const params = encodeURIComponent(query_letter) + '/' + encodeURIComponent(query_on_off) + '/';
    const dt = new Date();
    dt.setHours(dt.getHours()+9);
    const now = dt.toISOString().slice(0, 19).replace('T', ' ');
    console.log("Time: ", now, ", Params:", params);
    request({
        url: URL + params,
        method: 'GET',
        timeout: 3000
    }, function (error, response, body) {
        if (error) throw error;
    });
});

module.exports = router;