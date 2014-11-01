(function() {
	'use strict';

	DanceCard.Collections.currentEvent = Parse.Collection.extend({
		initialize: function(options){
			this.urlId = options.urlId;
			this.query = new Parse.Query('Event')
				.equalTo('urlId', this.urlId)
		},
		model: DanceCard.Models.Event,
	});

})();
