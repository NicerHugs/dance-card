(function(){
  'use strict';

  DanceCard.Views.Event = DanceCard.Views.Base.extend({
    className: 'event',
    template: DanceCard.templates.orgs.org.event,
    render: function() {
      var loggedIn = (this.model.get('orgUrlId') === DanceCard.session.get('user').urlId);
      this.templateData = {
                          edit: {},
                          event: this.model.toJSON(),
                          loggedIn: loggedIn,
                          eventOrg: DanceCard.session.get('user')
                          };
      this.$el.html(this.template(this.templateData)
      );
      if (loggedIn) {
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.templateData));
        if (this.model.get('recurring')) {
          $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.templateData));
        }
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.templateData));
        if (this.model.get('recurMonthly')) {
          $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.model.templateData));
        }
      }
    },

    events: {
      'click .edit-event-header' : 'editEventHeader',
      'click .edit-event-recur'  : 'editEventRecur',
      'click .edit-event-info'   : 'editEventInfo',
      'click .edit-venue-info'   : 'editVenueInfo',
      'click .save-event-header' : 'saveEventHeader',
      'click .save-event-recur'  : 'saveEventRecur',
      'click .save-event-info'   : 'saveEventInfo',
      'click .save-venue-info'   : 'saveVenueInfo',
      'click .multi-day-input'   : 'multiDay',
      'click .chooseRpt'         : 'chooseRpt',
      'click .delete-event'      : 'deleteEvent'
    },

    deleteEvent: function(e) {
      e.preventDefault();
      var self = this;
      this.model.destroy({
        success: function() {
          DanceCard.router.navigate('#/orgs/' + self.model.get('urlId'));
          self.remove();
        },
        fail: function() {
          console.log('failed to destroy the event');
        }
      });
    },
    editEventHeader: function(e) {
      e.preventDefault();
      if (this.templateData.edit.eventHeader) {
        this.templateData.edit.eventHeader = false;
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.templateData));
      } else {
        this.templateData.edit.eventHeader = true;
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.templateData));
        if (this.model.get('multiDay')) {
          $('.multi-day').html(DanceCard.templates.orgs.org._multiDay(this.templateData));
        }
      }
    },
    editEventRecur: function(e) {
      e.preventDefault();
      if (this.templateData.edit.eventRecur) {
        this.templateData.edit.eventRecur = false;
        $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.templateData));
      } else {
        this.templateData.edit.eventRecur = true;
        $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.templateData));
        if (this.model.get('recurMonthly')) {
          $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.templateData));
        }
      }
    },
    editEventInfo: function(e) {
      e.preventDefault();
      if (this.templateData.edit.eventInfo) {
        this.templateData.edit.eventInfo = false;
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
      } else {
        this.templateData.edit.eventInfo = true;
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
      }
    },
    editVenueInfo: function(e) {
      e.preventDefault();
      if (this.templateData.edit.venueInfo) {
        this.templateData.edit.venueInfo = false;
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.templateData));
      } else {
        this.templateData.edit.venueInfo = true;
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.templateData));
      }
    },

    saveEventHeader: function(e) {
      e.preventDefault();
      var self = this,
          attrs = {
                    name: $('.event-name-input').val(),
                    type: $('.event-type-input').val().split('-').join(' '),
                    startTime: $('.event-start-time-input').val(),
                    endTime: $('.event-end-time-input').val()
                  },
          dateAttrs = {},
          orgUrlId = this.model.get('orgUrlId');
      if ($('.event-start-date-input').val()) {
        dateAttrs.startDate = new Date(moment($('.event-start-date-input').val()).format());
      }
      if ($('.multi-day-input').prop('checked')) {
        dateAttrs.endDate = new Date(moment($('.event-end-date-input').val()).format());
        dateAttrs.multiDay = $('.multi-day-input').prop('checked');
      } else {
        dateAttrs.endDate = dateAttrs.startDate;
      }
      this.model.saveHeader(orgUrlId, 1000, attrs, dateAttrs)
      .then(function(model) {
        self.model = model;
        self.templateData.event = self.model.toJSON();
        self.templateData.edit.eventHeader = false;
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(self.templateData));
      });
    },

    saveEventRecur: function(e) {
      e.preventDefault();
      var self = this,
          attrs = {
                      weeklyRpt: $('.weekly-option-input').val(),
                      weeklyRptName: $('.weekly-option-input :selected').text(),
                      monthlyRpt: $('.monthly-option-input').val()
                    },
          orgUrlId = this.model.get('orgUrlId');
      if ($('.chooseRpt:checked').val() === "true") {
        attrs.recurMonthly = true;
      } else {
        attrs.recurMonthly = false;
      }
      this.model.saveRecur(orgUrlId, 1000, attrs)
      .then(function(model) {
        self.model = model;
        self.templateData.event = self.model.toJSON();
        self.templateData.edit.eventRecur = false;
        $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(self.templateData));
      });
    },

    saveEventInfo: function(e) {
      e.preventDefault();
      var self = this,
          orgUrlId = this.model.get('orgUrlId'),
          attrs = {
            price: $('.price-input').val(),
            band: $('.band-name-input').val() || 'TBA',
            musicians: $('.musicians-input').val(),
            caller: $('.caller-input').val() || 'TBA',
            beginnerFrdly: $('.beginner').prop('checked'),
            workshopIncl: $('.workshop-incl').prop('checked'),
            notes: $('.notes-input').val()
          };
      this.model.saveInfo(orgUrlId, 1000, attrs)
      .then(function(model) {
        self.model = model;
        self.templateData.event = self.model.toJSON();
        self.templateData.edit.eventInfo = false;
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(self.templateData));
      });
    },

    saveVenueInfo: function(e) {
      e.preventDefault();
      var self = this,
          orgUrlId = this.model.get('orgUrlId'),
          zipcode = $('.event-zipcode-input').val(),
          address = $('.event-address-input').val(),
          name = $('.venue-name-input').val();
      DanceCard.Utility.findLocation(address, zipcode)
      .done(function(location) {
        var attrs = {
                      name: name,
                      fullAddress: location.location.fullAddress,
                      addressParts: location.location.addressParts
                    },
            point = location.point;
        self.model.saveVenue(orgUrlId, 1000, attrs, point)
        .then(function(model) {
          self.model= model;
          self.templateData.event = self.model.toJSON();
          self.templateData.edit.venueInfo = false;
          $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(self.templateData));
        });
      });
    },

    multiDay: function() {
      if (this.model.get('multiDay')) {
        this.model.set('multiDay', false);
        this.templateData.event = this.model.toJSON();
        $('.multi-day').html('');
      } else {
        this.model.set('multiDay', true);
        this.templateData.event = this.model.toJSON();
        $('.multi-day').html(DanceCard.templates.orgs.org._multiDay(this.templateData));
      }
    },

    chooseRpt: function() {
      if ($('.chooseRpt:checked').val() === "true") {
        $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.templateData));
      } else {
        $('.choose-monthly-rpt').html('');
      }
    }
  });

})();
