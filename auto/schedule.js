const schedule = require('node-schedule');
const request = require('request');

const API = require('../secure/API_info.js');
const DB = require('../secure/DB_info');
const db_connection = DB.info();

const URL = 'http://hyungu.asuscomm.com/';


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
const QUERY_UPDATE = function (no, battery) {
    return `
        UPDATE user_status set current_battery=${battery} WHERE no=${no}
    `;
}
const QUERY_USERNEEDTOCHARGE = `
    SELECT * FROM user_status
    WHERE  (
        charge_type="battery" AND goal_battery_or_price > current_battery
    ) OR (
        charge_type="price" AND current_battery != 100
    );
`;
const QUERY_GETPRICE = `
    SELECT * FROM price_24 ORDER BY price, hour;
`;
const QUERY_NUMBEROFPRICE = `
    SELECT COUNT(DISTINCT(price)) AS distinct_number_of_price from price_24;
`;

const charger_conversion = ['T', 'A', 'B', 'C'];

// ** How to use **
// - * : every value
// - /n : do every n
// 6 values : second, minute, hour, day of month, month, dae of week
// To stop : test.cancel();

const charge_on_off = function (letter, on_off) {
    const params = encodeURIComponent(letter) + '/' + encodeURIComponent(on_off) + '/';
    if (
        (letter == 'A' || letter == 'B' || letter == 'C' || letter == 'T')
        && (on_off == 0 || on_off == 1)
    ) {
        request({
            url: URL + params,
            method: 'GET'
        }, function (error, response, body) {
            if (error) throw error;
            else console.log("Yeah")
        });
    } else {
        console.log("Error in parameter");
    }   
}

const update_battery = function (no, battery) {
    db_connection.query(
        QUERY_UPDATE(no, battery), (err, results) => {
            if(err) throw err;
        }
    );
}

// every 16:00
const predict_data = schedule.scheduleJob('0 0 16 * * *', function(){
// const predict_data = schedule.scheduleJob('* * * * * *', function(){
    // Fill price_24 table 0~8 by predict data
    // var list = [200, 200, 200, 200, 200, 200, 200, 200, 200];
    // db_connection.query(
    //     QUERY_PREDICT(list), (err, results) => {
    //         if(err) throw err;
    //         else {
    //             console.log("Predicted Data Updated");
    //         }
    //     }
    // );

    // TODO: Search DB for demand Data
    // update price_24

});
predict_data.cancel();


// every **:00
const set_charge = schedule.scheduleJob('0 0 * * * *', function(){
// const charge = schedule.scheduleJob('* * * * * *', function(){
    db_connection.query(
        QUERY_USERNEEDTOCHARGE + QUERY_GETPRICE + QUERY_NUMBEROFPRICE, (err, results) => {
            if(err) throw err;
            else {
                const user_list = results[0];
                const price = results[1];
                const distinct_price = results[2][0].distinct_number_of_price;
                const length = user_list.length;
                const currentHour = (new Date()).getHours();
                console.log(length);
                charge_on_off("T", 0);

                // for every user on list
                for ( i = 0 ; i < length ; i++ ){
                    const user = user_list[i];
                    const type = user.charge_type;
                    if ( type == 'battery' ){
                        const number_of_charge_needed = Math.ceil((user.goal_battery_or_price - user.current_battery) / 25);
                        console.log(user.name);
                        // Consider exit_time first
                        if ( user.exit_time != null)    {
                            const time_left = parseInt(user.exit_time.substring(0,2)) - currentHour;
                            console.log(time_left);
                            if ( time_left < number_of_charge_needed )  {
                                console.log("Just Charge!");
                                // charge_on_off(charger_conversion[user.charger - 1], 1);
                                const updated_battery = user.current_battery > 75 ? 100 : user.current_battery+25;
                                update_battery(user.no, updated_battery);
                            }
                        // Find Cheapest price
                        } else {
                            for( j = 0 ; j < (number_of_charge_needed + 24 - distinct_price) ; j++ ){
                                if ( price[j].hour == currentHour ) {
                                    console.log("Charge!");
                                    // charge_on_off(charger_conversion[user.charger - 1], 1);
                                    const updated_battery = user.current_battery > 75 ? 100 : user.current_battery+25;
                                    update_battery(user.no, updated_battery);
                                    break;
                                }
                            }
                        }    
                    }

                    else if ( type == 'price' ) {
                        console.log(user.name);
                        for( j = 0 ; j < 24; j++ ){
                            if ( price[j].hour == currentHour ) {
                                var current_price = price[j].price;
                                break;
                            }
                        }
                        if ( user.goal_battery_or_price >= current_price || user.goal_battery_or_price == null) {
                            console.log("Charge!");
                            // Enable Charge
                            // charge_on_off(charger_conversion[user.charger], 1);
                            const updated_battery = user.current_battery > 75 ? 100 : user.current_battery+25;
                            update_battery(user.no, updated_battery);
                        }
                    }
                }
            }
        }
    );
});
set_charge.cancel();
