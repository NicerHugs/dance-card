(function() {
  'use strict';

  DanceCard.Collections.OnetimeEventList = Parse.Collection.extend({
    initialize: function(options){
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1);
      this.orgUrlId = options.orgUrlId;
      this.parentEvent = options.parentEvent || undefined;
      this.limit = options.limit || 10;
      this.query = new Parse.Query('Event')
        .ascending('startDate')
        .equalTo('orgUrlId', this.orgUrlId)
        .equalTo('recurring', false)
        .equalTo('parentEventUrlId', this.parentEvent)
        .greaterThanOrEqualTo('startDate', yesterday)
        .limit(this.limit);
    },
      model: DanceCard.Models.Event,
  });

})();
