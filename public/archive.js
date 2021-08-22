const express = require('express');
const router = express.Router();

const archive_template = require('./template/archive_template.js');
const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

const QUERY_WEATHER = `SELECT * FROM history_weather`;
const QUERY_SMP = `SELECT * FROM history_smp`;
const QUERY_LOAD = `SELECT * FROM history_load`;
const QUERY_PRICE = `SELECT * FROM price_24`;
const QUERY_PRICE_DATA = function (num) {
    return`
        SELECT * FROM history_price
        WHERE day='${num}';
    `;
}

router.get('/', function (req, res) {
    db_connection.query(QUERY_WEATHER, (err, results) => {
        if(err) throw err;
        else {
            const weather_list = archive_template.information_list(results);
            const html = archive_template.HTML_weather(weather_list);
            res.write(html);
            res.end();
        }
    });
});

router.get('/smp', function (req, res) {
    db_connection.query(QUERY_SMP, (err, results) => {
        if(err) throw err;
        else {
            const smp_list = archive_template.information_list_using_date(results);
            const html = archive_template.HTML_smp(smp_list);
            res.write(html);
            res.end();
        }
    });
});

router.get('/load', function (req, res) {
    db_connection.query(QUERY_LOAD, (err, results) => {
        if(err) throw err;
        else {
            const load_list = archive_template.information_list(results);
            const html = archive_template.HTML_load(load_list);
            res.write(html);
            res.end();
        }
    });
});

router.get('/price', function (req, res) {
    db_connection.query(QUERY_PRICE, (err, results) => {
        if(err) throw err;
        else {
            const price_list = []
            results.forEach(element => {
                price_list.push(element.price)
            })
            const graph_price = archive_template.graph(price_list);
            const html = archive_template.HTML_price(graph_price);
            res.write(html);
            res.end();
        }
    });
});

router.get('/price/data', function (req, res) {
    db_connection.query(QUERY_PRICE_DATA(9) + QUERY_PRICE_DATA(17) + QUERY_PRICE_DATA(20), (err, results) => {
        if(err) throw err;
        else {
            const data_9 = Object.values(results[0][0]).slice(3, 27);
            const data_17 = Object.values(results[1][0]).slice(3, 27);
            const data_20 = Object.values(results[2][0]).slice(3, 27);
            // console.log(data_9, data_17, data_20);
            const graph_price_data = archive_template.graph_price(data_9, data_17, data_20);
            const html = archive_template.HTML_price_data(graph_price_data);
            res.write(html);
            res.end();
        }
    });
});


module.exports = router;