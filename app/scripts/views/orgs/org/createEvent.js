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
      'click .pre-reg-req-input'   : 'regReq',
      'click .multi-day-input'     : 'multiDay'
    },

    multiDay: function() {
      if (this.model.get('multiDay')) {
        this.model.set('multiDay', false);
        $('.multi-day').html('');
      } else {
        this.model.set('multiDay', true);
        $('.multi-day').html(DanceCard.templates.orgs.org._multiDay);
      }
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
        this.model.set('multiDay', false);
        this.$el.html(DanceCard.templates.orgs.org.createEvent(this.model.toJSON()));
      } else {
        this.model.set('recurring', true);
        this.model.set('multiDay', false);
        this.$el.html(DanceCard.templates.orgs.org.chooseWkMo);
      }
    },

    chooseWkMo: function(e) {
      e.preventDefault();
      if ($(e.target).val() === 'weekly') {
        this.model.set('recurMonthly', false);
        this.$el.append('On');
        this.$el.append(DanceCard.templates.orgs.org.chooseWkRpt);
      } else {
        this.model.set('recurMonthly', true);
        this.$el.append('On');
        this.$el.append(DanceCard.templates.orgs.org.chooseMoRpt);
        this.$el.append(DanceCard.templates.orgs.org.chooseWkRpt);
      }
    },

    chooseRpt: function(e) {
      e.preventDefault();
      var weeklyRpt = $('.weekly-option-input').val();
      var weeklyRptName = $('.weekly-option-input option:selected').text();
      var monthlyRpt = $('.monthly-option-input').val() || null;
      this.model.set({weeklyRpt: weeklyRpt, weeklyRptName: weeklyRptName});
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
          $('.submit-event').removeAttr('disabled');
          var lat = results[0].geometry.location.k;
          var lng = results[0].geometry.location.B;
          var point = new Parse.GeoPoint({latitude: lat, longitude: lng});
          self.model.set('point', point);
          self.model.set('venue', {
            addressParts: results[0].address_components,
            fullAddress: results[0].formatted_address,
          });
        }
      });
    },

    createEvent: function(e) {
      e.preventDefault();
      if (this.model.get('recurring')){
        this.createRecurringEvent();
      } else {
        this.createOnetimeEvent();
      }
    },

    createRecurringEvent: function() {
      var name = $('.event-name-input').val(),
          type = $('.event-type-input').val().split('-').join(' '),
          startTime = $('.event-start-time-input').val(),
          endTime = $('.event-end-time-input').val(),
          venueName = $('.venue-name-input').val(),
          price = $('.price-input').val(),
          beginner = $('.beginner').prop('checked'),
          workshopIncl = $('.workshop-incl').prop('checked'),
          notes = $('.notes-input').val(),
          idName = name.replace(/[^\w\d\s]/g, ''),
          id = idName.split(' ').join('_') + '_recurring_' + this.model.get('weeklyRpt'),
          startDate = this.model.setRecurStartDate(),
          dates;
      this.model.set({
        urlId: id,
        name: name,
        type: type,
        startTime: startTime,
        endTime: endTime,
        price: price,
        beginnerFrdly: beginner,
        workshopIncl: workshopIncl,
        notes: notes,
        startDate: startDate
      });
      dates = DanceCard.Utility.buildWeeklyDateArray(startDate);
      if (this.model.get('recurMonthly')) {
        dates = DanceCard.Utility.filterByWeekOfMonth(dates, this.model.get('monthlyRpt'));
      }
      this.model.set('endDate', dates[dates.length-1]);
      // this.model.save();
      // this.model.buildChildren();
      // this.buildRecurringEventChildren(this.model, dates);
      // DanceCard.router.navigate("#/orgs/" + this.model.get('orgUrlId'), {trigger: true});
      console.log(dates, dates.length);
    },

    buildRecurringEventChildren: function(model, arrayOfDates){
      _.each(arrayOfDates, function(date) {
        var newEvent = new DanceCard.Models.Event(model);
        var idName = model.get('name').replace(/[^\w\d\s]/g, '');
        var dateString = date.toDateString().split(' ').join('_');
        var id = idName.split(' ').join('_') + '_' + dateString;
        newEvent.set({
          startDate: date,
          endDate: date,
          recurring: false,
          parentEvent: model,
          parentEventUrlId: model.get('urlId'),
          urlId: id
        });
        newEvent.save();
      });
    },

    createOnetimeEvent: function() {
      var name = $('.event-name-input').val();
      var type = $('.event-type-input').val().split('-').join(' ');
      var startDate,
          endDate,
          regLimit,
          genderBal;
      startDate = new Date($('.event-start-date-input').val());
      var dateString = startDate.toDateString().split(' ').join('_');
      var startTime = $('.event-start-time-input').val();
      var endTime = $('.event-end-time-input').val();
      if (this.model.get('multiDay')) {
        endDate = new Date($('.event-end-date-input').val());
      } else {
        endDate = startDate;
      }
      var venueName = $('.venue-name-input').val();
      var bandName = $('.band-name-input').val();
      var musicians = $('.musicians-input').val();
      var caller = $('.caller-input').val();
      var price = $('.price-input').val();
      var beginner = $('.beginner').prop('checked');
      var workshopIncl = $('.workshop-incl').prop('checked');
      var preRegReq = $('.pre-reg-req-input').prop('checked');
      if (preRegReq) {
        regLimit = $('.reg-limit-input').val();
        genderBal = $('.gender-bal-input').prop('checked');
      }
      var notes = $('.notes-input').val();
      var idName = name.replace(/[^\w\d\s]/g, '');
      var id = idName.split(' ').join('_') + '_' + dateString;
      this.model.set({
        urlId: id,
        name: name,
        type: type,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        bandName: bandName,
        musicians: musicians,
        caller: caller,
        price: price,
        beginnerFrdly: beginner,
        workshopIncl: workshopIncl,
        preRegReq: preRegReq,
        notes: notes
      });
      this.model.set('venue', {
        name: venueName,
        addressParts: this.model.attributes.venue.addressParts,
        fullAddress: this.model.attributes.venue.fullAddress
      });
      if (preRegReq) {
        this.model.set('regInfo', {
          regLimit: regLimit,
          genderBal: genderBal
        });
      }
      this.model.save();
      DanceCard.router.navigate("#/orgs/" + this.model.get('orgUrlId'), {trigger: true});
    }
  });

})();
