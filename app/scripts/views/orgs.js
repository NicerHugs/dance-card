(function() {

  DanceCard.Views.Orgs = DanceCard.Views.Base.extend({
    className: 'orgs',
    template: DanceCard.templates.orgs,
    render: function() {
      this.$el.html(this.template());
    },
  });

})();
