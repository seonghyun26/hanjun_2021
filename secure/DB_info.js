const mysql = require('mysql');

const db_connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'2021',
    database:'ecosystem',
    multipleStatements: true 
});

module.exports = {
    info:function(){
        return db_connection;
    }
}