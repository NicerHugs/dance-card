(function() {

  DanceCard.Views.CreateEvent = DanceCard.Views.Base.extend({
    tagName: 'div',
    className: 'new-event',
    template: DanceCard.templates.orgs.org.newEvent,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },
    events: {
      'click .chooseNoRpt'           : 'noRpt',
      'click .chooseRpt'             : 'rpt',
      'change .weekly-option-input'  : 'setWk',
      'change .monthly-option-input' : 'setMo',
      'keyup .event-address-input'   : 'getLocation',
      'click .submit-event'          : 'createEvent',
      'click .pre-reg-req-input'     : 'regReq',
      'click .multi-day-input'       : 'multiDay'
    },

    setMo: function() {
      this.model.set('monthlyRpt', $('.monthly-option-input :selected').val());
    },

    setWk: function() {
      this.model.set('weeklyRpt', $('.weekly-option-input :selected').val());
      this.model.set('weeklyRptName', $('.weekly-option-input :selected').text());
    },

    rpt: function() {
      this.model.set('recurring', true);
      $('.event-form').html(DanceCard.templates.orgs.org._recurringForm(this.model.toJSON()));
      $('.choose-dates').html(DanceCard.templates.orgs.org.chooseWkMo(this.model.toJSON()));
      if (this.startCal) {
        $('.date-selector').remove();
      }
      if ($('.chooseRpt:checked').val() === "true") {
        this.model.set('recurMonthly', true);
        this.model.set('weeklyRpt', 1);
        this.model.set('weeklyRptName', "Monday");
        $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.model.toJSON()));
      } else {
        this.model.set('recurMonthly', false);
        this.model.set('monthlyRpt', 'first');
        $('.choose-monthly-rpt').html('');
      }
    },

    noRpt: function(e) {
      this.model.set('recurring', false);
      this.model.set('recurMonthly', undefined);
      this.model.set('weeklyRpt', undefined);
      this.model.set('monthlyRpt', undefined);
      this.model.set('weeklyRptName', undefined);
      $('.choose-dates').html(DanceCard.templates.orgs.org.chooseDate(this.model.toJSON()));
      $('.event-form').html(DanceCard.templates.orgs.org._onetimeForm(this.model.toJSON()));
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

    getLocation: function(e) {
      var self = this,
          address = $('.event-address-input').val();
      DanceCard.Utility.findLocation(address)
      .done(function(location) {
        var attrs = { name: name,
                      fullAddress: location.location.fullAddress,
                      addressParts: location.location.addressParts
                    },
            point = location.point;

        self.model.set({venue: attrs, point: point});
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

    validateEvent: function() {
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      if (!this.model.get('name')) {
        $('label[name="name"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('event name required');
        $('.event-name-input').addClass('invalid').focus();
        return false;
      } else if (!this.model.get('recurring') && !this.model.get('startDate')) {
        $('label[name="start-date"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('start date is required');
        $('.event-start-date-input').addClass('invalid').focus();
        return false;
      } else if (this.model.get('startDate') < new Date()){
        $('label[name="start-date"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('start date must be after today');
        $('.event-start-date-input').addClass('invalid').focus();
        return false;
      } else if (!this.model.get('startTime')) {
        $('label[name="start-time"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('start time is required');
        $('.event-start-time-input').addClass('invalid').focus();
        return false;
      } else if (!this.model.get('endTime')) {
        $('label[name="end-time"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('end time is required');
        $('.event-end-time-input').addClass('invalid').focus();
        return false;
      } else if (!this.model.get('venue')) {
        $('label[name="address"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('venue address is required');
        $('.event-address-input').addClass('invalid').focus();
        return false;
      } else {
        return true;
      }
    },

    createRecurringEvent: function() {
      var self = this,
          name = $('.event-name-input').val(),
          type = $('.event-type-input').val().split('-').join(' '),
          startTime = $('.event-start-time-input').val(),
          endTime = $('.event-end-time-input').val(),
          venueName = $('.venue-name-input').val(),
          price = $('.price-input').val(),
          beginner = $('.beginner').prop('checked'),
          workshopIncl = $('.workshop-incl').prop('checked'),
          notes = $('.notes-input').val(),
          day = this.model.get('weeklyRpt'),
          startDate = DanceCard.Utility.nextDateOfWeek(new Date(), day),
          endDate = DanceCard.Utility.addYear(startDate);
      this.model.set({
        name: name,
        type: type,
        startTime: startTime,
        endTime: endTime,
        price: price,
        beginnerFrdly: beginner,
        workshopIncl: workshopIncl,
        notes: notes,
        startDate: startDate,
        endDate: endDate
      });
      if ($('.event-address-input').val()) {
        this.model.set('venue', {
          name: venueName,
          addressParts: this.model.attributes.venue.addressParts,
          fullAddress: this.model.attributes.venue.fullAddress,
          zipcode: this.model.attributes.venue.zipcode
        });
      }
      if (this.validateEvent()) {
        this.model.save(null, {
          success: function() {
            self.model.createChildren(self.model);
            self.remove();
            DanceCard.router.navigate("#/orgs/" + self.model.get('orgUrlId'), {trigger: true});
          },
          error: function() {
            console.log('error saving the event', arguments[1]);
          }
        });
      }
    },

    createOnetimeEvent: function() {
      var self= this,
          name = $('.event-name-input').val(),
          type = $('.event-type-input').val().split('-').join(' '),
          startDate,
          startTime = $('.event-start-time-input').val(),
          endTime = $('.event-end-time-input').val(),
          venueName = $('.venue-name-input').val(),
          bandName = $('.band-name-input').val(),
          musicians = $('.musicians-input').val(),
          caller = $('.caller-input').val(),
          price = $('.price-input').val(),
          beginner = $('.beginner').prop('checked'),
          workshopIncl = $('.workshop-incl').prop('checked'),
          preRegReq = $('.pre-reg-req-input').prop('checked'),
          notes = $('.notes-input').val(),
          endDate,
          regLimit,
          genderBal;
      if ($('.event-start-date-input').val()) {
        startDate = new Date(moment($('.event-start-date-input').val()).format());
      }
      if (this.model.get('multiDay')) {
        endDate = new Date(moment($('.event-end-date-input').val()).format());
      } else {
        endDate = new Date(moment(startDate).format());
      }
      if (preRegReq) {
        regLimit = $('.reg-limit-input').val();
        genderBal = $('.gender-bal-input').prop('checked');
      }
      this.model.set({
        name: name,
        type: type,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        band: bandName,
        musicians: musicians,
        caller: caller,
        price: price,
        beginnerFrdly: beginner,
        workshopIncl: workshopIncl,
        preRegReq: preRegReq,
        notes: notes
      });
      if ($('.event-address-input').val()) {
        this.model.set('venue', {
          name: venueName,
          addressParts: this.model.attributes.venue.addressParts,
          fullAddress: this.model.attributes.venue.fullAddress,
          zipcode: this.model.attributes.venue.zipcode
        });
      }
      if (preRegReq) {
        this.model.set('regInfo', {
          regLimit: regLimit,
          genderBal: genderBal
        });
      }
      if (this.validateEvent()) {
        this.model.save(null, {
          success: function() {
            self.remove();
            DanceCard.router.navigate("#/orgs/" + self.model.get('orgUrlId'), {trigger: true});
          },
          error: function() {
            console.log('error saving the event', arguments[1]);
          }
        });
      }
    }
  });

})();
