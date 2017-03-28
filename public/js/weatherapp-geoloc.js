//const geocode = require('./geocode.js');

function unitViewer(){
  $(".unit-switch").hide();
  $("#temperature").hover(function(){
    $(".unit-switch").show(500);
  },function(){
    $(".unit-switch").hide(500);
  });
}

function setWeatherBG(){

      $("body").css({"background":"url(Images/sunny.jpg) no-repeat top center fixed","background-size":"cover"});
      $("#box-holder").css({"background":"rgba(59, 64, 74, 0.6)","color":"#bfcef1"});
      $(".content-circles").css({"border-bottom":"5px solid #346886"});
      $(".unit-switch").css({"background":"rgba(68,96,107,0.6)"});
   }

function getWeather(lat,lon){
  var head = "https://api.wunderground.com/api/";
  var key = "8a64c27a6a013bb6";
  var con = "/conditions/q/";
  var query = lat+","+lon+".json";
  var url= head+key+con+query;


  $.getJSON(url,function(data){
    var info = data.current_observation;
    var degUnit = "°F";
    var tempC = Math.floor(info.temp_c);
    var tempF = Math.floor(info.temp_f);

    $("#temp").text(info.temp_f);
    $(".unit").text(degUnit);
    $("#weather").text(info.weather);
    $("#location").text(info.display_location.full);
    $("#icon").attr("src", info.icon_url);
    $("#hitbox").on("click",function(){
      switch(degUnit){
          case "°F":
            degUnit = "°C";
            $(".unit").text(degUnit);
            $("#temp").text(tempC);
          break;
          case "°C":
            degUnit = "°F";
            $(".unit").text(degUnit);
            $("#temp").text(tempF);
          break;
      }
    });
    setWeatherBG();
  });
}

function getCoordinatesFromGoogle(address){
  var head = "https://api.wunderground.com/api/";
  var key = "8a64c27a6a013bb6";
  var con = "/conditions/q/";
  var query = lat+","+lon+".json";
  var url= head+key+con+query;


  $.getJSON(url,function(data){
    var info = data.current_observation;
    var degUnit = "°F";
    var tempC = Math.floor(info.temp_c);
    var tempF = Math.floor(info.temp_f);

    $("#temp").text(info.temp_f);
    $(".unit").text(degUnit);
    $("#weather").text(info.weather);
    $("#location").text(info.display_location.full);
    $("#icon").attr("src", info.icon_url);
    $("#hitbox").on("click",function(){
      switch(degUnit){
          case "°F":
            degUnit = "°C";
            $(".unit").text(degUnit);
            $("#temp").text(tempC);
          break;
          case "°C":
            degUnit = "°F";
            $(".unit").text(degUnit);
            $("#temp").text(tempF);
          break;
      }
    });
    setWeatherBG();
  });
}

function getHardCodedCoordinates(){
    console.log('in getHardCodedCoordinates()');
          var lat = 37.776289;
          var lng = -122.395234;
          getWeather(lat,lng);
}

function getPWSCoordinates(){
  console.log('getting coorginates from user');
  var address = $("#PWSid").val();
    var lat = 52.219116;
    var lng = -0.8743845000000001;
    getWeather(lat,lng);
}

// function getMyLocation() {
//
//   console.log('in getCoordinatesForLocation() ');
//   geocode.geocodeAddress(address, (errorMessage, results) => {
//     if (errorMessage) {
//       console.log(errorMessage);
//     } else {
//       console.log(results.address);
//       // weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
//       //   if (errorMessage) {
//       //     console.log(errorMessage);
//       //   } else {
//       //     console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
//       }
//       });
//
// }

function getMyLocation(){
  console.log('getMyLocation()');
  if(navigator.geolocation){
    console.log('fetching geo-location');
        navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          getWeather(lat,lng);
      });
  }
  else{
    x.innerHTML = alert("Geolocation is not supported by browser");
  }
}

$(document).ready(function(){
  getMyLocation();
//  getHardCodedCoordinates();
  unitViewer();
  }
);
