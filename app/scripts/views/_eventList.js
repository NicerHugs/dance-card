(function() {
  'use strict';

  DanceCard.Views.EventListPartial = DanceCard.Views.Base.extend({
    className: 'search-results-list',
    template: DanceCard.templates._eventList,
    render: function() {
      this.$el.html(this.template({
        location: this.options.location,
        searchResults: this.options.searchResults
      }));
      this.renderChildren();
    },
    renderChildren: function() {
      var self = this;
      this.collection.fetch()
      .then(function(){
        _.each(self.collection.models, function(child){
          self.children.push(new DanceCard.Views.EventListItemPartial({
            $container: self.$el,
            model: child
          }));
        });
      });
    }
  });

})();
