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
      var self = this;
      var name = $('.event-name-input').val();
      var type = $('.event-type-input').val().split('-').join(' ');
      var startTime = $('.event-start-time-input').val();
      var endTime = $('.event-end-time-input').val();
      var venueName = $('.venue-name-input').val();
      var price = $('.price-input').val();
      var beginner = $('.beginner').prop('checked');
      var workshopIncl = $('.workshop-incl').prop('checked');
      var notes = $('.notes-input').val();
      var idName = name.replace(/[^\w\d\s]/g, '');
      var id = idName.split(' ').join('_') + '_recurring_' + this.model.get('weeklyRpt');
      this.model.set({
        urlId: id,
        name: name,
        type: type,
        startTime: startTime,
        endTime: endTime,
        price: price,
        beginnerFrdly: beginner,
        workshopIncl: workshopIncl,
        notes: notes
      });
      this.model.set('venue', {
        name: venueName,
        addressParts: this.model.attributes.venue.addressParts,
        fullAddress: this.model.attributes.venue.fullAddress
      });
      this.model.save();
      this.setStartDate(this.model)
      .done(function(model, startDate) {
        model.set('startDate', startDate);
        self.buildRecurringEvents(model);
        DanceCard.router.navigate("#/orgs/" + self.model.get('orgUrlId'), {trigger: true});
      });
    },

    buildRecurringEvents: function(model){
      var date = model.get('startDate');
      var firstDate = new Date(model.get('startDate'));
      var arrayOfDates = [firstDate];
      _.times(51, function(n) {
        arrayOfDates.push(date.setDate(date.getDate() + 7));
      });
      arrayOfDates = _.map(arrayOfDates, function(date){
        return new Date(date);
      });
      if (model.get('recurMonthly')) {
        var week = model.get('monthlyRpt');
        if (week === 'first') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            if (date.getDate() <= 7 && date.getDay() + date.getDate() <= 13) {
              return date;
            }
          });
        } else if (week === 'second') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            if (date.getDate() >= 8 && date.getDate() <= 14 && date.getDay() + date.getDate() <= 20) {
              return date;
            }
          });
        } else if (week === 'third') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            if (date.getDate() >= 15 && date.getDate() <= 21 && date.getDay() + date.getDate() <= 27) {
              return date;
            }
          });
        } else if (week === 'fourth') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            if (date.getDate() >= 22 && date.getDate() <= 28 && date.getDay() + date.getDate() <= 34) {
              return date;
            }
          });
        } else if (week === 'last') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            var month = date.getMonth();
            date.setDate(date.getDate() + 7);
            if (month !== date.getMonth()) {
              return true;
            }
          });
        }
      }
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

    setStartDate: function(recurEventModel) {
      var deferred = new $.Deferred();
      var startDate = new Date(),
          recurDay = +recurEventModel.get('weeklyRpt'),
          diff;
      if (startDate.getDay() === recurDay) {
        deferred.resolve(recurEventModel, startDate);
      } else {
        if (recurDay - startDate.getDay() > 0) {
          diff = recurDay - startDate.getDay();
          startDate.setDate(startDate.getDate() + diff);
          deferred.resolve(recurEventModel, startDate);
        } else {
          diff = 7 + (recurDay - startDate.getDay());
          startDate.setDate(startDate.getDate() + diff);
          deferred.resolve(recurEventModel, startDate);
        }
      }
      return deferred.promise();
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
