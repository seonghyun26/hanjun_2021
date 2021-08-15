const { load } = require('cheerio');
const schedule = require('node-schedule');
const request = require('request');

const DB = require('../secure/DB_info');
const db_connection = DB.info();

const URL = 'http://hyungu.asuscomm.com/';


// QUERY
const QUERY_GETLOADDATA = function ( date ){
    return `
        SELECT * FROM history_load
        WHERE day=${date}
    `
};
const QUERY_GETLOADDATATWO = function ( date ){
    return `
        SELECT * FROM history_load
        WHERE day=${date} OR day=${date + 1}
    `
};

const QUERY_PREDICT = function ( data ){
    return `
        UPDATE price_24
            SET
                price = CASE
                WHEN hour=0 THEN '${data[0]}'
                WHEN hour=1 THEN '${data[1]}'
                WHEN hour=2 THEN '${data[2]}'
                WHEN hour=3 THEN '${data[3]}'
                WHEN hour=4 THEN '${data[4]}'
                WHEN hour=5 THEN '${data[5]}'
                WHEN hour=6 THEN '${data[6]}'
                WHEN hour=7 THEN '${data[7]}'
                WHEN hour=8 THEN '${data[8]}'
                WHEN hour=9 THEN '${data[9]}'
                WHEN hour=10 THEN '${data[10]}'
                WHEN hour=11 THEN '${data[11]}'
                WHEN hour=12 THEN '${data[12]}'
                WHEN hour=13 THEN '${data[13]}'
                WHEN hour=14 THEN '${data[14]}'
                WHEN hour=15 THEN '${data[15]}'
                WHEN hour=16 THEN '${data[16]}'
                WHEN hour=17 THEN '${data[17]}'
                WHEN hour=18 THEN '${data[18]}'
                WHEN hour=19 THEN '${data[19]}'
                WHEN hour=20 THEN '${data[20]}'
                WHEN hour=21 THEN '${data[21]}'
                WHEN hour=22 THEN '${data[22]}'
                WHEN hour=23 THEN '${data[23]}'
            END
        WHERE hour BETWEEN 0 AND 23
    `
};

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


const QUERY_UPDATE = function (no, battery) {
    return `
        UPDATE user_status set current_battery=${battery} WHERE no=${no}
    `;
}
const update_battery = function (no, battery) {
    db_connection.query(
        QUERY_UPDATE(no, battery), (err, results) => {
            if(err) throw err;
        }
    );
}


const QUERY_UPDATELOG = function(user, battery, price){
    const today = new Date();
    return `
        INSERT INTO event_update
        ( dt, name, charge_type, before_battery, after_battery, price, exit_time)
        VALUES
        (
            ${today}, ${user.name}, ${user.charge_type}, ${user.current_battery},
            ${battery}, ${price}, ${user.exit_time}
        )
    `;
}
const record_event = function (user, update_battery, price) {
    db_connection.query(
        QUERY_UPDATELOG(user, update_battery, price), (err, results) => {
            if(err) throw err;
        }
    );
}


const QUERY_UPDATELOGERROR = function(user) {
    const today = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    return `
        INSERT INTO event_update
        ( dt, name, charge_type)
        VALUES
        (
            '${today}', '${user.name}', 'Request Error'
        )
    `;
}
const record_error = function (user){
    db_connection.query(
        QUERY_UPDATELOGERROR(user), (err, results) => {
            if(err) throw err;
        }
    );
}


const all_off = function(){
    const params = encodeURIComponent('T') + '/' + encodeURIComponent(0) + '/';
    request({
        url: URL + params,
        method: 'GET',
        timeout: 2000
    }, function (error, response, body) {
        try {
            if (error) throw error;
            console.log("Charger All turned Off")
        } catch (error) {
            console.log("Communication Error (ALL) ");
            const user = {
                name: "ALL"
            }
            record_error(user);
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
            timeout: 2000
        }, function (error, response, body) {
            try {
                if (error) throw error;
                console.log("Charger working Well");
                update_battery(user.no, updated_battery);
                record_event(user, updated_battery, current_price);
            } catch (error) {
                console.log("Communication Error");
                record_error(user);
            }
        });
    } else console.log("Error in parameter");
}


// every 00:00.01
const predict_data = schedule.scheduleJob('1 0 0 * * *', function(){
// const predict_data = schedule.scheduleJob('* * * * * *', function(){
    const date = (new Date()).getDate();
    db_connection.query(
        QUERY_GETLOADDATA(date), (err, results) => {
            if(err) throw err;
            else {
                //convert data into price
                const load_data = Object.values(results[0]).slice(3, 27);
                const price_data = load_to_price(load_data)
                // update price_24
                db_connection.query(
                    QUERY_PREDICT(price_data), (err, results) => {
                        if(err) throw err;
                        else console.log("predict Completed");
                    }
                )
            }
        }
    )
});
// predict_data.cancel();

// every 16:00.00
const predict_data_16 = schedule.scheduleJob('1 0 16 * * *', function(){
// const predict_data_16 = schedule.scheduleJob('* * * * * *', function(){
    const date = (new Date()).getDate();
    db_connection.query(
        QUERY_GETLOADDATATWO(date), (err, results) => {
            if(err) throw err;
            else {
                // convert two day data into price
                const load_data_day_one = Object.values(results[0]).slice(19, 27);
                const load_data_day_two = Object.values(results[1]).slice(3, 19);
                const price_data_day_one = load_to_price(load_data_day_one)
                const price_data_day_two = load_to_price(load_data_day_two)
                const price_data = price_data_day_two.concat(price_data_day_one);
                // update price_24
                db_connection.query(
                    QUERY_PREDICT(price_data), (err, results) => {
                        if(err) throw err;
                        else console.log("Predict 16 Compelted");
                    }
                )
            }
        }
    )
    });
// predict_data_16.cancel();


// every **:00.10
const set_charge = schedule.scheduleJob('10 0 * * * *', function(){
// const charge = schedule.scheduleJob('*/10 * * * * *', function(){
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
                console.log("Number of Users: ", length);

                // init
                all_off();
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
                            const type = user.charge_type;
                            console.log("\nUser Name: ", user.name);

                            // Charge type - battery
                            if ( type == 'battery' ){
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
                                            console.log("Charge by price!");
                                            const updated_battery = user.current_battery > 75 ? 100 : user.current_battery+25;
                                            charge_on_off(charger_conversion[user.charger], 1, user, updated_battery, current_price);
                                            break;
                                        }
                                    }
                                }    
                            }

                            // Charge type - price
                            else if ( type == 'price' ) {
                                if ( user.goal_battery_or_price >= current_price || user.goal_battery_or_price == null) {
                                    console.log("Charge!");
                                    const updated_battery = user.current_battery > 75 ? 100 : user.current_battery+25;
                                    charge_on_off(charger_conversion[user.charger], 1, user, updated_battery, current_price);
                                }
                            }

                        }, 2000 * (i+1) )
                    })(user_num);
                }
            }
        }
    );
});
// set_charge.cancel();
