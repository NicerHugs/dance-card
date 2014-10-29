(function() {
  'use strict';

  function initializeMap(userLocation, queryResults) {
    var mapOptions = {
      zoom:9,
      center: userLocation
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    _.each(queryResults.models, function(result) {
      console.log(result);
      var position = {
        lat: result.attributes.point._latitude,
        lng: result.attributes.point._longitude
        };
      var market = new google.maps.Marker({
        map: map,
        position: position
      });
    });
  }

  DanceCard.renderSearchMap = function(queryResults){
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
  };

  function addDays(dateObj, numDays) {
   dateObj.setDate(dateObj.getDate() + numDays);
   return dateObj;
  }

  DanceCard.locDateSearchQuery = function(distance, time){
    distance = distance || 25;
    time = time || 7;
    var dateLimit = addDays(new Date(), time);
    var deferred = new $.Deferred();
    var query = new Parse.Query(DanceCard.Models.Event);
    query.greaterThanOrEqualTo('startDate', new Date());
    query.lessThanOrEqualTo('startDate', dateLimit);
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var userLocation = new Parse.GeoPoint({latitude: lat, longitude: lng});
      query.withinMiles('point', userLocation, distance);
      var collection = query.collection();
      collection.fetch()
      .then(function() {
        deferred.resolve(collection);
        console.log(collection);
      });
    });
    return deferred.promise();
  };

})();















//
