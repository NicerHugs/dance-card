(function() {
  'use strict';

  DanceCard.Views.Header = DanceCard.Views.Base.extend({
    tagName: 'header',
    render: function() {
      this.$el.append('<h1><a href="#">Contra Dance Card</a></h1>');
      this.$el.append('<span>Do you want to dance?</span>');
      this.navView = new DanceCard.Views.Nav({
        $container: this.$el,
        model: DanceCard.session
      });
    },

    events: {
      'click h1' : 'viewIndex'
    },

    viewIndex: function(e) {
      e.preventDefault();
      DanceCard.router.navigate('/', {trigger: true});
    }

  });

})();
