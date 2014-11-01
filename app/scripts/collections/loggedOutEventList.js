(function() {
	'use strict';

	DanceCard.Collections.LoggedOutEventList = Parse.Collection.extend({
		initialize: function(options){
			this.orgUrlId = options.urlId;
			var yesterday = new Date();
			yesterday.setDate(yesterday.getDate()-1);
			this.query = new Parse.Query('Event')
				.equalTo('orgUrlId', this.orgUrlId)
				.greaterThan('startDate', yesterday)
				.notEqualTo('recurring', true)
				.ascending('startDate')
				.limit(10);
		},
		model: DanceCard.Models.Event,
	});
	
})();
