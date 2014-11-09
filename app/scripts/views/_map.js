(function() {
  'use strict';

  DanceCard.Views.MapPartial = DanceCard.Views.Base.extend({
    id: 'map-canvas',
    render: function() {
      var self = this;
      this.zoomArray = [];
      this.map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: this.options.zoom,
        center: this.options.loc
      });
      if (this.collection) {
        this.collection.fetch()
        .then(function() {
          if (self.collection.models.length > 0) {
            self.renderChildren(self.collection);
            var bounds = new google.maps.LatLngBounds();
            _.each(self.zoomArray, function(bound) {
              bounds.extend(bound);
            });
            self.map.fitBounds(bounds);
          }
        });
      } else if (this.model) {
        self.children.push(new DanceCard.Views.MarkerPartial({
          $container: self.$el,
          model: self.model,
          map: self.map,
          bounds: this.zoomArray
        }));
      }
    },

    renderChildren: function(collection) {
      var self = this;
      _.each(collection.models, function(model) {
        self.children.push(new DanceCard.Views.MarkerPartial({
          $container: self.$el,
          model: model,
          map: self.map,
          bounds: self.zoomArray
        }));
      });
    },

    events: {
      'click .address' : 'getDirections'
    },

    getDirections: function(e) {
      e.preventDefault();
      var self = this;
      _.each(this.children, function(child) {
        child.marker.setMap(null);
      });
      if (localStorage.getItem('danceCardLoc')) {
        var position = JSON.parse(localStorage.getItem('danceCardLoc')),
            lat = position.coords.latitude,
            lng = position.coords.longitude,
            latLng = new google.maps.LatLng(lat, lng);
      }

      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      var map = this.map;

      function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        self.$el.append('<div id="directionsPanel"></div>');
        directionsDisplay.setPanel(document.getElementById("directionsPanel"));
      }

      function calcRoute() {
        var start = latLng;
        var end = $(e.target).text();
        var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        });
      }
      initialize();
      calcRoute();
    }



  });

})();
