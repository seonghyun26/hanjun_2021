var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();


/*
    * : every value
    /n : do every n
*/
// second, minute, hour, day of month, month, dae of week
var j = schedule.scheduleJob('0 0 */1 * * *', function(){ 
    const dt = new Date();
    console.log(`current time : ${dt}\n`);

    //
});


// to stop
// j.cancel();
