(function() {
  'use strict';

  DanceCard.Collections.SearchEventList = Parse.Collection.extend({
    initialize: function(options){
      this.query = new Parse.Query('Event')
        .ascending('startDate')
        .greaterThanOrEqualTo('startDate', options.startDate)
        .lessThanOrEqualTo('endDate', options.endDate)
        .withinMiles('point', options.location, options.distance);
        if (options.type !== "all") {
          this.query.equalTo('type', options.type);
        }
    },
    model: DanceCard.Models.Event,
  });

})();
