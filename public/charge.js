const express = require('express');
const router = express.Router();

const DB = require('../secure/DB_info.js');
const db_connection = DB.info();


router.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/charge.html")
});

router.get('/price', function (req, res) {
    res.sendFile(__dirname + "/view/price.html")
});


router.post('/price_charge', function (req, res) {
    // console.log(`
    //     '${req.body.name}', '${req.body.car}', '${req.body.current_battery}', '${req.body.price}'
    // `);

    if (
        req.body.name != ''
        && req.body.car != ''
        && req.body.current_battery != ''
        && req.body.price != ''
    ) {
        db_connection.query(
        `
            INSERT INTO charge_by_price (name, car, current_battery, price) VALUES
            (
                '${req.body.name}', '${req.body.car}',
                '${req.body.current_battery}', '${req.body.price}'
            )
        `, (err, results) => {
            if(err) throw err;
            else {
                db_connection.query(
                    `
                        INSERT INTO user_status (name, car, charge_type) VALUES
                        (
                            '${req.body.name}', '${req.body.car}', 'price'
                        )
                    `, (err, results ) => {
                        if(err) throw err;
                    }  
                );
            }
        }
        );
    }

    res.redirect('/charge/price');
});

router.post('/battery_charge', function (req, res) {
    // console.log(`
    //     '${req.body.name}', '${req.body.car}', '${req.body.current_battery},
    //     ${req.body.goal_battery}', '${req.body.exit_time}'
    // `);

    if (
        req.body.name != ''
        && req.body.car != ''
        && req.body.current_battery != ''
        && req.body.goal_battery != ''
        && req.body.exit_time != ''
    ) {
        db_connection.query(
            `
                INSERT INTO charge_by_battery (name, car, current_battery, goal_battery, exit_time) VALUES
                (
                    '${req.body.name}', '${req.body.car}', '${req.body.current_battery}',
                    '${req.body.goal_battery}', '${req.body.exit_time}'
                )
            `, (err, results) => {
                if(err) throw err;
                else {
                    db_connection.query(
                        `
                            INSERT INTO user_status (name, car, charge_type) VALUES
                            (
                                '${req.body.name}', '${req.body.car}', 'battery'
                            )
                        `, (err, results ) => {
                            if(err) throw err;
                        }  
                    );
                }
            }
        );
    }
    
    res.redirect('/charge');
});

module.exports = router;