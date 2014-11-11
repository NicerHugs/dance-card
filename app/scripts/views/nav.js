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
      console.log(DanceCard.router.mainChildren);
      $('main').prepend('<div class="logout-msg">You have successfully logged out</div>');
      window.setTimeout(function() {
        $('.logout-msg').remove();
      }, 5000);
    }
  });

})();
