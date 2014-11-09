(function() {
  'use strict';

  DanceCard.Views.Nav = Parse.View.extend({
    initialize: function(options) {
      this.$container = options.$container;
      this.$container.append(this.el);
      this.render();
      this.model.on('change', this.render, this);
    },
    tagName: 'nav',
    template: DanceCard.templates.nav,
    render: function() {
      console.log(this.model.toJSON())
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

})();
