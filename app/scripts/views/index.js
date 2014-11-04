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
          type = $('.search-type :selected').val().split('-').join(' '),
          collection;
      this.searchCollection = {
            startDate: new Date(startDate),
            endDate: DanceCard.Utility.addDays(new Date(endDate), 1),
            distance: distance,
            type: type
          };
      if (location) {
        DanceCard.Utility.findLocation(location)
        .done(function(location) {
          self.searchCollection.location = location.point;
          collection = new DanceCard.Collections.SearchEventList(self.searchCollection);
          _.invoke(this.children, 'remove');
          self.removeChildren();
          self.makeList(collection, location);
          self.makeMap(collection, location.point);
        });
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
      this.removeChildren();
      this.makeList(collection);
      this.makeMap(collection, point);
    },
    makeMap: function(collection, point) {
      var lat = point.latitude,
          lng = point.longitude;
      this.children.push(new DanceCard.Views.MapPartial({
        $container: this.$el,
        zoom: 9,
        loc: {lat: lat, lng: lng},
        collection: collection
      }));
    },
    makeList: function(collection, loc) {
      loc = loc || undefined;
      this.children.push(new DanceCard.Views.EventListPartial({
        $container: this.$el,
        collection: collection,
        searchResults: this.searchCollection,
        location: loc
      }));
    }
  });

})();
