const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "202107powerPrediction.csv");

const DB = require('../secure/DB_info.js');
const db_connection = DB.info();

const QUERY_NEWDATA = function (day_of_week, day, data) {
    return `
        INSERT INTO history_load
        (   
            day_of_week, month, day,
            h0, h1, h2, h3, h4, h5,
            h6, h7, h8, h9, h10, h11,
            h12, h13, h14, h15, h16, h17,
            h18, h19, h20, h21, h22, h23
        )
        VALUES
        (
            ${day_of_week}, 7, ${day},
            ${data[0]},${data[1]},${data[2]},${data[3]},${data[4]},${data[5]},
            ${data[6]},${data[7]},${data[8]},${data[9]},${data[10]},${data[11]},
            ${data[12]},${data[13]},${data[14]},${data[15]},${data[16]},${data[17]},
            ${data[18]},${data[19]},${data[20]},${data[21]},${data[22]},${data[23]}
        )
    `
}

function save(filePath) {
    
    var data = fs.readFileSync(filePath, {encoding: "utf8"});
    var rows = data.split("\n");

    for (var rowIndex in rows) {
        var row = rows[rowIndex].split(",");
        var day_of_week = parseInt(row[0]);
        var date = parseInt(row[1]);
        var data = row.slice(2, 26);
        var num_data = []
        data.forEach(element => num_data.push(parseInt(element)))
        console.log(num_data);
        console.log(num_data[23])
        // db_connection.query(QUERY_NEWDATA(day_of_week, date, num_data), (err, results) => {
        //     if (err)    throw err;
        // })
    }
}

save(filePath);