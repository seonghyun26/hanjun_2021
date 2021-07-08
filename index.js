// const require
const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');

// Router
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const chargeRouter = require('./public/charge.js');
const userRouter = require('./public/user.js');
const chartRouter = require('./public/chart.js');


app.get('/', function (req, res) {
  res.sendFile("index.html");
});
app.use("/charge", chargeRouter);
app.use("/user", userRouter);
app.use("/chart", chartRouter);

app.get('/smpjson', function (req, res) {
  request({
    url: URL + queryParams,
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