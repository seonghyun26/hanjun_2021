const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

const URL = 'http://hyungu.asuscomm.com/';
// const URL_test='http://115.85.181.94:3000/arduino';

const template = require('./template/arduino_template.js');

// Send a request to Arduino server to get current status
router.get('/', function (req, res) {
    request({
        url: URL,
        method: 'GET',
        timeout: 3000
    }, function (error, response, body) {
        console.log(response);
        if ( response === undefined ){
            const html = template.HTML_error();
            console.log("offline");
            res.write(html);
            res.end();
        }
        else if (error) {
            throw error;
        }
        else {
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
});

// Send ON/OFF signal to Arduino Server
router.post('/:letter/:on_off', function (req, res) {
    const query_letter = req.params.letter;
    const query_on_off = req.params.on_off;
    const params = encodeURIComponent(query_letter) + '/' + encodeURIComponent(query_on_off) + '/';
    console.log(params);    
    request({
        url: URL + params,
        method: 'GET',
        timeout: 3000
    }, function (error, response, body) {
        if (error) throw error;
    });
});

module.exports = router;