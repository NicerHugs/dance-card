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

    alertRecurWarning: function() {
      var def = new $.Deferred();
      $('main').append(DanceCard.templates.orgs.org._saveWarning());
      $('.save-warning').on('click', '.continue-save', function(e) {
        e.preventDefault();
        $('.save-warning').remove();
        def.resolve();
      });
      $('.save-warning').on('click', '.cancel-save', function(e) {
        e.preventDefault();
        $('.save-warning').remove();
        def.reject();
      });
      return def.promise();
    },

    deleteEvent: function(e) {
      e.preventDefault();
      var self = this;
      this.model.destroy({
        success: function() {
          DanceCard.router.navigate('#/orgs/' + self.model.get('orgUrlId'));
          self.remove();
        },
        fail: function() {
          console.log('failed to destroy the event');
        }
      });
    },
    editEventHeader: function(e) {
      if (e) e.preventDefault();
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
      if (e) e.preventDefault();
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
      if (e) e.preventDefault();
      if (this.templateData.edit.eventInfo) {
        this.templateData.edit.eventInfo = false;
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
      } else {
        this.templateData.edit.eventInfo = true;
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
      }
    },
    editVenueInfo: function(e) {
      if (e) e.preventDefault();
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
          attrs = this.setEventHeader();
      if (this.model.get('recurring')) {
        this.alertRecurWarning()
        .done(function(){
          self.model.saveHeader(attrs.attrs, attrs.dateAttrs)
          .then(_.bind(self.resetAfterSaveHeader, self));
        })
        .fail(_.bind(self.editEventHeader, self));
      } else {
        self.model.saveHeader(attrs.attrs, attrs.dateAttrs)
        .then(_.bind(self.resetAfterSaveHeader, self));
      }
    },

    setEventHeader: function() {
      var self = this,
          attrs = {
                    name: $('.event-name-input').val(),
                    type: $('.event-type-input').val().split('-').join(' '),
                    startTime: $('.event-start-time-input').val(),
                    endTime: $('.event-end-time-input').val()
                  },
          dateAttrs = {};
      if ($('.event-start-date-input').val()) {
        dateAttrs.startDate = new Date(moment($('.event-start-date-input').val()).format());
      }
      if ($('.multi-day-input').prop('checked')) {
        dateAttrs.endDate = new Date(moment($('.event-end-date-input').val()).format());
        dateAttrs.multiDay = $('.multi-day-input').prop('checked');
      } else {
        dateAttrs.endDate = dateAttrs.startDate;
      }
      return {attrs: attrs, dateAttrs: dateAttrs};
    },

    resetAfterSaveHeader: function(model) {
      this.model = model;
      this.templateData.event = this.model.toJSON();
      this.templateData.edit.eventHeader = false;
      $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.templateData));
    },

    saveEventRecur: function(e) {
      e.preventDefault();
      var self = this;
      var attrs = this.setEventRecur();
      this.model.saveRecur(attrs.attrs, attrs.dateAttrs)
      .then(_.bind(this.resetAfterSaveEventRecur, this));
    },

    setEventRecur: function() {
      var self = this,
          attrs = {
                    weeklyRpt: $('.weekly-option-input').val(),
                    weeklyRptName: $('.weekly-option-input :selected').text(),
                    monthlyRpt: $('.monthly-option-input').val()
                  },
          dateAttrs = {
                    endDate: new Date(moment($('.event-end-date-input').val()).format())
                  };
      if ($('.chooseRpt:checked').val() === "true") {
        attrs.recurMonthly = true;
      } else {
        attrs.recurMonthly = false;
      }
      return {attrs: attrs, dateAttrs: dateAttrs};
    },

    resetAfterSaveEventRecur: function(model) {
      this.model = model;
      this.templateData.event = this.model.toJSON();
      this.templateData.edit.eventRecur = false;
      $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.templateData));
    },

    saveEventInfo: function(e) {
      e.preventDefault();
      var self = this;
      var attrs = this.setEventInfo();
      if (this.model.get('recurring')) {
        this.alertRecurWarning()
        .done(function(){
          self.model.saveInfo(attrs)
          .then(_.bind(self.resetAfterSaveEventInfo, self));
        })
        .fail(_.bind(self.editEventInfo, self));
      } else {
        self.model.saveInfo(attrs)
        .then(_.bind(self.resetAfterSaveEventInfo, self));
      }
    },

    setEventInfo: function() {
      var self = this,
        attrs = {
          price: $('.price-input').val(),
          band: $('.band-name-input').val() || 'TBA',
          musicians: $('.musicians-input').val(),
          caller: $('.caller-input').val() || 'TBA',
          beginnerFrdly: $('.beginner').prop('checked'),
          workshopIncl: $('.workshop-incl').prop('checked'),
          notes: $('.notes-input').val()
        };
      return attrs;
    },

    resetAfterSaveEventInfo: function(model) {
      this.model = model;
      this.templateData.event = this.model.toJSON();
      this.templateData.edit.eventInfo = false;
      $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
    },

    saveVenueInfo: function(e) {
      e.preventDefault();
      var self = this;
      var attrs = this.setVenueInfo();
      if (this.model.get('recurring')) {
        this.alertRecurWarning()
        .done(function(){
          self.model.saveVenue(attrs, self);
        })
        .fail(_.bind(self.editVenueInfo, self));
      } else {
        self.model.saveVenue(attrs, self);
      }
    },

    setVenueInfo: function() {
      var attrs = {
        address: $('.event-address-input').val(),
        name: $('.venue-name-input').val()
      };
      return attrs;
    },

    resetAfterSaveVenueInfo: function(model) {
      this.model= model;
      this.templateData.event = this.model.toJSON();
      this.templateData.edit.venueInfo = false;
      $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.templateData));
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
