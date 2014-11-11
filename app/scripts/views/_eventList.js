(function() {
  'use strict';

  DanceCard.Views.EventListPartial = DanceCard.Views.Base.extend({
    tagName: 'ul',
    className: 'search-results-list',
    template: DanceCard.templates._eventList,
    render: function() {
      this.collection.fetch()
      .then(_.bind(this.renderChildren, this));
    },
    renderChildren: function(collection) {
      var self = this;
      this.$el.html(this.template({
        results: collection.models,
        one: collection.models.length === 1,
        count: collection.models.length,
      }));
      if (collection.models.length > 0) {
        _.each(collection.models, function(model){
          self.children.push(new DanceCard.Views.EventListItemPartial({
            $container: self.$el,
            model: model,
            parent: self
          }));
        });
      }
    }
  });

})();
