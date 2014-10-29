(function() {

  DanceCard.Views.CreateEvent = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'new-event-form',
    template: DanceCard.templates.orgs.org.createEvent,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit' : 'createEvent'
    },
    createEvent: function(e) {
      e.preventDefault();
    }
  });

})();
