var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

const DB = require('./secure/DB_info');
const db_connection = DB.info();

/*
    * : every value
    /n : do every n
*/
// second, minute, hour, day of month, month, dae of week
// to stop, test.cancel();
var test = schedule.scheduleJob('*/10 * * * * *', function(){ 
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


var test_2 = schedule.scheduleJob('0 0 */1 * * *', function(){ 
    const dt = new Date();
    const hour = dt.getHours();
    const min = dt.getMinutes();
    // console.log(`current time : ${dt}\n`);
    db_connection.query(
        `
            INSERT INTO schedule_test (test_a, test_b) VALUES
            (
                ${hour}, ${min}
            )
        `, (err, results) => {
        }
    )
});

