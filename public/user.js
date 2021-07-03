const express = require('express');
const mysql = require('mysql');
const path = require('path');
const router = express.Router();

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'2021',
    database:'ecosystem'
});
const user_template = require('./user_template.js');

router.get('/', function (req, res) {
    db.query(`SELECT * FROM user_info`, (err, results) => {
        if(err) throw err;
        else {
            console.log(results);
            var user_list = user_template.user_list(results);
            var html = user_template.HTML(user_list);
            res.write(html);
        res.end();
        }
    });
});
  
router.post('/new_user', function (req, res) {
    db.query(`INSERT INTO user_info (name, car, battery) VALUES ('${req.body.name}', '${req.body.car}', '${req.body.battery}')`, (err, results) => {
        if(err) throw err;
        else console.log(results)
    });
    res.redirect('/');
});

module.exports = router;