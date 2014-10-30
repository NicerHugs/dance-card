(function() {

  DanceCard.Views.CreateEvent = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'new-event-form',
    template: DanceCard.templates.orgs.org.chooseRecur,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'click .choose-recur'        : 'chooseRecur',
      'click .choose-wk-mo'        : 'chooseWkMo',
      'click .choose-rpt'          : 'chooseRpt',
      'keyup .event-zipcode-input' : 'getLocation',
      'click .submit-event'        : 'createEvent',
      'click .pre-reg-req-input'   : 'regReq'
    },
    regReq: function() {
      if (this.model.get('regReq')) {
        this.model.set('regReq', false);
        $('.reg-req').html('');
      } else {
        this.model.set('regReq', true);
        $('.reg-req').html(DanceCard.templates.orgs.org._regReq);
      }
    },
    chooseRecur: function(e) {
      e.preventDefault();
      if ($(e.target).val() === 'onetime') {
        this.model.set('recurring', false);
        this.$el.html(DanceCard.templates.orgs.org.createEvent(this.model.toJSON()));
      } else {
        this.model.set('recurring', true);
        this.$el.html(DanceCard.templates.orgs.org.chooseWkMo);
      }
    },
    chooseWkMo: function(e) {
      e.preventDefault();
      if ($(e.target).val() === 'weekly') {
        this.model.set('recurMonthly', false);
        this.$el.append(DanceCard.templates.orgs.org.chooseWkRpt);
      } else {
        this.model.set('recurMonthly', true);
        this.$el.append(DanceCard.templates.orgs.org.chooseMoRpt);
        this.$el.append(DanceCard.templates.orgs.org.chooseWkRpt);
      }
    },
    chooseRpt: function(e) {
      e.preventDefault();
      var weeklyRpt = $('.weekly-option-input').val();
      var monthlyRpt = $('.monthly-option-input').val() || null;
      this.model.set('weeklyRpt', weeklyRpt);
      if (monthlyRpt) {
        this.model.set('monthlyRpt', monthlyRpt);
      }
      this.$el.html(DanceCard.templates.orgs.org.createEvent(this.model.toJSON()));
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
      var name = $('.event-name-input').val();
      var startDate = new Date($('.event-start-date-input').val());
      var startTime = $('.event-start-time-input').val();
      var dateString = startDate.toDateString().split(' ').join('_');
      var idName = name.replace(/[^\w\d\s]/g, '');
      var id = idName.split(' ').join('_') + '_' + dateString;
      console.log(id);
      this.model.set({
        urlId: id,
        name: name,
        startDate: startDate,
        startTime: startTime
      });
      console.log(this.model);
      this.model.save();
    }
  });

})();
