const express = require('express');
const router = express.Router();

const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

// QUERY
const QUERY_NEW_BATTERY = function (par1, par2, par3, par4, par5, par6) {
    return `
        INSERT INTO charge_by_battery (name, charger, start_battery, goal_battery, exit_time, current_battery) VALUES
        (
            '${par1}', '${par2}', '${par3}', '${par4}', '${par5}', '${par6}'
        )
    `
};
const QUERY_NEW_PRICE = function (par1, par2, par3, par4) {
    return `
    INSERT INTO charge_by_price (name, charger, current_battery, price) VALUES
        (
            '${par1}', '${par2}', '${par3}', '${par4}'
        )
    `
};
const QUERY_NEW_USER_PRICE = function (par1, par2, type, par3, par4, par5, par6) {
    return `
        INSERT INTO user_status (name, charger, charge_type, start_battery, goal_battery_or_price, current_battery, exit_time) VALUES
        (
            '${par1}', '${par2}', '${type}', '${par3}', '${par4}', '${par5}', '${par6}'
        )
    `
};


router.get('/', function (req, res) {
    res.sendFile(__dirname + "/html/charge.html")
});

router.get('/price', function (req, res) {
    res.sendFile(__dirname + "/html/price.html")
});

router.post('/battery_charge', function (req, res) {
    db_connection.query(
        QUERY_NEW_BATTERY(
            req.body.name, req.body.charger, req.body.current_battery,
            req.body.goal_battery, req.body.exit_time, req.body.current_battery,
        ), (err, results) => {
            if(err) throw err;
            else  db_connection.query(
                QUERY_NEW_USER_PRICE(
                    req.body.name, req.body.charger, 'battery', req.body.current_battery,
                    req.body.goal_battery, req.body.current_battery, req.body.exit_time
                ), (err, results ) => {
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
            req.body.name, req.body.charger, req.body.current_battery, req.body.price
        ), (err, results) => {
            if(err) throw err;
            else db_connection.query(
                QUERY_NEW_USER_PRICE(
                    req.body.name, req.body.charger, 'price', req.body.current_battery,
                    req.body.price, req.body.current_battery, "00:00"
                ), (err, results ) => {
                    if(err) throw err;
                }  
            );
        }
    );
    res.redirect('/charge/price');
});


module.exports = router;