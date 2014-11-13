(function() {
  'use strict';

  DanceCard.Views.Org = DanceCard.Views.Base.extend({
    className: 'org',
    template: DanceCard.templates.orgs.org.index,
    render: function() {
      var self = this,
          collection = new DanceCard.Collections.LoggedOutEventList({
            urlId: this.model.get('urlId')
          });
      this.$el.html(this.template(this.model.toJSON()));
      collection.fetch()
      .then(_.bind(this.renderChildren, this));
    },

    renderChildren: function(collection) {
      this.children.push(new DanceCard.Views.OnetimeEventList({
        $container: $('.content'),
        collection: collection,
        name: this.model.get('name'),
        owner: this.model.authenticated()
      }));
    }
  });

})();
