(function() {
  DanceCard.Views.Logout = DanceCard.Views.Base.extend({
    className: 'logout-msg',
    template: _.template($('#logout-template').text()),
    render: function() {
      this.$el.html(this.template());
    }
  });
})();
