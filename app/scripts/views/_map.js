(function() {
  'use strict';

  DanceCard.Views.MapPartial = DanceCard.Views.Base.extend({
    id: 'map-canvas',
    render: function() {
      var self = this;
      this.map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: this.options.zoom,
        center: this.options.loc
      });
      this.options.collection.fetch()
      .then(function() {
        self.renderChildren(self.options.collection);
      });
    },

    renderChildren: function(collection) {
      var self = this;
      _.each(collection.models, function(event) {
        var position = {
          lat: event.attributes.point._latitude,
          lng: event.attributes.point._longitude
        },
        color = self.setColor(event),
        image= "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color,
        marker = new google.maps.Marker({
          map: self.map,
          position: position,
          icon: image
        }),
        contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">'+
          '<a href="#/orgs/'+
          event.attributes.orgUrlId+'/'+event.attributes.urlId+'">'+
          event.attributes.name + '</a></h1>'+
          '<div id="bodyContent">'+
          '<p>'+ event.attributes.startDate + event.attributes.startTime +'</p>'+
          '<p>'+ event.attributes.venue.fullAddress +'</p>'+
          '</div>'+
          '</div>',
        infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(self.map, marker);
        });
      });
    },

    setColor: function(event) {
      var iconColors = {
        a: ['contra dance', 'FF9800'],
        b: ['caller workshop', '263248'],
        c: ['dance weekend', ''],
        d: ['square dance', ''],
        e: ['waltz workshop', ''],
        f: ['waltz', ''],
        g: ['contra workshop', ''],
        h: ['advanced contra dance', '']
      },
      color = _.filter(iconColors, function(color) {
        if (event.get('type') === color[0]){
          return color;
        }
      })[0][1];
      return color;
    }
  });

})();
