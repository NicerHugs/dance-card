(function(){
  'use strict';

  DanceCard.Views.Dancer = DanceCard.Views.Base.extend({

    className: 'dancer',
    template: DanceCard.templates.dancer,
    render: function() {
      this.templateData = this.model.setTemplateData();
      this.$el.html(this.template(this.templateData));
      this.getDances()
      .then(_.bind(this.renderChildren, this));
    },

    renderChildren: function(collection) {
      var self = this;
      if (collection.models.length > 0) {
        _.each(collection.models, function(model) {
          self.children.push(new DanceCard.Views.EventListItemPartial({
            $container: $('.dancer-attending'),
            model: model
          }));
        });
      } else {
        if (this.templateData.owner) {
          $('.content').append("<p>You have not RSVP'd to any events yet.</p>");
        } else {
          $('.content').append("<p>" + this.model.get('name') + " has not RSVP'd to any events yet.</p>");
        }
      }
    },

    getDances: function() {
      return new DanceCard.Collections.Attending({
        dancer: this.model
      }).fetch();
    }

  });

})();
