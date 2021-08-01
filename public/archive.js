const express = require('express');
const router = express.Router();

const archive_template = require('./template/archive_template.js');
const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

const QUERY_WEATHER = `SELECT * FROM history_weather`;
const QUERY_SMP = `SELECT * FROM history_smp`;


router.get('/', function (req, res) {
    db_connection.query(QUERY_WEATHER, (err, results) => {
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
    db_connection.query(QUERY_SMP, (err, results) => {
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