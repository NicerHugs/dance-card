(function() {
  DanceCard.Views.Signup = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'signup-form',
    template: _.template($('#signup-template').text()),
    render: function() {
      this.model = new Anypic.Models.User();
      this.$el.html(this.template());
    },
    events: {
      'submit' : 'signup',
      'change input[type=file]' : 'uploadFile'
    },
    uploadFile: function(e){
      var file = $(e.target)[0].files[0];
      var parseFile = new Parse.File(file.name, file);
      var self = this;
      parseFile.save().then(function(){
        self.model.set('profilePic', parseFile.url());
        $('.submit').prop("disabled", false);
      });
    },
    signup: function(e) {
      e.preventDefault();
      var self = this;
      var email = this.$('.email').val();
      var password = this.$('.password').val();
      var attrs = {
        name: this.$('.username').val(),
        image: this.model.get('profilePic')
      };
      Parse.User.signUp(email, password, attrs)
      .then(function(){
        Anypic.session.set('user', Parse.User.current());
        Anypic.router.navigate('', {trigger: true});
        self.remove();
      });
    }
  });
})();
