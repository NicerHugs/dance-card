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
        marker = new google.maps.Marker({
          map: self.map,
          position: position
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
    }
  });

})();
