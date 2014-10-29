(function() {

  DanceCard.Views.CreateEvent = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'new-event-form',
    template: DanceCard.templates.orgs.org.createEvent,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit'                     : 'createEvent',
      'keyup .event-zipcode-input' : 'getLocation'
    },
    getLocation: function() {
      var self = this;
      var address = $('.event-address-input').val();
      var zipcode = $('.event-zipcode-input').val();
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address + ',' + zipcode}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK && address && zipcode.length === 5) {
          $('input[type=submit]').removeAttr('disabled');
          var lat = results[0].geometry.location.k;
          var lng = results[0].geometry.location.B;
          var point = new Parse.GeoPoint({latitude: lat, longitude: lng});
          self.model.set({
            addressParts: results[0].address_components,
            fullAddress: results[0].formatted_address,
            point: point
          });
        }
      });
    },
    createEvent: function(e) {
      e.preventDefault();
      var startDate = new Date($('.event-start-date-input').val());
      var startTime = $('.event-start-time-input').val();
      this.model.set({
        startDate: startDate,
        startTime: startTime
      });
      this.model.save();
    }
  });

})();
