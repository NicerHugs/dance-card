(function(){
  'use strict';

  DanceCard.Views.Event = DanceCard.Views.Base.extend({
    className: 'event',
    template: DanceCard.templates.orgs.org.event,
    render: function() {
      console.log(this.model);
      this.$el.html(this.template(this.model));
      $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.model));
      $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.model));
      $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.model));
    },
    events: {
      'click .edit-event-header' : 'editEventHeader',
      'click .edit-event-info'   : 'editEventInfo',
      'click .edit-venue-info'   : 'editVenueInfo'
    },
    editEventHeader: function(e) {
      e.preventDefault();
      console.log('you want to edit the event header');
    },
    editEventInfo: function(e) {
      e.preventDefault();
      console.log('you want to edit the event info');
    },
    editVenueInfo: function(e) {
      e.preventDefault();
      console.log('you want to edit the venue info');
    }
  });

})();
