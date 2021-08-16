const DB = require('../../secure/DB_info');
const db_connection = DB.info();


const QUERY_TEST = 'Hello World';


const QUERY_UPDATE = function (no, battery) {
    return `
        UPDATE user_status set current_battery=${battery} WHERE no=${no}
    `;
}

const QUERY_UPDATELOG = function(user, battery, price, on_off){
    const today = new Date();
    today.setHours(today.getHours()+9);
    const dt = today.toISOString().slice(0, 19).replace('T', ' ');
    if ( on_off === 1 ) {
        return `
            INSERT INTO event_charge
            ( 
                dt, name, charge_type, charger, 
                before_battery, after_battery, goal_battery_or_price, price, exit_time
            )
            VALUES
            (
                '${dt}', '${user.name}', '${user.charge_type}', '${user.charger}', 
                '${user.current_battery}', '${battery}', '${user.goal_battery_or_price}', '${price}', '${user.exit_time}'
            )
        `;
    }
    else if ( on_off === 0 ){
        return `
            INSERT INTO event_charge
            ( 
                dt, name, charge_type, charger, 
                before_battery, after_battery, goal_battery_or_price, price, exit_time
            )
            VALUES
            (
                '${dt}', '${user.name}', '${user.charge_type}', '${user.charger}', 
                '${battery}', '${battery}', '${user.goal_battery_or_price}', '${price}', '${user.exit_time}'
            )
        `;
    }
    
}

const QUERY_UPDATELOGERROR = function(user) {
    const today = new Date();
    today.setHours(today.getHours()+9);
    const dt = today.toISOString().slice(0, 19).replace('T', ' ');
    return `
        INSERT INTO event_charge ( dt, name, charge_type)
        VALUES ('${dt}', '${user.name}', 'Request Error')
    `;
}

const QUERY_MOVEUSER = function(user) {
    return `
        INSERT INTO user_finished    
        SELECT * FROM user_status
        WHERE no='${user.no}'
    `;
}

const QUERY_DELETEUSER = function (user) {
    return `
        DELETE FROM user_status
        WHERE no='${user.no}'
    `;
}


module.exports = {
    update_battery: function (no, battery) {
        db_connection.query(
            QUERY_UPDATE(no, battery), (err, results) => {
                if(err) throw err;
            }
        );
    },

    record_event: function (user, update_battery, price, on_off) {
        db_connection.query(
            QUERY_UPDATELOG(user, update_battery, price, on_off), (err, results) => {
                if(err) throw err;
            }
        );
    },

    record_error: function (user){
        db_connection.query(
            QUERY_UPDATELOGERROR(user), (err, results) => {
                if(err) throw err;
            }
        );
    },

    move_to_finished: function(user) {
        db_connection.query(
            QUERY_MOVEUSER(user), (err, results) => {
                if(err) throw err;
            }
        );
    },

    delete_charging: function(user) {
        db_connection.query(
            QUERY_DELETEUSER(user), (err, results) => {
                if(err) throw err;
            }
        );
    },

    test: function() {
        return 'Hello World';
    }, test2: function() {
        console.log("Hello World 2")
    }
}