const schedule = require('node-schedule');
const express = require('express');
const router = express.Router();

const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

router.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/test.html");
});

module.exports = router;