const request = require('request');

var geoWeather = (lat, lng, callback) => {

  request({
    url: `http://api.wunderground.com/api/8a64c27a6a013bb6/conditions/q/${lat},${lng}.json`,
    json: true
  }, (error, response, body) => {
    console.log('in function')
    if (error) {
      console.log('Unable to fetch PWS from WUnderground.');
      callback('Unable to fetch PWS from WUnderground.');
    } else {
      console.log('GOT DATA ');
      var crntObservation = body.current_observation;
      var temperature_string = crntObservation.temperature_string;
      var feelslike_string = crntObservation.feelslike_string;
      console.log('temperature_string: '+temperature_string);
      console.log('feelslike_string: '+feelslike_string);
      callback(undefined, {
             temperature: temperature_string,
             feelslike: feelslike_string
           });
    }
  });

};

module.exports.geoWeather = geoWeather;
