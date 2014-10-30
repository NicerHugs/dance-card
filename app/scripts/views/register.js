(function() {
  DanceCard.Views.Register = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'register-form',
    template: DanceCard.templates.register,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit' : 'register'
    },
    register: function(e) {
      e.preventDefault();
      var self = this;
      var email = this.$('.email-input').val();
      var password = this.$('.password-input').val();
      var orgName = this.$('.orgName-input').val();
      var urlId = orgName.replace(/[^\w\d\s]/g, '').split(' ').join('_');
      var attrs = {
        email: email,
        orgName: orgName,
        urlId: urlId
      };
      Parse.User.signUp(email, password, attrs)
      .then(function(){
        DanceCard.session.set('user', Parse.User.current());
        DanceCard.router.navigate('', {trigger: true});
        self.remove();
        console.log(DanceCard.session.get('user'));
      });
    }
  });
})();
