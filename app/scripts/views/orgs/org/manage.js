(function() {

  DanceCard.Views.OrgManage = DanceCard.Views.Base.extend({
    className: 'org-manage',
    template: DanceCard.templates.orgs.org.manage,
    render: function() {
      var self = this;
      //if the user is logged in and viewing thier own page
      this.$el.html(this.template({
        model: this.model.toJSON(),
        owner: true,
        loggedIn: true
      }));
      //render a list of their recurring events, each as its own view
      var recurringCollection = new DanceCard.Collections.RecurringEventList({
        urlId: this.model.get('urlId')
      });
      recurringCollection.fetch({
        success: function() {
          if (recurringCollection.models.length > 0) {
            _.each(recurringCollection.models, function(event) {
              new DanceCard.Views.RecurringEventListItem({
                $container: $('.recurring-event-list'),
                model: event
              });
            });
          } else {
            new DanceCard.Views.RecurringEventListItem({
              $container: $('.recurring-event-list'),
              model: {urlId: self.model.get('urlId')}
            });
          }
        },
        fail: function(){
          console.log('fail');
        }
      });
      //render a list of their one time events, all in one view
      var onetimeCollection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.model.get('urlId')
      });
      onetimeCollection.fetch()
      .then(function() {
        new DanceCard.Views.OnetimeEventList({
          $container: self.$el,
          collection: onetimeCollection
        });
      });
    },
  });

})();