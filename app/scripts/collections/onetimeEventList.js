(function() {
  'use strict';

  DanceCard.Collections.OnetimeEventList = Parse.Collection.extend({
    initialize: function(options){
      this.orgUrlId = options.urlId;
      this.query = new Parse.Query('Event')
        .equalTo('orgUrlId', this.orgUrlId)
        .doesNotExist('weeklyRpt')
        .limit(10);
    },
      model: DanceCard.Models.Event,
  });

})();
