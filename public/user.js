const express = require('express');
const router = express.Router();

const user_template = require('./view/user_template.js');
const db = require('../secure/DB_info.js');
const db_connection = db.info();

router.get('/', function (req, res) {
    db_connection.query(`SELECT * FROM user_info`, (err, results) => {
        if(err) throw err;
        else {
            // console.log(results);
            var user_list = user_template.user_list(results);
            var html = user_template.HTML(user_list);
            res.write(html);
            res.end();
        }
    });
});

module.exports = router;