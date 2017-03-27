const request = require('request');

var pwsGeoCodes = (pwsId, callback) => {
  var encodedpwsId = encodeURIComponent(pwsId);

  request({
    url: `http://api.wunderground.com/api/8a64c27a6a013bb6/geolookup/q/pws:${encodedpwsId}.json`,
    json: true
  }, (error, response, body) => {
    console.log('in function')
    if (error) {
      console.log('Unable to fetch PWS from WUnderground.');
        callback('Unable to fetch PWS from WUnderground.');
    } else {
      console.log('country: '+body.location.country);
      var station = body.location.nearby_weather_stations.pws.station[0];
      var lat = station.lat;
      var lng = station.lon;
  //    console.log('nearby_weather_stations: '+city);
      console.log('lat: '+lat);
      console.log('lng: '+lng);
      callback(undefined, {
        latitude: lat,
        longitude: lng
      });
    }
  });

};

module.exports.pwsGeoCodes = pwsGeoCodes;
