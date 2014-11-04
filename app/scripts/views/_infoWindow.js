(function() {
  'use strict';

  DanceCard.Views.InfoWindowPartial = Parse.View.extend({
    initialize: function(options) {
      var result = options;
      var infowindow = new google.maps.InfoWindow({
        // content: contentString
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
    }
  });

})();
