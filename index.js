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


// const router
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
const chargeRouter = require('./public/charge.js');
const userRouter = require('./public/user.js');


app.get('/', function (req, res) {
  res.sendFile("index.html");
});
app.use("/charge", chargeRouter);
app.use("/user", userRouter);


app.get('/test', function (req, res) {
  var url = 'https://openapi.kpx.or.kr/openapi/smp1hToday/getSmp1hToday';
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
  queryParams += '&' + encodeURIComponent('areaCd') + '=' + encodeURIComponent('1');
  queryParams += '&' + encodeURIComponent('tradeDay') + '=' + encodeURIComponent('20210701');

  request({
    url: url + queryParams,
    method: 'GET'
  }, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    // console.log('Reponse received', body);
    var xmlToJson = convert.xml2json(body, {compact: true, spaces: 2});
    res.write(xmlToJson);
    res.end();
  });
});

app.get('/filetest', function (req, res) {
  fs.readFile(__dirname + '/public/charge.html', 'utf8', (err, data) => {
    if (err) throw err;
    // console.log(data);
    res.write(data);
    res.end();
  });
});


app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});