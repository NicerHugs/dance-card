(function() {
  'use strict';

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    className: 'index',
    template: DanceCard.templates.index,
    render: function() {
      this.$el.html(this.template());
      DanceCard.locDateSearchQuery(25, 10)
      .done(function(collection) {
        DanceCard.renderSearchMap(collection);
      });
    },
  });

})();
