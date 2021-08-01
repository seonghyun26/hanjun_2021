const express = require('express');
const request = require('request');
const convert = require('xml-js');
const router = express.Router();

// template, information
const chart_template = require('./template/api_template.js');
const API = require('../secure/API_info.js');


router.get('/', function (req, res) {
  var today = new Date();
  var hour = today.getHours();
  var yearMonthDay = today.getFullYear().toString() + ("0" + (today.getMonth()+1)).slice(-2)
  if ( hour < 6 )   {
    today.setDate(today.getDate() - 1 );
    yearMonthDay +=  ("0" + today.getDate()).slice(-2) + "18";
  }
  else if ( hour < 18 )   yearMonthDay +=  ("0" + today.getDate()).slice(-2) + "06";
  else yearMonthDay += ("0" + today.getDate()).slice(-2) + "18";
  var weatherQueryParams = '&' + encodeURIComponent('time') + '=' + encodeURIComponent(yearMonthDay);

  request({
    url: API.weatherURL() + API.weatherQuery() + weatherQueryParams,
    method: 'GET'
  }, function (error, response, body) {
    if( error ) throw error;
    else {
      console.log('Status', response.statusCode);
      var parsedJSON = JSON.parse(response.body);
      var weatherInfo = parsedJSON.response.body.items.item[0];
      var todayLabels = [];
      var todayWeather = [];
      for( i = 1 ; i < 22; i++) {
        var value = eval('weatherInfo.h'+3*i);
        if ( value != '' ) {
          todayLabels.push(3*i);
          todayWeather.push(value);
        }
      }
      var html = chart_template.HTML_weather(
        todayLabels, todayWeather, yearMonthDay, 
        Math.max.apply(null, todayWeather),
        Math.min.apply(null, todayWeather),
        Math.max.apply(null, todayWeather) - Math.min.apply(null, todayWeather)
      );
      res.write(html);
      res.end();
    }
  });
});

router.get('/smp', function (req, res) {
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
      var todayLabels = [];
      var todayValues = [];
      for( i = 0 ; i < todayData.length ; i++){
        todayLabels.push(todayData[i].tradeHour._text);
        todayValues.push(todayData[i].smp._text);
      }
      var html = chart_template.HTML_SMP(todayLabels, todayValues, todayDate);
      res.write(html);
      res.end();
    }
  });
});

router.get('/json', function (req, res) {
  request({
    url: API.smpURL() + API.smpQuery(),
    method: 'GET'
  }, function (error, response, body) {
    if (error) throw error;
    else {
      console.log('Status', response.statusCode);
      var xmlToJSON = convert.xml2json(body, {compact: true, spaces: 2});
      res.write(xmlToJSON);
      res.end();
    }
  });
});


module.exports = router;