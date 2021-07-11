const express = require('express');
const router = express.Router();

const user_template = require('./view/user_template.js');
const db = require('../secure/DB_info.js');
const db_connection = db.info();

router.get('/', function (req, res) {
    db_connection.query(`SELECT * FROM user_info`, (err, results) => {
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
    db_connection.query(`INSERT INTO user_info (name, car, battery) VALUES ('${req.body.name}', '${req.body.car}', '${req.body.battery}')`, (err, results) => {
        if(err) throw err;
        else console.log(results);
    });
    res.redirect('/user');
});

module.exports = router;