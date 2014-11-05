(function(){
  'use strict';

  DanceCard.Views.RecurringEventListItem = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'recurring-event',
    template: DanceCard.templates.orgs.org._recurList,
    render: function() {
      var self = this;
      //render the recurring event
      this.$el.html(this.template(this.model));

      //render the children of the recurring event
      new Parse.Query('Event').get(this.model.objectId, {
        success: function(model) {
          var collection = new DanceCard.Collections.OnetimeEventList({
            orgUrlId: self.model.orgUrlId,
            parentEvent: model
          });
          collection.fetch()
          .then(function() {
            new DanceCard.Views.OnetimeEventList({
              $container: self.$el,
              collection: collection
            });
          });
        }
      });  
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
        orgUrlId: this.model.orgUrlId,
        parentEvent: this.model.urlId
      });
      collection.fetch()
      .then(function(){
        DanceCard.Utility.destroyAll(collection);
      });
      new Parse.Query('Event')
      .get(this.model.objectId, {
        success: function(event) {
          event.destroy();
          self.remove();
        },
        fail: function(error) {
          console.log(error);
        }
      });
    }
  });

})();
