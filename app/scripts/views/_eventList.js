(function() {
  'use strict';

  DanceCard.Views.EventListPartial = DanceCard.Views.Base.extend({
    tagName: 'ul',
    className: 'search-results-list',
    template: DanceCard.templates._eventList,
    render: function() {
      this.$el.html(this.template({
        location: this.options.location,
        searchResults: this.options.searchResults
      }));
      this.collection.fetch()
      .then(_.bind(this.renderChildren, this));
    },
    renderChildren: function(collection) {
      var self = this;
      if (collection.models.length > 0) {
        if (collection.models.length === 1) {
          self.$el.append('<h4>1 result matches your search</h4>');
        } else {
          self.$el.append('<h4>' + self.collection.models.length + ' results match your search</h4>');
        }
        _.each(collection.models, function(model){
          self.children.push(new DanceCard.Views.EventListItemPartial({
            $container: self.$el,
            model: model,
            parent: self
          }));
        });
      } else {
        self.$el.append('<h4>sorry, there are no results that match your search</h4>');
      }
    }
  });

})();
