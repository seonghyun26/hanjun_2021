const express = require('express');
const app = express();

const request = require('request');
const convert = require('xml-js');
const bodyParser = require('body-parser');
const fs = require('fs');

const user_template = require('./view/user');

const serviceKey = 'Nzmbm6X06v%2BKFHEtWBn1LJG6XGCdRYGIFiEi%2BGl6BNfaS2C6ki3Hq%2FWXk5TlqTPfKjTTaWAcI%2FH%2F%2FS7BZ%2FtxNw%3D%3D';

app.use(express.json())
app.use(bodyParser.urlencoded())

const mysql = require('mysql');
const { ESRCH } = require('constants');
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'2021',
  database:'ecosystem'
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/view/index.html")
});


app.get('/charge', function (req, res) {
  res.sendFile(__dirname + "/view/charge.html")
});

app.post('/charge', function (req, res) {
  console.log(req.body.min_price);
  res.sendFile(__dirname + "/view/charge.html")
});


app.get('/user', function (req, res) {
  db.query(`SELECT * FROM user_info`, (err, results) => {
    if(err) throw err;
    else {
      console.log(results);
      var user_list = user_template.user_list(results);
      var html = user_template.HTML(user_list);
      res.write(html);
    res.end();
    }
  });
});

app.post('/new_user', function (req, res) {
  db.query(`INSERT INTO user_info (name, car, battery) VALUES ('${req.body.name}', '${req.body.car}', '${req.body.battery}')`, (err, results) => {
    if(err) throw err;
    else console.log(results)
  });
  res.redirect('/user');
});


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
  fs.readFile(__dirname + '/view/charge.html', 'utf8', (err, data) => {
    if (err) throw err;
    // console.log(data);
    res.write(data)
  });
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});