(function() {
  'use strict';

  function initializeMap(userLocation, queryResults) {
    var mapOptions = {
      zoom:9,
      center: userLocation
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    _.each(queryResults.models, function(result) {
      var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+
        '<a href="#/orgs/'+
        result.attributes.orgUrlId+'/'+result.attributes.urlId+'">'+
        result.attributes.name + '</a></h1>'+
        '<div id="bodyContent">'+
        '<p>'+ result.attributes.startDate + result.attributes.startTime +'</p>'+
        '<p>'+ result.attributes.venue.fullAddress +'</p>'+
        '</div>'+
        '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      var position = {
        lat: result.attributes.point._latitude,
        lng: result.attributes.point._longitude
        };
      var marker = new google.maps.Marker({
        map: map,
        position: position
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
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
      });
    });
    return deferred.promise();
  };

})();















//
