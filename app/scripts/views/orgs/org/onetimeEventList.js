(function(){
  'use strict';

  DanceCard.Views.OnetimeEventList = DanceCard.Views.Base.extend({
    tagName: 'ul',
    className: 'onetime-event',
    template: DanceCard.templates.orgs.org._onetimeList,
    render: function() {
      if (this.collection.models.length > 0) {
        this.renderChildren();
      } else {
        var owner = this.options.owner,
            name = this.options.name,
            urlId = this.options.urlId;
        this.$el.html(this.template({owner: owner, name: name, urlId: urlId}));
      }
    },

    renderChildren: function() {
      var self = this;
      _.each(this.collection.models, function(model) {
        self.children.push(new DanceCard.Views.EventListItemPartial({
          $container: self.$el,
          model: model
        }));
      });
    }
  });

})();
