(function() {

  DanceCard.Views.OrgManage = DanceCard.Views.Base.extend({
    className: 'org-manage',
    template: DanceCard.templates.orgs.org.manage,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.append('<div class="recur-events"></div>');
      this.$el.append('<div class="onetime-events"></div>');
      this.populateOnetimeEvents();
      this.populateRecurringEvents();
    },
    populateRecurringEvents: function() {
      var self = this;
      var query = new Parse.Query('Event');
      query.equalTo('orgUrlId', this.model.get('urlId'));
      query.equalTo('recurring', true);
      var collection = query.collection();
      var template = DanceCard.templates.orgs.org._recur;
      collection.fetch()
      .then(function() {
        $('.recur-events').html(template({
          collection: collection,
          orgUrlId: self.model.get('urlId')
        }));
      });
    },
    populateOnetimeEvents: function() {
      var self = this;
      var query = new Parse.Query('Event');
      query.equalTo('orgUrlId', this.model.get('urlId'));
      query.equalTo('recurring', false);
      query.doesNotExist('parentEvent');
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      query.greaterThan('startDate', yesterday);
      query.ascending('startDate');
      var template = DanceCard.templates.orgs.org._onetime;
      var collection = query.collection();
      collection.fetch()
      .then(function() {
        $('.onetime-events').html(template({
          collection: collection,
          orgUrlId: self.model.get('urlId')
        }));
      });
    },
  });

})();
