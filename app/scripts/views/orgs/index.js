(function() {

  DanceCard.Views.OrgsIndex = DanceCard.Views.Base.extend({
    className: 'orgs-index',
    template: DanceCard.templates.orgs,
    render: function() {
      this.$el.html(this.template());
    },
  });

})();
