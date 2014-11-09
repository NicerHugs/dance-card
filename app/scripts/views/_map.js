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
        var mapUrl = self.getMapUrl(model);
        self.children.push(new DanceCard.Views.MarkerPartial({
          $container: self.$el,
          model: model,
          map: self.map,
          bounds: self.zoomArray,
          mapUrl: mapUrl
        }));
      });
    },

    getMapUrl: function(model) {
      var position = JSON.parse(localStorage.getItem('danceCardLoc')),
          start = position.coords.latitude + ',' + position.coords.longitude,
          end = model.get('venue').fullAddress.split(' ').join('+'),
          url = 'https://www.google.com/maps/dir/' + start + '/' +  end;
      return url;
    }

  });

})();
