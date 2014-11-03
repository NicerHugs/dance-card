(function(){
  'use strict';

  DanceCard.Views.Event = DanceCard.Views.Base.extend({
    className: 'event',
    template: DanceCard.templates.orgs.org.event,
    render: function() {
      console.log(this.model);
      this.$el.html(this.template(this.model));
      if (this.model.loggedIn) {
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.model));
        if (this.model.event.recurring) {
          $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.model));
        }
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.model));
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.model));
        if (this.model.event.recurMonthly) {
          $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.model));
        }
      }
    },
    formatDatesforForm: function(model) {
      var startDate = model.event.startDate.iso;
      startDate = moment(startDate).format('YYYY-MM-DD');
      var endDate = model.event.endDate.iso;
      endDate = moment(endDate).format('YYYY-MM-DD');
      model.event.startDate.form = startDate;
      model.event.endDate.form = endDate;
      return model;
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
      'click .chooseRpt'         : 'chooseRpt'
    },
    editEventHeader: function(e) {
      e.preventDefault();
      var formModel = this.formatDatesforForm(this.model);
      if (this.model.edit.eventHeader) {
        this.model.edit.eventHeader = false;
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.model));
      } else {
        this.model.edit.eventHeader = true;
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(formModel));
      }
    },
    editEventRecur: function(e) {
      e.preventDefault();
      var formModel = this.formatDatesforForm(this.model);
      if (this.model.edit.eventRecur) {
        this.model.edit.eventRecur = false;
        $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.model));
      } else {
        this.model.edit.eventRecur = true;
        $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(formModel));
        if (this.model.event.recurMonthly) {
          $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.model));
        }
      }
    },
    editEventInfo: function(e) {
      e.preventDefault();
      if (this.model.edit.eventInfo) {
        this.model.edit.eventInfo = false;
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.model));
      } else {
        this.model.edit.eventInfo = true;
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.model));
      }
    },
    editVenueInfo: function(e) {
      e.preventDefault();
      if (this.model.edit.venueInfo) {
        this.model.edit.venueInfo = false;
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.model));
      } else {
        this.model.edit.venueInfo = true;
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.model));
      }
    },

    saveEventHeader: function(e) {
      e.preventDefault();
      var self = this,
          id = this.model.event.objectId,
          attrs = {
                    name: $('.event-name-input').val(),
                    type: $('.event-type-input').val(),
                    startTime: $('.event-start-time-input').val(),
                    endTime: $('.event-end-time-input').val()
                  },
          dateAttrs = {},
          model = new Parse.Query('Event'),
          orgUrlId = this.model.eventOrg.urlId,
          parentEvent = this.model.event.urlId;
      if ($('.event-start-date-input').val()) {
        dateAttrs.startDate = new Date($('.event-start-date-input').val());
      }
      if ($('.event-end-date-input').val()) {
        dateAttrs.endDate = new Date($('.event-end-date-input').val());
        dateAttrs.multiDay = $('.multi-day-input').prop('checked');
      }
      model.get(id, {
        success: function(event) {
          event.saveHeader(orgUrlId, parentEvent, 1000, attrs, dateAttrs)
          .then(function(event) {
            self.model.event = event.toJSON();
            self.model.edit.eventHeader = false;
            $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(self.model));
          });
        },
        error: function() {
          console.log('an error occured');
        }
      });
    },

    saveEventRecur: function(e) {
      e.preventDefault();
      var self = this,
          recurMonthly,
          attrs = {
                      weeklyRpt: $('.weekly-option-input').val(),
                      weeklyRptName: $('.weekly-option-input :selected').text(),
                      monthlyRpt: $('.monthly-option-input').val(),
                    },
          model = new Parse.Query('Event'),
          orgUrlId = this.model.eventOrg.urlId,
          parentEvent = this.model.event.urlId;
      if ($('.chooseRpt:checked').val() === "true") {
        recurMonthly = true;
      } else {
        recurMonthly = false;
      }
      attrs.recurMonthly = recurMonthly;
      model.get(this.model.event.objectId, {
        success: function(event) {
          event.saveRecur(orgUrlId, parentEvent, 1000, attrs)
          .then(function(event) {
            self.model.event = event.toJSON();
            self.model.edit.eventRecur = false;
            $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(self.model));
          });
        },
        error: function() {
          console.log('an error occured');
        }
      });
    },

    saveEventInfo: function(e) {
      e.preventDefault();
      var self = this,
          model = new Parse.Query('Event'),
          orgUrlId = this.model.eventOrg.urlId,
          parentEvent = this.model.event.urlId,
          attrs = {
            price: $('.price-input').val(),
            band: $('.band-name-input').val() || 'TBA',
            musicians: $('.musicians-input').val(),
            caller: $('.caller-input').val() || 'TBA',
            beginnerFrdly: $('.beginner').prop('checked'),
            workshopIncl: $('.workshop-incl').prop('checked'),
            notes: $('.notes-input').val()
          };
      model.get(this.model.event.objectId, {
        success: function(event) {
          event.saveInfo(orgUrlId, parentEvent, 1000, attrs)
          .then(function(event) {
            self.model.event = event.toJSON();
            self.model.edit.eventInfo = false;
            $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(self.model));
          });
        },
        error: function() {
          console.log('an error occured');
        }
      });
    },
    saveVenueInfo: function(e) {
      e.preventDefault();
      var model = new Parse.Query('Event');
      model.get(this.model.event.objectId, {
        success: function(event) {
          event.saveVenue();
        },
        error: function() {
          console.log('an error occured');
        }
      });
    },
    multiDay: function() {
      var formModel = this.formatDatesforForm(this.model);
      if (this.model.event.multiDay) {
        this.model.event.multiDay = false;
        $('.multi-day').html('');
      } else {
        this.model.event.multiDay = true;
        $('.multi-day').html(DanceCard.templates.orgs.org._multiDay(formModel));
      }
    },
    chooseRpt: function() {
      if ($('.chooseRpt:checked').val() === "true") {
        $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.model));
      } else {
        $('.choose-monthly-rpt').html('');
      }
    }
  });

})();
