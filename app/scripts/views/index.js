(function() {
  'use strict';

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    className: 'index',
    template: DanceCard.templates.index,
    render: function() {
      var self = this;
      this.$el.html(this.template());
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude,
            point = new Parse.GeoPoint(lat, lng),
            collection = new DanceCard.Collections.SearchEventList({
              startDate: new Date(),
              endDate: DanceCard.Utility.addDays(new Date(), 7),
              location: point,
              distance: 50,
              type: 'all'
            });
        // console.log(self.searchResults());
        self.map = new DanceCard.Views.MapPartial({
          $container: self.$el,
          zoom: 9,
          loc: {lat: lat, lng: lng},
          collection: collection
        });
      });
    },
    events: {
      'click .search-submit' : 'searchResults'
    },
    searchResults: function(userPoint) {
      var startDate = $('.search-start-date').val() || new Date(),
          endDate = $('.search-end-date').val() || DanceCard.Utility.addDays(new Date(), 7),
          location = $('.search-location').val() || undefined,
          distance = $('.search-distance').val() || 50,
          type = $('.search-type :selected').val();
      if (location) {
        // get the location with geocode,
        // get a geopoint with the geocode data
        // go get a collection using this data and return the collecion
        return 'location given';
      } else {
        // go get the collection using userPoint
        return 'no location given';
      }
    }
  });

})();
