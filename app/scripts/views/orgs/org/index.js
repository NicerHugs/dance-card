(function() {

  DanceCard.Views.OrgIndex = DanceCard.Views.Base.extend({
    className: 'org-index',
    template: DanceCard.templates.orgs.org.index,
    render: function() {
      var self = this;
      if (Parse.User.current().get('urlId') === this.model.get('urlId')){
        //render logged in user version
        new DanceCard.Views.OrgManage({
          $container: this.$el,
          model: this.model
        });
      } else {
        //render non-logged in view
        this.$el.html(this.template(this.model.toJSON()));
        var query = new Parse.Query('Event');
        query.equalTo('orgUrlId', this.model.get('urlId'));
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        query.greaterThan('startDate', yesterday);
        query.notEqualTo('recurring', true);
        query.ascending('startDate');
        query.limit(10);
        var collection = query.collection();
        collection.fetch()
        .then(function() {
          var events = collection.toJSON();
          _.each(events, function(model) {
            new DanceCard.Views.EventsPartial({
              $container: self.$el,
              model: model
            });
          });
        });
      }
    },
  });

})();
