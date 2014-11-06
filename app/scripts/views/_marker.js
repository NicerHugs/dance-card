(function() {
  'use strict';

  DanceCard.Views.MarkerPartial = DanceCard.Views.Base.extend({
    render: function() {
      var self = this,
          position = {
            lat: this.model.get('point')._latitude,
            lng: this.model.get('point')._longitude
          },
          color = this.setColor(this.model),
          image= "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color;
      this.infowindow = new google.maps.InfoWindow({
        content: DanceCard.templates._infoWindow(this.model.toJSON())
      });
      this.marker = new google.maps.Marker({
        map: this.options.map,
        position: position,
        icon: image
      });
      google.maps.event.addListener(this.marker, 'click', function() {
        self.infowindow.open(self.options.map, self.marker);
      });
    },

    setColor: function(model) {
      var iconColors = {
        a: ['contra dance', '00A79D'],
        b: ['caller workshop', '21409A'],
        c: ['dance weekend', '61D515'],
        d: ['square dance', '00ACEF'],
        e: ['waltz workshop', '9079DB'],
        f: ['waltz', 'F36523'],
        g: ['contra workshop', 'FFDE17'],
        h: ['advanced contra dance', 'FF0A81']
      },
      color = _.filter(iconColors, function(color) {
        if (model.get('type') === color[0]){
          return color;
        }
      })[0][1];
      return color;
    }

  });

})();
