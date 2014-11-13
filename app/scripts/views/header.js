(function() {
  'use strict';

  DanceCard.Views.Header = DanceCard.Views.Base.extend({
    tagName: 'header',
    render: function() {
      var urlString;
      if (Parse.User.current()) {
        urlString = '/dancers/' + Parse.User.current().get('urlId');
      }
      this.$el.append('<h1><a href="#'+urlString+'">Dance Card</a></h1>');
      this.$el.append('<span class="tag-line">Do you want to dance?</span>');
      this.navView = new DanceCard.Views.Nav({
        $container: this.$el,
        model: DanceCard.session
      });
    }

  });

})();
