(function() {

  DanceCard.Views.OrgManage = DanceCard.Views.Base.extend({
    className: 'org-manage',
    template: DanceCard.templates.orgs.org.manage,
    render: function() {
      var self = this;
      this.$el.html(this.template(this.model.toJSON()));
      var query = new Parse.Query('Event');
      query.equalTo('orgUrlId', this.model.get('urlId'));
      var collection = query.collection();
      collection.fetch()
      .then(function() {
        console.log(collection.toJSON());
        new DanceCard.Views.Events({
          $container: self.$el,
          collection: collection
        });
      });
    },
  });

})();
