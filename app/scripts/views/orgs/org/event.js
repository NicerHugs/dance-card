(function(){
  'use strict';

  DanceCard.Views.Event = DanceCard.Views.Base.extend({
    className: 'event',
    template: DanceCard.templates.orgs.org.event,
    render: function() {
      console.log(this.model);
      this.$el.html(this.template(this.model));
    }
  });

})();
