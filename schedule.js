const schedule = require('node-schedule');

const DB = require('./secure/DB_info');
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


const test_2 = schedule.scheduleJob('0 0 */1 * * *', function(){ 
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

