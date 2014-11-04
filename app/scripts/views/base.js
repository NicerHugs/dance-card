(function(){
  'use strict';

  DanceCard.Views.Base = Parse.View.extend({
    initialize: function(options) {
      this.options = options;
      this.$container = options.$container;
      this.$container.append(this.el);
      this.render();
      this.children = [];
    },
    remove: function() {
      this.$el.remove();
      this.removeChildren();
      return this;
    },
    removeChildren: function() {
      _.invoke(this.children, 'remove');
    }
  });

})();
