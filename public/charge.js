const express = require('express');
const mysql = require('mysql');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(__dirname + "/charge.html")
  });
  
router.post('/', function (req, res) {
    console.log(req.body.min_price);
    res.sendFile(__dirname + "/charge.html")
});

module.exports = router;