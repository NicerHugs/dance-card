(function() {

  DanceCard.Views.OrgManage = DanceCard.Views.Base.extend({
    className: 'org-manage',
    template: DanceCard.templates.orgs.org.manage,
    render: function() {
      var self = this;
      this.$el.html(this.template({
        model: this.model.toJSON(),
        owner: true,
        loggedIn: true
      }));

      //render a list of their recurring events, each as its own view
      var recurringCollection = new DanceCard.Collections.RecurringEventList({
        urlId: this.model.get('urlId')
      });
      recurringCollection.fetch()
      .then(_.bind(this.renderRecur, this));

      //render a list of their one time events, all in one view
      var onetimeCollection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.model.get('urlId')
      });
      onetimeCollection.fetch()
      .then(_.bind(this.renderOnetime, this));
    },

    renderOnetime: function(collection) {
      new DanceCard.Views.OnetimeEventList({
        $container: $('.content'),
        collection: collection,
        owner: true,
        urlId: this.model.get('urlId')
      });
    },

    renderRecur: function(collection) {
      var self = this;
      if (collection.models.length > 0) {
        _.each(collection.models, function(model) {
          new DanceCard.Views.RecurringEventListItem({
            $container: $('.recurring-event-list'),
            model: model
          });
        });
      } else {
        new DanceCard.Views.RecurringEventListItem({
          $container: $('.recurring-event-list'),
          model: {urlId: self.model.get('urlId')}
        });
      }
    }
  });

})();
