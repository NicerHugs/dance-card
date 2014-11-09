(function() {

  DanceCard.Views.Settings = DanceCard.Views.Base.extend({

    className: 'settings',
    template: DanceCard.templates.settings,
    render: function() {
      console.log(this.model.toJSON());
      this.$el.html(this.template(this.model.toJSON()));
    },

    events: {
      'click .change-password' : 'changePassword',
      'click .change-email'    : 'changeEmail',
      'click .delete-msg'      : 'deleteMsgSettings',
      'click .change-msg'      : 'changeMsgSettings',
      'click .custom-msg'      : 'customMsgSettings'
    },

    validatePassword: function(attrs) {
      var def = new $.Deferred();
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      if (!attrs.newPassword) {
        $('label[name="new-password"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('new password is required');
        $('.new-password').addClass('invalid').focus();
        def.reject();
      } else if (attrs.newPassword !== attrs.verPassword) {
        $('label[name="ver-password"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('passwords do not match');
        $('.verify-password').addClass('invalid').focus();
      } else if (!attrs.oldPassword) {
        $('label[name="old-password"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('old password is required');
        $('.old-password').addClass('invalid').focus();
      } else {
        Parse.User.logIn(this.model.get('email'), attrs.oldPassword, {
          success: function() {
            def.resolve();
          },
          error: function(a) {
            $('label[name="old-password"]').append('<div class="invalid-form-warning"></div>');
            $('.invalid-form-warning').html('old password is invalid');
            $('.old-password').addClass('invalid').focus();
            def.reject();
          }
        });
      }
      return def.promise();
    },

    changePassword: function(e) {
      e.preventDefault();
      var self = this,
          newPassword = $('.new-password').val(),
          oldPassword = $('.old-password').val(),
          verPassword = $('.verify-password').val(),
          attrs = {
            newPassword: newPassword,
            oldPassword: oldPassword,
            verPassword: verPassword
          };
      this.validatePassword(attrs)
      .done(function(){
        self.model.setPassword(attrs.newPassword);
        self.model.save(null, {
          success: function() {
            $('.password-change')[0].reset();
            $('.password-change').append('<div class="password-success">Your password was successfully changed</div>');
            window.setTimeout(function(){
              $('.password-success').remove();
            }, 4000);
          },
          error: function() {
            $('.password-change').append('<div class="password-error">Something went wrong, please try again</div>');
            window.setTimeout(function(){
              $('.password-error').remove();
            }, 4000);
          }
        });
      });
    },

    changeEmail: function(e) {
      e.preventDefault();
      var self = this;
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      var email = $('.new-email').val();
      if (!email) {
        $('label[name="email"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('email is is required');
        $('.new-email').addClass('invalid').focus();
      } else if (email.indexOf('.') === -1 || email.indexOf('@') === -1) {
        $('label[name="email"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('please enter a valid email address');
        $('.new-email').addClass('invalid').focus();
      } else {
        this.model.setEmail(email);
        this.model.save(null, {
          success: function() {
            self.render();
            $('.email-settings').prepend('<div class="email-success">Your email was successfully changed</div>');
            window.setTimeout(function(){
              $('.email-success').remove();
            }, 4000);
          },
          error: function() {
            $('.email-settings').prepend('<div class="email-error">Something went wrong, please try again</div>');
            window.setTimeout(function(){
              $('.email-error').remove();
            }, 4000);
          }
        });
      }
    },

    deleteMsgSettings: function() {
      console.log($('.delete-msg:checked').val());
    },

    changeMsgSettings: function() {
      console.log($('.change-msg:checked').val());
    },

    customMsgSettings: function() {
      console.log($('.custom-msg:checked').val());
    }

  });

})();
