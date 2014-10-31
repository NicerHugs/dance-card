(function() {

  DanceCard.Views.Events = DanceCard.Views.Base.extend({
    className: 'org-events',
    template: DanceCard.templates.orgs.org.events,
    render: function() {
      this.$el.html(this.template(this.collection.toJSON()));
    },
  });

})();
