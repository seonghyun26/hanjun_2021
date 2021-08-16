const express = require('express');
const router = express.Router();

const user_template = require('./template/user_template.js');
const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

const QUERY_USERLIST = `
    SELECT * FROM user_status
`;

router.get('/', function (req, res) {
    db_connection.query(QUERY_USERLIST, (err, results) => {
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