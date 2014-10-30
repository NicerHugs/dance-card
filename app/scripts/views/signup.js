(function() {
  DanceCard.Views.Signup = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'signup-form',
    template: DanceCard.templates.signup,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit' : 'signup',
      'change input[type=file]' : 'uploadFile'
    },
    signup: function(e) {
      e.preventDefault();
      var self = this;
      var email = this.$('.email-input').val();
      var password = this.$('.password-input').val();
      var orgName = this.$('.orgName-input').val();
      var urlId = orgName.replace(/[^\w\d\s]/g, '').split(' ').join('_');
      // Parse.User.signUp(email, password, attrs)
      // .then(function(){
      //   Anypic.session.set('user', Parse.User.current());
      //   Anypic.router.navigate('', {trigger: true});
      //   self.remove();
      // });
      this.model.set({
        email: email,
        orgName: orgName,
        urlId: urlId
      });
      console.log(this.model);
    }
  });
})();
