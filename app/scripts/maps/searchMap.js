(function() {
  'use strict';

  function initializeMap(userLocation, queryResults) {
    var mapOptions = {
      zoom: 8,
      center: userLocation
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    // var initialLocation;

    _.each(queryResults, function(result) {
      var position = {
        lat: result.location.latitude,
        lng: result.location.longitude
        };
      var market = new google.maps.Marker({
        map: map,
        position: position
      });
    });
  }

  function renderSearchMap(queryResults){
    navigator.geolocation.getCurrentPosition(
      function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var userLocation = new google.maps.LatLng(lat, lng);
        initializeMap(userLocation, queryResults);
      },
      function(){
        console.log('the browser didnt support geolocation');
      }
    );
  }

  renderSearchMap([{location: { latitude: 34.397, longitude: -84.644}}]);

})();
