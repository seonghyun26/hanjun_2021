const express = require('express');
const request = require('request');
const router = express.Router();

const URL = 'http://hyungu.asuscomm.com/';

const test_template = require('./view/arduino_template.js');

router.get('/', function (req, res) {
    var html = test_template.HTML();
    res.write(html);
    res.end();
});

router.get('/:number/:on_off', function (req, res) {
    const query_number = req.params.number;
    const query_on_off = req.params.on_off;
    const params = encodeURIComponent(query_number) + '/' + encodeURIComponent(query_on_off) + '/';
    request({
        url: URL + params
    }, function (error, response, body) {
        if (error) throw error;
        else {
            var pasrsedJSON = response.body;
            console.log(pasrsedJSON);
            res.redirect('/test');
        }
    });
    
});

module.exports = router;