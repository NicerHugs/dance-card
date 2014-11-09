(function(){
  'use strict';

  DanceCard.Collections.Attending = Parse.Collection.extend({
    initialize: function(options){
      this.dancer = options.dancer;
      var relation = this.dancer.relation('attending');
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1);
      var query = new Parse.Query('Event')
        .ascending('startDate')
        .equalTo('orgUrlId', this.orgUrlId)
        .equalTo('recurring', false)
        .greaterThan('startDate', yesterday)
        .limit(10);
      this.query = relation.query();
    },
    model: DanceCard.Models.Event,

  });

})();
