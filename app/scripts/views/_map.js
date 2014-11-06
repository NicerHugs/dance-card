(function() {
  'use strict';

  DanceCard.Views.MapPartial = DanceCard.Views.Base.extend({
    id: 'map-canvas',
    render: function() {
      var self = this;
      this.map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: this.options.zoom,
        center: this.options.loc
      });
      this.collection.fetch()
      .then(function() {
        self.renderChildren(self.collection);
      });
    },

    renderChildren: function(collection) {
      var self = this;
      _.each(collection.models, function(model) {
        self.children.push(new DanceCard.Views.MarkerPartial({
          $container: self.$el,
          model: model,
          map: self.map
        }));
      });
    },

  });

})();
