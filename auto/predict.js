const schedule = require('node-schedule');

const DB = require('../secure/DB_info');
const db_connection = DB.info();


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

const QUERY_PRICETODB = function (month, day, data) {
    return `
        INSERT INTO history_price
        (
            month, day,
            h0, h1, h2, h3, h4, h5,
            h6, h7, h8, h9, h10, h11,
            h12, h13, h14, h15, h16, h17,
            h18, h19, h20, h21, h22, h23
        )
        VALUES
        (
            ${month}, ${day},
            ${data[0]},${data[1]},${data[2]},${data[3]},${data[4]},${data[5]},
            ${data[6]},${data[7]},${data[8]},${data[9]},${data[10]},${data[11]},
            ${data[12]},${data[13]},${data[14]},${data[15]},${data[16]},${data[17]},
            ${data[18]},${data[19]},${data[20]},${data[21]},${data[22]},${data[23]}
        )
    `;
}

// every 00:00.01
const predict_data = schedule.scheduleJob('10 0 0 * * *', function(){
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


const predict_data_to_DB = schedule.scheduleJob('0 1 0 * * *', function(){
// const predict_data_to_DB = schedule.scheduleJob('* * * * * *', function(){
    db_connection.query(
        `SELECT * FROM price_24`, (err, results) => {
            if(err) throw err;
            else {
                var price = [];
                results.forEach( element => { price.push(element.price) });
                const today = new Date();
                db_connection.query(
                    QUERY_PRICETODB(today.getMonth()+1, today.getDate(), price), (err, results) => {
                        if(err) throw err;
                        else console.log("Price saved to DB");
                    }
                )
            }
        }
    )
});
// predict_data_to_DB.cancel();