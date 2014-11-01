DanceCard.Views.EventPartial = DanceCard.Views.Base.extend({
  tagName: 'article',
  className: 'org-event',
  template: DanceCard.templates.orgs.org._event,
  render: function() {
    this.$el.html(this.template(this.model));
  }
});
