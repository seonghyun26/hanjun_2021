const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/charge.html")
});


router.post('/battery', function (req, res) {
    // if ( req.body.name != '' && req.body.car != '' && req.body.battery != '' ) {
    //     db_connection.query(`INSERT INTO user_info (name, car, battery) VALUES ('${req.body.name}', '${req.body.car}', '${req.body.battery}')`, (err, results) => {
    //         if(err) throw err;
    //         // else console.log(results);
    //     });
    // }
    console.log(req.body.id);
    console.log(req.body.current_battery);
    console.log(req.body.goal_battery);
    res.redirect('/charge');
});

module.exports = router;