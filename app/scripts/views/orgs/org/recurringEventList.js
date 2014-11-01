(function(){
  'use strict';

  DanceCard.Views.RecurringEventListItem = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'recurring-event',
    template: DanceCard.templates.orgs.org._recurList,
    render: function() {
      var self = this;
      //render the recurringe event
      this.$el.html(this.template(this.model.toJSON()));
      //render the children of the recurring event
      var collection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.model.get('orgUrlId'),
        parentEvent: this.model.get('urlId')
      });
      collection.fetch()
      .then(function() {
        new DanceCard.Views.OnetimeEventList({
          $container: self.$el,
          collection: collection
        });
      });
    },
    events: {
      'click a' : 'toggleChildren'
    },
    toggleChildren: function(e) {
      e.preventDefault();
      if (this.$el.children('ul').css('height') === '0px') {
        this.$el.children('ul').css('height', 'auto');
      }
      else {
        this.$el.children('ul').css('height', 0);
      }
    }
  });

})();
