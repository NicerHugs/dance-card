(function(){
  'use strict';

  DanceCard.Views.Event = DanceCard.Views.Base.extend({
    className: 'event',
    template: DanceCard.templates.orgs.org.event,
    render: function() {
      var self = this;
      this.model.setTemplateData(this)
      .done(function() {
        self.$el.html(self.template(self.templateData));
        self.makeMap();
      });
    },

    events: {
      'click .rsvp'              : 'rsvp',
      'click .unrsvp'            : 'cancelRSVP',
      'click .cancel'            : 'removeAlert'
    },

    rsvp: function(e) {
      e.preventDefault();
      var self = this;
      this.model.rsvp()
      .done(function() {
        self.render();
      })
      .fail(function() {
        // what to do when something goes wrong
        if (arguments[0] === "user not loggedIn") {
          self.$el.append(DanceCard.templates._loginRequired());
          console.log('something went wrong', arguments);
        }
      });
    },

    removeAlert: function(e) {
      e.preventDefault();
      $('.login-req-notif').remove();
    },

    cancelRSVP: function(e) {
      e.preventDefault();
      var self = this;
      this.model.cancelRSVP()
      .done(function() {
        self.render();
      })
      .fail(function() {
        console.log('something went wrong', arguments);
      });
    },

    makeMap: function() {
      var lat = this.model.get('point').latitude,
          lng = this.model.get('point').longitude;
      this.children.push(new DanceCard.Views.MapPartial({
        $container: $('.venue-info-viewing'),
        zoom: 13,
        loc: {lat: lat, lng: lng},
        model: this.model
      }));
    },

  });

})();
