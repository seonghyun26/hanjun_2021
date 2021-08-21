const schedule = require('node-schedule');

const DB = require('../secure/DB_info');
const db_connection = DB.info();

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

function predict_data_to_DB (){
// const predict_data_to_DB = schedule.scheduleJob('* * * * * *', function(){
    db_connection.query(
        `SELECT * FROM history_load where day='9'`, (err, results) => {
            if(err) throw err;
            else {
                const data = results[0];
                const hour_data = Object.values(data).slice(3, 27);
                const price_data = load_to_price(hour_data)
                const today = new Date();
                console.log(price_data)
                db_connection.query(
                    QUERY_PRICETODB(today.getMonth()+1, 9, price_data), (err, results) => {
                        if(err) throw err;
                        else console.log("Price saved to DB");
                    }
                )
            }
        }
    )
};

predict_data_to_DB();