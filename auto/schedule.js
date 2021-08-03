const schedule = require('node-schedule');
const request = require('request');
const convert = require('xml-js');

const API = require('../secure/API_info.js');
const DB = require('../secure/DB_info');
const db_connection = DB.info();


// QUERY
const QUERY_PREDICT = function ( data ){
    return `
        UPDATE price_24
            SET
                price = CASE
                WHEN hour=1 THEN '${data[0]}'
                WHEN hour=2 THEN '${data[1]}'
                WHEN hour=3 THEN '${data[2]}'
                WHEN hour=4 THEN '${data[3]}'
                WHEN hour=5 THEN '${data[4]}'
                WHEN hour=6 THEN '${data[5]}'
                WHEN hour=7 THEN '${data[6]}'
                WHEN hour=8 THEN '${data[7]}'
                WHEN hour=9 THEN '${data[8]}'
            END
        WHERE hour BETWEEN 1 AND 9
    `
};
const QUERY_USERLIST = `
    SELECT * FROM user_status
    WHERE  (
        charge_type="battery" AND goal_battery_or_price > current_battery
    ) OR (
        charge_type="price" AND 75 > current_battery
    );
`;

// ** How to use **
// - * : every value
// - /n : do every n
// 6 values : second, minute, hour, day of month, month, dae of week
// To stop : test.cancel();

// every 16:00
const predict_data = schedule.scheduleJob('0 0 16 * * *', function(){
// const predict_data = schedule.scheduleJob('* * * * * *', function(){
    // Fill price_24 table 0~8 by predict data
    var list = [200, 200, 200, 200, 200, 200, 200, 200, 200];
    console.log(list[0])
    db_connection.query(
        QUERY_PREDICT(list), (err, results) => {
            if(err) throw err;
            else {
                console.log("Predicted Data Updated");
            }
        }
    );
});
// predict_data.cancel();


// every **:00
// const set_group = schedule.scheduleJob('0 0 * * * *', function(){
const charge = schedule.scheduleJob('* * * * * *', function(){
    db_connection.query(
        QUERY_USERLIST, (err, results) => {
            if(err) throw err;
            else {
                const length = results.length;
                for ( i = 0 ; i < length ; i++ ){
                    const type = results[i].charge_type;
                    if ( type == 'battery' ){
                        // find info by searching charge_by_battery
                        // IF current_battery < goal_battery
                        // THEN charge, update current_battery + 25
                    } else if ( type == 'price' ) {
                        const name = results[i].name;
                        // find info by searching charge_by_price
                        // IF current price < user price
                        // THEN charge, update current_battery + 25
                    }
                }
            }
        }
    );
});
charge.cancel();