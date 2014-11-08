(function(){
  'use strict';

  DanceCard.Views.OnetimeEventList = DanceCard.Views.Base.extend({
    tagName: 'ul',
    className: 'onetime-event',
    template: DanceCard.templates.orgs.org._onetimeList,
    render: function() {
      this.$el.html(this.template(this.collection));
    }
  });

})();
