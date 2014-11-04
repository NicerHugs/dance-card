(function() {
  'use strict';

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    className: 'index',
    template: DanceCard.templates.index,
    render: function() {
      var self = this;
      this.$el.html(this.template());
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude,
            point = new Parse.GeoPoint(lat, lng),
            collection = new DanceCard.Collections.MapEventList({
              startDate: new Date(),
              endDate: DanceCard.Utility.addDays(new Date(), 7),
              location: point,
              distance: 50
            });
        self.map = new DanceCard.Views.MapPartial({
          $container: self.$el,
          zoom: 9,
          loc: {lat: lat, lng: lng},
          collection: collection
        });
      });
    }
  });

  DanceCard.locDateSearchQuery = function(distance, time){
    distance = distance || 25;
    time = time || 7;
    var dateLimit = addDays(new Date(), time);
    var deferred = new $.Deferred();
    var query = new Parse.Query(DanceCard.Models.Event);
    query.greaterThanOrEqualTo('startDate', new Date());
    query.lessThanOrEqualTo('startDate', dateLimit);
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var userLocation = new Parse.GeoPoint({latitude: lat, longitude: lng});
      query.withinMiles('point', userLocation, distance);
      var collection = query.collection();
      collection.fetch()
      .then(function() {
        deferred.resolve(collection);
      });
    });
    return deferred.promise();
  };

})();
