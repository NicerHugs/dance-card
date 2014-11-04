(function() {
  'use strict';

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    className: 'index',
    template: DanceCard.templates.index,
    render: function() {
      var self = this;
      this.$el.html(this.template());
      this.searchResults();
    },
    events: {
      'click .search-submit' : 'runSearchResults'
    },
    runSearchResults: function(e) {
      e.preventDefault();
      this.searchResults();
    },
    searchResults: function() {
      var self = this,
          startDate = $('.search-start-date').val() || new Date(),
          endDate = $('.search-end-date').val() || DanceCard.Utility.addDays(new Date(), 6),
          location = $('.search-location').val() || undefined,
          distance = $('.search-distance').val() || 50,
          type = $('.search-type :selected').val().split('-').join(' ');
      this.searchCollection = {
            startDate: new Date(startDate),
            endDate: DanceCard.Utility.addDays(new Date(endDate), 1),
            distance: distance,
            type: type
          };
      if (location) {
        // get the location with geocoder,
        // then get a geopoint with the geocoder data (is this Utility.getLocation?)
        // then collection.location = point
        // return promise of collection
        return collection;
      } else {
        navigator.geolocation.getCurrentPosition(_.bind(this.userLocSearchResults, this));
      }
    },
    userLocSearchResults: function(position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude,
          point = new Parse.GeoPoint(lat, lng),
          collection;
      this.searchCollection.location = point;
      collection = new DanceCard.Collections.SearchEventList(this.searchCollection);
      this.makeMap(collection, point);
    },
    makeMap: function(collection, point) {
      var lat = point.latitude,
          lng = point.longitude;
      if (this.map) {
        this.map.remove();
      }
      this.map = new DanceCard.Views.MapPartial({
        $container: this.$el,
        zoom: 9,
        loc: {lat: lat, lng: lng},
        collection: collection
      });
      console.log(this.map);
    }
  });

})();
