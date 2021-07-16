const express = require('express');
const router = express.Router();

const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

router.get('/', function (req, res) {
   res.write("Hello World");
   res.end();
});

module.exports = router;