(function(){
  'use strict';

  DanceCard.Views.RecurringEventListItem = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'recurring-event',
    template: DanceCard.templates.orgs.org._recurList,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

})();
