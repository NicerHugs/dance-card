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
      var self = this,
          location = $('.search-location').val() || undefined,
          distance = $('.search-distance').val() || 50,
          type = $('.search-type :selected').val().split('-').join(' '),
          collection,
          searchTerms,
          startDate,
          endDate,
          startDateS,
          endDateS;
      if ($('.search-start-date').val()) {
        startDate = moment($('.search-start-date').val()).format();
      } else {
        startDate = new Date();
      } if ($('.search-end-date').val()) {
        endDate = moment($('.search-end-date').val()).format();
      } else {
        endDate = DanceCard.Utility.addDays(new Date(), 7);
      }
      startDateS = startDate.toString().split(' ').join('-');
      endDateS = endDate.toString().split(' ').join('-');
      this.attrs = {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            distance: distance,
            type: type
          };
      searchTerms = [location, distance, startDateS, endDateS, $('.search-type :selected').val()].join('+');
      // window.location.hash = '/search?' + searchTerms;
      DanceCard.router.navigate('#/search?' + searchTerms);
      if (location) {
        DanceCard.Utility.findLocation(location)
        .done(function(location) {
          self.attrs.location = location.point;
          collection = new DanceCard.Collections.SearchEventList(self.attrs);
          self.removeChildren();
          self.makeList(collection, location);
          self.makeMap(collection, location.point);
        });
      } else {
        $('#map-canvas').remove();
        this.$el.prepend('<div class="map-loading"><img class="spinner" src="../images/spinner.gif"/></div>');
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
        $container: $('.search-right'),
        collection: collection,
        searchResults: this.attrs,
        location: loc
      }));
    }
  });

})();
