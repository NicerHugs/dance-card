(function() {
  'use strict';

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    className: 'index',
    template: DanceCard.templates.index,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'click .search-submit' : 'searchResults',
    },

    searchResults: function(e) {
      e.preventDefault();
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
          searchTerms = [location, distance, startDateS, endDateS, type].join('+'),
          collection;
      this.attrs = {
            startDate: new Date(startDate),
            endDate: DanceCard.Utility.addDays(new Date(endDate), 1),
            distance: distance,
            type: type};
      DanceCard.router.navigate('search?' + searchTerms, {trigger: true});
    }

  });

})();
