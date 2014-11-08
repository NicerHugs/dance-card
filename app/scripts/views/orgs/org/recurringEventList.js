(function(){
  'use strict';

  DanceCard.Views.RecurringEventListItem = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'recurring-event',
    template: DanceCard.templates.orgs.org._recurList,
    render: function() {
      var self = this;
      //render the recurring event
      if (this.model.toJSON) {
        this.$el.html(this.template(this.model.toJSON()));
        //render the children of the recurring event
        var collection = new DanceCard.Collections.OnetimeEventList({
          orgUrlId: this.model.get('orgUrlId'),
          parentEvent: this.model
        });
        collection.fetch()
        .then(function() {
          new DanceCard.Views.OnetimeEventList({
            $container: self.$el,
            collection: collection
          });
        });
      } else {
        this.$el.html(this.template(this.model));
      }
    },

    events: {
      'click .recur-event-name' : 'toggleChildren',
      'click .delete-recur'     : 'deleteEvent'
    },

    toggleChildren: function(e) {
      e.preventDefault();
      if (this.$el.children('ul').css('height') === '0px') {
        this.$el.children('ul').css('height', 'auto');
      }
      else {
        this.$el.children('ul').css('height', 0);
      }
    },
    deleteEvent: function(e) {
      e.preventDefault();
      var self = this,
          collection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.model.get('orgUrlId'),
        parentEvent: this.model,
        limit: 1000
      });
      collection.fetch()
      .then(function(){
        DanceCard.Utility.destroyAll(collection);
        self.model.destroy();
        self.remove();
      });
    }
  });

})();
