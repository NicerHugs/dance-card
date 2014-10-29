(function(){
  'use strict';

  DanceCard.Views.Base = Parse.View.extend({
   initialize: function(options) {
     this.$container = options.$container;
     this.$container.append(this.el);
     this.render();
   }
  });

})();
