(function() {
  'use strict';

  DanceCard.Views.EventListItemPartial = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'search-result',
    template: DanceCard.templates._eventListItem,
    render: function() {
      var self = this;
      this.model.setTemplateData(this)
      .done(function() {
        console.log(self.templateData);
        self.$el.html(self.template(self.templateData));
      });
    },

    events: {
      'click .rsvp'         : 'rsvp',
      'click .unrsvp'       : 'cancelRSVP',
      'click .delete-event' : 'delete',
      'click .cancel'       : 'removeAlert'

    },

    delete: function(e) {
      e.preventDefault();
      var self = this;
      this.model.destroy({
        success: function(){
          self.remove();
          if (self.options.parent) self.options.parent.render();
        }
      });
    },

    removeAlert: function(e) {
      e.preventDefault();
      $('.login-req-notif').remove();
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
          // here i should prompt the user to log in or create an account
          // change login to redirect 'back' when dancer unless first hit
        }
      });
    },

    cancelRSVP: function(e) {
      e.preventDefault();
      var self = this;
      this.model.cancelRSVP()
      .done(function() {
        if (window.location.hash === '#/dancers/' + Parse.User.current().get('urlId')) {
          self.remove();
        } else {
          self.render();
        }
      })
      .fail(function() {
        console.log('something went wrong', arguments);
      });
    },



  });

})();
