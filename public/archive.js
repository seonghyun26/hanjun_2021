const express = require('express');
const router = express.Router();

const archive_template = require('./view/archive_template.js');
const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

const query_weather = `SELECT * FROM history_weather`;
const query_smp = `SELECT * FROM history_smp`;


router.get('/', function (req, res) {
    db_connection.query(query_weather, (err, results) => {
        if(err) throw err;
        else {
            var weather_list = archive_template.information_list(results);
            var html = archive_template.HTML_weather(weather_list);
            res.write(html);
            res.end();
        }
    });
});

router.get('/smp', function (req, res) {
    db_connection.query(query_smp, (err, results) => {
        if(err) throw err;
        else {
            var smp_list = archive_template.information_list(results);
            var html = archive_template.HTML_smp(smp_list);
            res.write(html);
            res.end();
        }
    });
});


module.exports = router;