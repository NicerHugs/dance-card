(function() {
  'use strict';

  DanceCard.Views.Login = DanceCard.Views.Base.extend({
    className: 'modal-view',
    template: DanceCard.templates.login,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'click'                     : 'closeLogin',
      'click .login'              : 'login',
      'click .forgot-password'    : 'forgotPassword',
      'click .send-reset-request' : 'resetPassword',
      'click .close-modal'        : 'closeModal'
    },

    closeLogin: function(e) {
      if ($(e.target)[0] === this.$el[0]) {
        this.remove();
        DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, this);
        window.history.back();
      }
    },

    closeModal: function(e) {
      e.preventDefault();
      $('.reset-password').remove();
      this.remove();
      this.remove();
      DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, this);
      window.history.back();
    },

    resetPassword: function(e) {
      e.preventDefault();
      $('.invalid-form-warning').remove();
      var email = $('.email-reset-password').val();
      Parse.User.requestPasswordReset(email, {
        success: function() {
          $('.reset-password').append('<div class="success-msg"></div>');
          $('.success-msg').html('Please check your email to reset your password.');
          window.setTimeout(function(){
            $('.success-msg').remove();
            $('.reset-password').remove();
          }, 5000);
        },
        error: function() {
          if (arguments[0].code === 125) {
            $('.reset-password').append('<div class="invalid-form-warning invalid"></div>');
            $('.invalid-form-warning').html('please enter a valid email address');
          } else if (arguments[0].code === 205) {
            $('.reset-password').append('<div class="invalid-form-warning invalid"></div>');
            $('.invalid-form-warning').html('sorry, that email address was not found');
          }
        }
      });
    },

    forgotPassword: function(e) {
      e.preventDefault();
      this.$el.append(DanceCard.templates.forgotPassword());

    },

    login: function(e) {
      e.preventDefault();
      $('.invalid-form-warning').remove();
      var self = this;
      var email = this.$('.email-input').val();
      var password = this.$('.password-input').val();
      Parse.User.logIn(email, password, {
        success: function() {
          self.remove();
          DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, self);
          if ($('.logout-msg')) {
            $('.logout-msg').remove();
          }
          DanceCard.session.set('user', Parse.User.current().toJSON());
          if (DanceCard.router.routesHit > 1) {
            window.history.back();
          } else {
            DanceCard.router.navigate('search', {trigger: true});
          }
        }, error: function() {
          self.$el.append('<div class="invalid-form-warning invalid"></div>');
          $('.invalid-form-warning').html('username or password was not found');
        }
      });
    }
  });
})();
