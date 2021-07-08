const express = require('express');
const request = require('request');
const convert = require('xml-js');
const router = express.Router();

const chart_template = require('./view/chart_template.js');

// const information
const serviceKey = 'Nzmbm6X06v%2BKFHEtWBn1LJG6XGCdRYGIFiEi%2BGl6BNfaS2C6ki3Hq%2FWXk5TlqTPfKjTTaWAcI%2FH%2F%2FS7BZ%2FtxNw%3D%3D';
const URL = 'https://openapi.kpx.or.kr/openapi/smp1hToday/getSmp1hToday';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
queryParams += '&' + encodeURIComponent('areaCd') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('tradeDay') + '=' + encodeURIComponent('20210701');


router.get('/', function (req, res) {
    request({
        url: URL + queryParams,
        method: 'GET'
      }, function (error, response, body) {
        // console.log('Status', response.statusCode);
        // console.log('Headers', JSON.stringify(response.headers));
        var parsedJSON = JSON.parse(convert.xml2json(body, {compact: true, spaces: 2}));
        var todayDate = parsedJSON.response.body.items.item[0].tradeDay._text;
        var todayData = parsedJSON.response.body.items.item;
        var todayLabels = [];
        var todayValues = [];
        for( i = 0 ; i < todayData.length ; i++){
          todayLabels.push(todayData[i].tradeHour._text);
          todayValues.push(todayData[i].smp._text);
        }
        // console.log(todayLabels, todayValues);
        var html = chart_template.HTML(todayLabels, todayValues, todayDate);
        res.write(html);
        res.end();
      });
});


module.exports = router;