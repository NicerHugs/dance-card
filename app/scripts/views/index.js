(function() {

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    tagName: 'index',
    template: DanceCard.templates.index,
    render: function() {
      this.$el.html(this.template());
      DanceCard.renderSearchMap([
        {location: { latitude: 34.397, longitude: -84.644}},
        {location: { latitude: 34.397, longitude: -83.644}}
      ]);
    },
  });

})();
