const request = require('request');
const URL = 'http://hyungu.asuscomm.com/';
const URL_1 = 'http://hyungu.asuscomm.com/A/1';
const URL_2 = 'http://hyungu.asuscomm.com/A/0';

var on = request({
    url: URL_1,
    method: 'GET'
}, function (error, response, body) {
    if( error ) {
      console.log(error)
    }
    else {
      console.log(response);
      var parsedJSON = JSON.parse(response);
      console.log(parsedJSON);
    }
});