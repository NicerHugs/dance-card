(function() {
  'use strict';

  DanceCard.Views.EventListItemPartial = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'search-result',
    template: DanceCard.templates._eventListItem,
    render: function() {
      this.templateData = {
        event: this.model.toJSON()};
      if (DanceCard.session.get('user')) {
        this.templateData.loggedIn = true;
        this.templateData.dancer = (!DanceCard.session.get('user').organizer);
        this.templateData.owner = (this.model.get('orgUrlId') === DanceCard.session.get('user').urlId);
      } else {
      this.templateData.loggedIn = false;
      }
      this.$el.html(this.template(this.templateData));
    }
    
  });

})();
