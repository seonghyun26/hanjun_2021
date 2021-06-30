const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const qs = require('querystring');

const template = require('./view/user');

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
      var user_list = template.user_list(results)
      var html = template.HTML(user_list);
      res.write(html);
    res.end();
    }
  });
});

app.post('/new_user', function (req, res) {
  db.query(`INSERT INTO user_info (id, name, car, battery) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.car}', '${req.body.battery}')`, (err, results) => {
    if(err) throw err;
    else console.log(results)
  });
  res.redirect('/user');
});


app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});