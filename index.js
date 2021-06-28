var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!\n - 김영돈, 김현수, 박성현 -\n Test2');
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});