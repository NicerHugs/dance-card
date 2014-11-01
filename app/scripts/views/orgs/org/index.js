(function() {

  DanceCard.Views.OrgIndex = DanceCard.Views.Base.extend({
    className: 'org-index',
    template: DanceCard.templates.orgs.org.index,
    render: function() {
      var self = this;

      //if the user is logged in and viewing thier own page
      if (Parse.User.current().get('urlId') === this.model.get('urlId')){
        this.$el.html(this.template({
          model: this.model.toJSON(),
          loggedIn: true
        }));
        //render a list of their recurring events, each as its own view
        var recurringCollection = new DanceCard.Collections.RecurringEventList({
          urlId: this.model.get('urlId')
        });
        recurringCollection.fetch()
        .then(function() {
          _.each(recurringCollection.models, function(event) {
            new DanceCard.Views.RecurringEventListItem({
              $container: $('.recurring-event-list'),
              model: event
            });
          });
        });
        //render a list of their one time events, all in one view
        var onetimeCollection = new DanceCard.Collections.OnetimeEventList({
          urlId: this.model.get('urlId')
        });
        onetimeCollection.fetch()
        .then(function() {
          new DanceCard.Views.OnetimeEventList({
            $container: self.$el,
            collection: onetimeCollection
          });
        });

      //if the user is not logged in or is viewing another orgs page
      } else {
        //render a list of their next 10 upcoming events
        var collection = new DanceCard.Collections.LoggedOutEventList({
          urlId: this.model.get('urlId')
        });
        collection.fetch()
        .then(function() {
          var events = collection.toJSON();
          self.$el.html(self.template({
            events: events,
            loggedIn: false,
            model: {orgName: self.model.get('orgName')}
          }));
        });
      }
    },
  });

})();
