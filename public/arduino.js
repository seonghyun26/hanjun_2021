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
        method: 'GET'
    }, function (error, response, body) {
        if (error) throw error;
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
router.get('/:number/:on_off', function (req, res) {
    const query_number = req.params.number;
    const query_on_off = req.params.on_off;
    const params = encodeURIComponent(query_number) + '/' + encodeURIComponent(query_on_off) + '/';
    request({
        url: URL + params,
        method: 'GET'
    }, function (error, response, body) {
        if (error) throw error;
        else res.redirect('/arduino');
    });
    res.redirect('/arduino');
});

module.exports = router;