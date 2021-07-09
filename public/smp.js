const express = require('express');
const request = require('request');
const convert = require('xml-js');
const router = express.Router();

// template, information
const chart_template = require('./view/chart_template.js');
const API = require('../secure/API.js');


router.get('/', function (req, res) {
    request({
        url: API.URL() + API.query(),
        method: 'GET'
      }, function (error, response, body) {
        console.log('Status', response.statusCode);
        // console.log('Headers', JSON.stringify(response.headers));
        var parsedJSON = JSON.parse(convert.xml2json(body, {compact: true, spaces: 2}));
        var todayDate = parsedJSON.response.body.items.item[0].tradeDay._text;
        var todayData = parsedJSON.response.body.items.item;
        var todayLabels = [];
        var todayValues = [];
        for( i = 0 ; i < todayData.length ; i++){
          todayLabels.push(todayData[i].tradeHour._text);
          todayValues.push(todayData[i].smp._text);
        }
        // console.log(todayLabels, todayValues);
        var html = chart_template.HTML(todayLabels, todayValues, todayDate);
        res.write(html);
        res.end();
      });
});

router.get('/json', function (req, res) {
  request({
    url: API.URL() + API.query(),
    method: 'GET'
  }, function (error, response, body) {
    // console.log('Status', response.statusCode);
    // console.log('Headers', JSON.stringify(response.headers));
    var xmlToJSON = convert.xml2json(body, {compact: true, spaces: 2});
    res.write(xmlToJSON);
    res.end();
  });
});


module.exports = router;