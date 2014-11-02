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
          $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.model));}
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.model));
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.model));
        if (this.model.event.recurMonthly) {
          $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.model));
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
      'click .chooseRpt'         : 'chooseRpt'
    },
    editEventHeader: function(e) {
      e.preventDefault();
      if (this.model.edit.eventHeader) {
        this.model.edit.eventHeader = false;
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.model));
      } else {
        this.model.edit.eventHeader = true;
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.model));
      }
    },
    editEventRecur: function(e) {
      e.preventDefault();
      if (this.model.edit.eventRecur) {
        this.model.edit.eventRecur = false;
        $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.model));
      } else {
        this.model.edit.eventRecur = true;
        $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.model));
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
      var model = new Parse.Query('Event');
      model.get(this.model.event.objectId, {
        success: function(event) {
          event.saveHeader();
        },
        error: function() {
          console.log('an error occured');
        }
      });
    },
    saveEventRecur: function(e) {
      e.preventDefault();
      var model = new Parse.Query('Event');
      model.get(this.model.event.objectId, {
        success: function(event) {
          event.saveRecur();
        },
        error: function() {
          console.log('an error occured');
        }
      });
    },
    saveEventInfo: function(e) {
      e.preventDefault();
      var model = new Parse.Query('Event');
      model.get(this.model.event.objectId, {
        success: function(event) {
          event.saveInfo();
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
      if (this.model.event.multiDay) {
        this.model.event.multiDay = false;
        $('.multi-day').html('');
      } else {
        this.model.event.multiDay = true;
        $('.multi-day').html(DanceCard.templates.orgs.org._multiDay);
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
