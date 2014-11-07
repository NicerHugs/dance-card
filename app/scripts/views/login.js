(function() {
  DanceCard.Views.Login = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'login-form',
    template: DanceCard.templates.login,
    render: function() {
      this.$el.html(this.template());
      // console.log(this.undelegateEvents());
    },
    events: {
      'click .login' : 'login'
    },
    login: function(e) {
      e.preventDefault();
      var self = this;
      var email = this.$('.email-input').val();
      var password = this.$('.password-input').val();
      Parse.User.logIn(email, password).then(
        function() {
          self.remove();
          if ($('.logout-msg')) {
            $('.logout-msg').remove();
          }
          DanceCard.session.set('user', Parse.User.current().toJSON());
          if (Parse.User.current().get('organizer')) {
            DanceCard.router.navigate('#/orgs/'+ Parse.User.current().get('urlId'), {trigger: true});
          } else {
            DanceCard.router.navigate('#', {trigger: true});
          }
        }
      );
    }
  });
})();
