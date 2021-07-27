const express = require('express');
const router = express.Router();

const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

// QUERY
const QUERY_NEW_BATTERY = function (par1, par2, par3, par4, par5) {
    return `
        INSERT INTO charge_by_battery (name, car, current_battery, goal_battery, exit_time) VALUES
        (
            '${par1}', '${par2}', '${par3}', '${par4}', '${par5}'
        )
    `
};
const QUERY_NEW_PRICE = function (par1, par2, par3, par4) {
    return `
    INSERT INTO charge_by_price (name, car, current_battery, price) VALUES
        (
            '${par1}', '${par2}', '${par3}', '${par4}'
        )
    `
};
const QUERY_NEW_USER_PRICE = function (par1, par2, type) {
    return `
        INSERT INTO user_status (name, car, charge_type) VALUES
        (
            '${par1}', '${par2}', '${type}'
        )
    `
};


router.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/charge.html")
});

router.get('/price', function (req, res) {
    res.sendFile(__dirname + "/view/price.html")
});

router.post('/battery_charge', function (req, res) {
    db_connection.query(
        QUERY_NEW_BATTERY(
            req.body.name, req.body.car, req.body.current_battery,
            req.body.goal_battery, req.body.exit_time
        ), (err, results) => {
            if(err) throw err;
            else  db_connection.query(
                QUERY_NEW_USER_PRICE(req.body.name, req.body.car, 'battery'), (err, results ) => {
                    if(err) throw err;
                }
            );
        }
    );
    res.redirect('/charge');
});

router.post('/price_charge', function (req, res) {
    db_connection.query(
        QUERY_NEW_PRICE(
            req.body.name, req.body.car, req.body.current_battery, req.body.price
        ), (err, results) => {
        if(err) throw err;
        else db_connection.query(
            QUERY_NEW_USER_PRICE(req.body.name, req.body.car, 'price'), (err, results ) => {
                if(err) throw err;
            }  
        );
    });
    res.redirect('/charge/price');
});


module.exports = router;