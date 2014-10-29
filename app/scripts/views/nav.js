(function() {

  DanceCard.Views.Nav = Parse.View.extend({
    initialize: function(options) {
      this.$container = options.$container;
      this.$container.append(this.el);
      this.render();
      DanceCard.session.on('change', _.bind(this.render, this));
    },
    tagName: 'nav',
    template: DanceCard.templates.nav,
    render: function() {
      this.$el.html(this.template());
    }
  });

})();
