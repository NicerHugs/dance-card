(function() {
  'use strict';

  DanceCard.Views.EventListItemPartial = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'search-result',
    template: DanceCard.templates._eventListItem,
    render: function() {
      var self = this;
      this.setTemplateData()
      .done(function() {
        self.$el.html(self.template(self.templateData));
      });
    },

    setTemplateData: function() {
      var self = this,
          def = new $.Deferred();
      this.templateData = {
        loggedIn: !!DanceCard.session.get('user'),
        event: this.model.toJSON(),
        dancer: DanceCard.session.get('dancer')
      };
      if (this.model.get('orgUrlId') === DanceCard.session.get('user').urlId) {
        this.templateData.owner = true;
        this.templateData.eventOrg = DanceCard.session.get('user');
        def.resolve();
      } else {
        new Parse.Query('User').get(this.model.get('org').id, {
          success: function(org) {
            self.templateData.eventOrg = org.toJSON();
            if (self.templateData.dancer) {
              var relation = Parse.User.current().relation('attending'),
                  query = new Parse.Query('Event');
              relation.query().find()
              .then(function(events){
                self.templateData.attending = events;
                def.resolve();
              });
            } else {
              def.resolve();
            }
          }
        });
      }
      return def.promise();
    },

    events: {
      'click .rsvp'   : 'rsvp',
      'click .unrsvp' : 'cancelRSVP'
    },

    rsvp: function(e) {
      e.preventDefault();
      var self = this;
      this.model.rsvp()
      .done(function() {
        self.render();
      })
      .fail(function() {
        //what to do when something goes wrong
        console.log('something went wrong', arguments);
      });
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

  });

})();
