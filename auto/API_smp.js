const schedule = require('node-schedule');
const request = require('request');
const convert = require('xml-js');

const API = require('../secure/API_info.js');
const DB = require('../secure/DB_info');
const db_connection = DB.info();

const QUERY_NEWSMP = function (date, data) {
    return `
        INSERT INTO history_smp (
            date, h0, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11,
            h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23
        )
        VALUES (
            ${date},
            ${data[0]},
            ${data[1]},
            ${data[2]},
            ${data[3]},
            ${data[4]},
            ${data[5]},
            ${data[6]},
            ${data[7]},
            ${data[8]},
            ${data[9]},
            ${data[10]},
            ${data[11]},
            ${data[12]},
            ${data[13]},
            ${data[14]},
            ${data[15]},
            ${data[16]},
            ${data[17]},
            ${data[18]},
            ${data[19]},
            ${data[20]},
            ${data[21]},
            ${data[22]},
            ${data[23]}
        )
    `;
}

// every 00/06/12/18 : 05
const new_api = schedule.scheduleJob('0 5 */6 * * *', function(){
    // API smp
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (1 + today.getMonth())).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    db_connection.query(`SELECT * FROM history_smp WHERE date="${year+month+day}"`, (err, results) => {
        if(err) throw err;
        else {
            if ( results.length == 0) {
                request({
                    url: API.smpURL() + API.smpQuery(),
                    method: 'GET'
                }, function (error, response, body) {
                    if (error) throw error;
                    else {
                        console.log('Status', response.statusCode);
                        var parsedJSON = JSON.parse(convert.xml2json(body, {compact: true, spaces: 2}));
                        var todayDate = parsedJSON.response.body.items.item[0].tradeDay._text;
                        var todayData = parsedJSON.response.body.items.item;
                        var todayValues = [];
                        for( i = 0 ; i < todayData.length ; i++){
                            todayValues.push(todayData[i].smp._text);
                        }
                        console.log(todayDate);
                        console.log(todayValues);
                        db_connection.query(QUERY_NEWSMP(todayDate, todayValues), (err, results) => {
                            if(err) throw err;
                        });
                        
                    }
                });
            }
            else console.log("Data Already Exists");
        }
    });
    
});

// new_api.cancel();