const schedule = require('node-schedule');
const request = require('request');

const QUERY = require('./function/query');
const DB = require('../secure/DB_info');
const db_connection = DB.info();

const URL = 'http://hyungu.asuscomm.com/';

const charger_conversion = ['T', 'A', 'B', 'C'];

const QUERY_USERNEEDTOCHARGE = `SELECT * FROM user_status;`;
const QUERY_GETPRICE = `SELECT * FROM price_24 ORDER BY price, hour;`;
const QUERY_NUMBEROFPRICE = `
    SELECT COUNT(DISTINCT(price)) AS distinct_number_of_price from price_24;
`;

// ** How to use **
// - * : every value
// - /n : do every n
// 6 values : second, minute, hour, day of month, month, dae of week
// To stop : {name}.cancel();

// Functions
const load_to_price = function(data) {
    var price_data = [];
    const max_load = Math.max.apply(null, data);

    data.forEach(element => {
        if ( element < 0.779 * max_load )   price_data.push(52.6)
        else if ( element < 0.909 * max_load )  price_data.push( (399.65/max_load/max_load) * element * element - 189.92)
        else if ( element < max_load )  price_data.push( (501.96/max_load/max_load) * element * element - 274.46)
        else price_data.push(300);
    });

    return price_data
}


// Request function for Charging
const all_off = function(){
    const params = encodeURIComponent('T') + '/' + encodeURIComponent(0) + '/';
    request({
        url: URL + params,
        method: 'GET',
        timeout: 10000
    }, function (error, response, body) {
        try {
            if (error) throw error;
            console.log("Charger All turned Off")
        } catch (error) {
            console.log("Communication Error (ALL) ");
            const user = {
                name: "ALL"
            }
            QUERY.record_error(user);
        }
    });
}

const charge_on_off = function (letter, on_off, user, updated_battery, current_price) {
    const params = encodeURIComponent(letter) + '/' + encodeURIComponent(on_off) + '/';
    if (
        (letter == 'A' || letter == 'B' || letter == 'C')
        && (on_off == 0 || on_off == 1)
    ) {
        request({
            url: URL + params,
            method: 'GET',
            timeout: 9000
        }, function (error, response, body) {
            try {
                if (error) throw error;
                else {
                    console.log("Charger working Well , on(1)/off(0): ", on_off);
                    QUERY.update_battery(user.no, updated_battery);
                    QUERY.record_event(user, updated_battery, current_price, on_off);
                }
            } catch (error) {
                console.log("Communication Error");
                QUERY.record_error(user);
            }
        });
    } else console.log("Error in parameter");
}


// every **:00.10
const set_charge = schedule.scheduleJob('10 0 * * * *', function(){
// const charge = schedule.scheduleJob('0 * * * * *', function(){
    db_connection.query(
        QUERY_USERNEEDTOCHARGE + QUERY_GETPRICE + QUERY_NUMBEROFPRICE, (err, results) => {
            if(err) throw err;
            else {
                // get DB information
                const user_list = results[0];
                const price = results[1];
                const distinct_price = results[2][0].distinct_number_of_price;
                const length = user_list.length;
                const currentHour = (new Date()).getHours();
                const dt = new Date();
                dt.setHours(dt.getHours()+9);
                const now = dt.toISOString().slice(0, 19).replace('T', ' ');
                console.log("\n\nTime: ", now);
                console.log("Number of Users: ", length);

                // init
                // all_off();
                var current_price = 0;
                for( j = 0 ; j < 24; j++ ){
                    if ( price[j].hour == currentHour ) {
                        current_price = price[j].price;
                        break;
                    }
                }
                console.log("Current Price: ", current_price);

                // for every user on list
                for ( user_num = 0 ; user_num < length ; user_num++ ){
                    // send request using setTimeout function on seconds
                    (function(i) {
                        setTimeout(function(){
                            const user = user_list[i];
                            const no = user.no;
                            const type = user.charge_type;
                            console.log("\nUser Name: ", user.name);

                            // Charge type - battery
                            if ( type == 'battery' ){
                                // Check goal battery first
                                if ( user.current_battery == parseInt(user.goal_battery_or_price) ) {
                                    // move user_status to user_finished
                                    QUERY.move_to_finished(user);
                                    QUERY.delete_charging(user);
                                    // disable charging
                                    charge_on_off(charger_conversion[user.charger], 0, user, user.current_battery, current_price);
                                }
                                else {
                                    // calculate number of charge needed
                                    const number_of_charge_needed = Math.ceil((user.goal_battery_or_price - user.current_battery) / 25);

                                    // Consider exit_time first
                                    const time_left = (parseInt(user.exit_time.substring(0,2)) - currentHour + 24) % 24;
                                    console.log("time left: ", time_left);
                                    console.log("number_of_charge_needed: ", number_of_charge_needed);
                                    // Time not left much, just charge
                                    if ( time_left <= number_of_charge_needed )  {
                                        console.log("Just Charge!(Need Full Charge) ");
                                        const updated_battery = user.current_battery > 75 ? 100 : user.current_battery+25;
                                        charge_on_off(charger_conversion[user.charger], 1, user, updated_battery, current_price);
                                    }
                                    // Find time with the Cheapest price when enough time left
                                    else {
                                        for( j = 0 ; j < (number_of_charge_needed + 24 - distinct_price) ; j++ ){
                                            if ( price[j].hour == currentHour ) {
                                                console.log("Charge by battery(cheap price_!");
                                                const updated_battery = user.current_battery > 75 ? 100 : user.current_battery+25;
                                                charge_on_off(charger_conversion[user.charger], 1, user, updated_battery, current_price);
                                                break;
                                            } else {
                                                charge_on_off(charger_conversion[user.charger], 0, user, user.current_battery, current_price);
                                                break;
                                            }
                                        }
                                    }    
                                }
                            }

                            // Charge type - price
                            else if ( type == 'price' ) {
                                // Check current battery first
                                if ( user.current_battery == 100 ) {
                                    // move user_status to user_finished
                                    QUERY.move_to_finished(user);
                                    QUERY.delete_charging(user);
                                    // disable charging
                                    charge_on_off(charger_conversion[user.charger], 0, user, user.current_battery, current_price);
                                }
                                // When current price is lower than the price user selected
                                else if ( user.goal_battery_or_price >= current_price || user.goal_battery_or_price == null) {
                                    console.log("Charge by price!");
                                    const updated_battery = user.current_battery > 75 ? 100 : user.current_battery+25;
                                    charge_on_off(charger_conversion[user.charger], 1, user, updated_battery, current_price);
                                }
                                else {
                                    charge_on_off(charger_conversion[user.charger], 0, user, user.current_battery, current_price);
                                }
                            }
                        }, 10000 * i )
                    })(user_num);
                }
            }
        }
    );
});
// set_charge.cancel();
