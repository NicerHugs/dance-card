(function() {
  'use strict';

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    className: 'index',
    template: DanceCard.templates.index,
    render: function() {
      this.$el.html(this.template());
      new DanceCard.Forms.Cal('index-start', 'Start date');
      new DanceCard.Forms.Cal('index-end', 'End date');
    },
    events: {
      'click .search-submit' : 'searchResults',
    },

    searchResults: function(e) {
      e.preventDefault();
      var startDate,
          endDate;
      if ($('.start-date-input').val() !== '  Start date') {
        startDate = moment($('.start-date-input').val()).format();
      } else {
        startDate = new Date();
      }
       if ($('.end-date-input').val() !== '  End date') {
        endDate = moment($('.end-date-input').val()).format();
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
      DanceCard.router.navigate('#/search?' + searchTerms, {trigger: true});
    }

  });

})();
