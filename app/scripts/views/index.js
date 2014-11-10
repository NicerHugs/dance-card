(function() {
  'use strict';

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    className: 'index',
    template: DanceCard.templates.index,
    render: function() {
      this.$el.html(this.template());
      this.searchResults();
    },
    events: {
      'click .search-submit' : 'searchResults',
      'click .cancel'        : 'removeAlert'
    },


    removeAlert: function(e) {
      e.preventDefault();
      $('.login-req-notif').remove();
    },

    searchResults: function(e) {
      if (e) e.preventDefault();
      var self = this,
          startDate = $('.search-start-date').val() || new Date(),
          endDate = $('.search-end-date').val() || DanceCard.Utility.addDays(new Date(), 6),
          location = $('.search-location').val() || undefined,
          distance = $('.search-distance').val() || 50,
          type = $('.search-type :selected').val().split('-').join(' '),
          collection;
      this.attrs = {
            startDate: new Date(startDate),
            endDate: DanceCard.Utility.addDays(new Date(endDate), 1),
            distance: distance,
            type: type
          };
      if (location) {
        DanceCard.Utility.findLocation(location)
        .done(function(location) {
          self.attrs.location = location.point;
          collection = new DanceCard.Collections.SearchEventList(self.attrs);
          _.invoke(this.children, 'remove');
          self.removeChildren();
          self.makeList(collection, location);
          self.makeMap(collection, location.point);
        });
      } else {
        this.$el.append('<div class="map-loading"><i class="fa fa-spinner fa-spin"></i></div>');
        // if (localStorage.getItem('danceCardLoc')) {
        //   var position = JSON.parse(localStorage.getItem('danceCardLoc'));
        //   this.userLocSearchResults(position);
        // }
        navigator.geolocation.getCurrentPosition(_.bind(this.userLocSearchResults, this));
      }
    },

    userLocSearchResults: function(position) {
      $('.map-loading').remove();
      var lat = position.coords.latitude,
          lng = position.coords.longitude,
          point = new Parse.GeoPoint(lat, lng),
          collection;
      localStorage.setItem('danceCardLoc', JSON.stringify(position));
      this.attrs.location = point;
      collection = new DanceCard.Collections.SearchEventList(this.attrs);
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
        searchResults: this.attrs,
        location: loc
      }));
    }
  });

})();
