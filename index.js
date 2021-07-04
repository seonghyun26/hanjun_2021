// const require
const express = require('express');
const request = require('request');
const convert = require('xml-js');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');


// const information
const serviceKey = 'Nzmbm6X06v%2BKFHEtWBn1LJG6XGCdRYGIFiEi%2BGl6BNfaS2C6ki3Hq%2FWXk5TlqTPfKjTTaWAcI%2FH%2F%2FS7BZ%2FtxNw%3D%3D';
const URL = 'https://openapi.kpx.or.kr/openapi/smp1hToday/getSmp1hToday';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
queryParams += '&' + encodeURIComponent('areaCd') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('tradeDay') + '=' + encodeURIComponent('20210701');

// Router
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const chargeRouter = require('./public/charge.js');
const userRouter = require('./public/user.js');


app.get('/', function (req, res) {
  res.sendFile("index.html");
});
app.use("/charge", chargeRouter);
app.use("/user", userRouter);


const chart_template = require('./public/chart_template.js');

app.get('/test', function (req, res) {
  request({
    url: URL + queryParams,
    method: 'GET'
  }, function (error, response, body) {
    // console.log('Status', response.statusCode);
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
  // res.sendFile(__dirname + '/public/chart.html');
});

app.get('/filetest', function (req, res) {
  request({
    url: url + queryParams,
    method: 'GET'
  }, function (error, response, body) {
    // console.log('Status', response.statusCode);
    // console.log('Headers', JSON.stringify(response.headers));
    var xmlToJSON = convert.xml2json(body, {compact: true, spaces: 2});
    res.write(xmlToJSON);
    res.end();
  });
});


app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});