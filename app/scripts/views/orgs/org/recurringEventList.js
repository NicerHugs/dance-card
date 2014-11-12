(function(){
  'use strict';

  DanceCard.Views.RecurringEventListItem = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'recurring-event',
    template: DanceCard.templates.orgs.org._recurList,
    render: function() {
      var self = this;
      if (this.model.toJSON) {
        this.$el.html(this.template(this.model.toJSON()));
        var collection = new DanceCard.Collections.OnetimeEventList({
          orgUrlId: this.model.get('orgUrlId'),
          parentEvent: this.model
        });
        collection.fetch()
        .then(_.bind(this.renderChildren, this));
      } else {
        this.$el.html(this.template(this.model));
      }
    },

    events: {
      'click .toggle-sub-events' : 'toggleChildren',
      'click .delete-recur'     : 'deleteEvent'
    },

    renderChildren: function(collection) {
      this.children.push(new DanceCard.Views.OnetimeEventList({
        $container: this.$el.children('div'),
        collection: collection
      }));
    },

    toggleChildren: function(e) {
      e.preventDefault();
      if (this.$el.children('.sub-events').children('.onetime-event').css('height') === '1px') {
        this.$el.children('div').children('ul').css('height', 'auto');
        $(e.target).addClass('hide').siblings('.toggle-sub-events').removeClass('hide');
      } else {
        this.$el.children('div').children('ul').css('height', 1);
        $(e.target).addClass('hide').siblings('.toggle-sub-events').removeClass('hide');
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
