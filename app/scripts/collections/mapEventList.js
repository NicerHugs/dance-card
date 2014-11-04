(function() {
  'use strict';

  DanceCard.Collections.MapEventList = Parse.Collection.extend({
    initialize: function(options){
      this.query = new Parse.Query('Event')
        .greaterThanOrEqualTo('startDate', options.startDate)
        .lessThanOrEqualTo('endDate', options.endDate)
        .withinMiles('point', options.location, options.distance);
    },
    model: DanceCard.Models.Event,
  });

})();
