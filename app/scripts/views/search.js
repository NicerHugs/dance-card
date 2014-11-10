(function() {
  'use strict';

  DanceCard.Views.Search = DanceCard.Views.Base.extend({
    className: 'search',
    template: DanceCard.templates.search,
    render: function() {
      if (this.options.searchTerms) {
        var searchTerms = this.options.searchTerms.split('+');
        this.attrs = {
          startDate: new Date(searchTerms[2]),
          endDate: new Date(searchTerms[3]),
          location: searchTerms[0],
          distance: +searchTerms[1],
          type: searchTerms[4]};
      }
      this.$el.html(this.template(this.attrs));
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
      var startDate,
          endDate;
      if ($('.search-start-date').val()) {
        startDate = moment($('.search-start-date').val()).format();
      } else {
        startDate = new Date();
      } if ($('.search-end-date').val()) {
        endDate = moment($('.search-end-date').val()).format();
      } else {
        endDate = DanceCard.Utility.addDays(new Date(), 7);
      }
      var self = this,
          startDateS = startDate.toString().split(' ').join('-'),
          endDateS = endDate.toString().split(' ').join('-'),
          location = $('.search-location').val() || undefined,
          distance = $('.search-distance').val() || 50,
          type = $('.search-type :selected').val().split('-').join(' '),
          collection,
          searchTerms;
      this.attrs = {
            startDate: new Date(startDate),
            endDate: DanceCard.Utility.addDays(new Date(endDate), 1),
            distance: distance,
            type: type
          };
      searchTerms = [location, distance, startDateS, endDateS, $('.search-type :selected').val()].join('+');
      DanceCard.router.navigate('#search?' + searchTerms);
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
        navigator.geolocation.getCurrentPosition(_.bind(this.userLocSearchResults, this));
      }
    },

    userLocSearchResults: function(position) {
      $('.map-loading').remove();
      var lat = position.coords.latitude,
          lng = position.coords.longitude,
          point = new Parse.GeoPoint(lat, lng),
          collection,
          searchTerms;
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
