// require
const express = require('express');
const path = require('path');

// Router
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const chargeRouter = require('./public/charge.js');
const userRouter = require('./public/user.js');
const apiInfoRouter = require('./public/api.js');
const archiveRouter = require('./public/archive.js');

// App
app.get('/', function (req, res) {
  res.sendFile("index.html");
});

app.use("/charge", chargeRouter);
app.use("/user", userRouter);
app.use("/apiInfo", apiInfoRouter);
app.use("/archive", archiveRouter);


app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});