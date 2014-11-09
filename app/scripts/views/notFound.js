(function() {
  'use strict';

  DanceCard.Views.NotFound = DanceCard.Views.Base.extend({
    className: '404',
    template: DanceCard.templates.notFound,
    render: function() {
      this.$el.append(this.template());
    }
  });

})();
