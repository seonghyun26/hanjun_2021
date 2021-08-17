const express = require('express');
const router = express.Router();

const user_template = require('./template/user_template.js');
const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

const QUERY_USERLIST = `SELECT * FROM user_status;`;
const QUERY_PRICE = `SELECT * FROM price_24;`;

router.get('/', function (req, res) {
    db_connection.query(QUERY_USERLIST + QUERY_PRICE, (err, results) => {
        if(err) throw err;
        else {
            const user_list = user_template.user_list(results[0]);
            const price_list = []
            results[1].forEach(element => {
                price_list.push(element.price)
            })
            const graph = user_template.price_graph(price_list);
            const html = user_template.HTML(user_list, graph);
            res.write(html);
            res.end();
        }
    });
});

module.exports = router;