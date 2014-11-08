(function() {

  DanceCard.Views.Org = DanceCard.Views.Base.extend({
    className: 'org',
    template: DanceCard.templates.orgs.org.index,
    render: function() {
      var self = this,
          collection = new DanceCard.Collections.LoggedOutEventList({
            urlId: this.model.get('urlId')
          });
      collection.fetch()
      .then(function() {
        self.$el.html(self.template({
          events: collection.toJSON(),
          loggedIn: false,
          model: self.model.toJSON()
        }));
      });
    },
  });

})();
