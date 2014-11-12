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
      this.$el.html(this.template(this.model.toJSON()));
    },

    events: {
      'click .logout' : 'logout'
    },

    logout: function(e) {
      e.preventDefault();
      Parse.User.logOut();
      DanceCard.session.set('user', Parse.User.current());
      DanceCard.router.navigate('', {trigger: true});
    }
  });

})();
