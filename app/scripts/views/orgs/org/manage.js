(function() {

  DanceCard.Views.OrgManage = DanceCard.Views.Base.extend({
    className: 'org-manage',
    template: DanceCard.templates.orgs.org.manage,
    render: function() {
      var self = this;
      this.$el.html(this.template(this.model.toJSON()));
      var query1 = new Parse.Query('Event');
      query1.equalTo('orgUrlId', this.model.get('urlId'));
      query1.equalTo('recurring', true);
      var collection = query1.collection();
      collection.fetch()
      .then(function() {
        self.$el.append('<h3>recurring events</h3>');
        var events = collection.toJSON();
        if (events.length === 0) {
          self.$el.append('<p>nothing to show</p>');
        }
        _.each(events, function(event){
          new DanceCard.Views.EventListItem({
            $container: self.$el,
            model: event
          });
        });
      });
      var query2 = new Parse.Query('Event');
      query2.equalTo('orgUrlId', this.model.get('urlId'));
      query2.equalTo('recurring', false);
      query2.doesNotExist('parentEvent');
      var collection2 = query2.collection();
      collection2.fetch()
      .then(function() {
        self.$el.append('<h3>one time events<h3>');
        var events = collection2.toJSON();
        if (events.length === 0) {
          self.$el.append('<p>nothing to show<p>');
        }
        _.each(events, function(event){
          new DanceCard.Views.EventListItem({
            $container: self.$el,
            model: event
          });
        });
      });
    },
  });

})();
