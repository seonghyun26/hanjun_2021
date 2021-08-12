const express = require('express');
const router = express.Router();

const archive_template = require('./template/archive_template.js');
const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

const QUERY_WEATHER = `SELECT * FROM history_weather`;
const QUERY_SMP = `SELECT * FROM history_smp`;
const QUERY_LOAD = `SELECT * FROM history_load`;


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
            var smp_list = archive_template.information_list_using_date(results);
            var html = archive_template.HTML_smp(smp_list);
            res.write(html);
            res.end();
        }
    });
});

router.get('/load', function (req, res) {
    db_connection.query(QUERY_LOAD, (err, results) => {
        if(err) throw err;
        else {
            var load_list = archive_template.information_list(results);
            var html = archive_template.HTML_load(load_list);
            res.write(html);
            res.end();
        }
    });
});


module.exports = router;