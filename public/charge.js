const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/charge.html")
});
  

router.post('/new_user', function (req, res) {
    // if ( req.body.name != '' && req.body.car != '' && req.body.battery != '' ) {
    //     db_connection.query(`INSERT INTO user_info (name, car, battery) VALUES ('${req.body.name}', '${req.body.car}', '${req.body.battery}')`, (err, results) => {
    //         if(err) throw err;
    //         // else console.log(results);
    //     });
    // }
    res.redirect('/charge');
});

module.exports = router;