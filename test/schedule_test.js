const schedule = require('node-schedule');

const DB = require('../secure/DB_info');
const db_connection = DB.info();

const QUERY_TEST = function (par1, par2) {
    return `
        INSERT INTO schedule_test (test_a, test_b) VALUES
        (
            ${par1}, ${par2}
        )
    `
};


// ** How to use **
// - * : every value
// - /n : do every n
// 6 values : second, minute, hour, day of month, month, dae of week
// To stop : test.cancel();


const test = schedule.scheduleJob('*/10 * * * * *', function(){ 
    const dt = new Date();
    const min = dt.getMinutes();
    const sec = dt.getSeconds();
    db_connection.query(
        `
            INSERT INTO schedule_test (test_a, test_b) VALUES
            (
                ${min}, ${sec}
            )
        `, (err, results) => {
            if(err) throw err;
        }
    )
});
test.cancel();


const test2 = schedule.scheduleJob('0 0 */1 * * *', function(){ 
    const dt = new Date();
    const hour = dt.getHours();
    const min = dt.getMinutes();
    // console.log(`current time : ${dt}\n`);
    db_connection.query(
        QUERY_TEST(hour, min), (err, results) => {
            if(err) throw err;
        }
    )
});
test2.cancel();



const QUERY_GETPRICE = `SELECT * FROM price_24 ORDER BY price, hour;`;
const test3 = schedule.scheduleJob('* * * * * *', function(){ 
    db_connection.query(
        QUERY_GETPRICE, (err, results) => {
            if(err) throw err;
            else {
                const price = results;
                const currentHour = 19;
                const exit_time = 21;
                const time_left = ( exit_time - currentHour + 24) % 24;
                const number_of_charge_needed = 1;
                console.log(price);
                console.log("hour:", currentHour, ", time left: ", time_left)
                var cnt = 0;
                for( i = 0 ; i < 24 ; i++ ){
                    // skip if not in time limit
                    if ( (exit_time - price[i].hour + 24) % 24 > time_left || exit_time == price[i].hour) {
                        if ( i == 23 ) console.log("off");
                        else {
                            console.log("i :", i, ", hour:", price[i].hour, "skip");
                            continue;
                        }
                    }
                    else if( price[i].hour == currentHour && cnt < number_of_charge_needed ) {
                        console.log("i :", i, ", hour:", price[i].hour, "charge");
                        break;
                    } 
                    else {
                        console.log("i :", i, ", hour:", price[i].hour, "nothing");
                        cnt++;
                    }
                }
            }
        }
    )
});
test3.cancel();