(function() {
  'use strict';

  DanceCard.Views.Register = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'register-form',
    template: DanceCard.templates.register,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit'                 : 'register',
      'keyup .verify-password' : 'verifyPassword'
    },

    register: function(e) {
      e.preventDefault();
      var self = this,
          email = this.$('.email-input').val(),
          password = this.$('.password-input').val(),
          verPass = this.$('.verify-password').val(),
          name = this.$('.name-input').val(),
          urlId = name.replace(/[^\w\d\s]/g, '').split(' ').join('_'),
          attrs = {
            email: email,
            name: name,
            cancelNotify: true,
            changeNotify: true,
            customNotify: true,
            urlId: urlId
          };
      if ($('.organizer-input:checked').val() === "true") {
        attrs.organizer = true;
      } else {
        attrs.organizer = false;
      }
      if (this.validateUser(attrs, password)) {
        //check to see if the name already exists as a user
        new Parse.Query('User')
        .equalTo('name', name)
        .find({
          success: function(user) {
            if (user.length === 0) {
              Parse.User.signUp(email, password, attrs, {
                success: function() {
                  DanceCard.session.set('user', Parse.User.current().toJSON());
                    if (DanceCard.router.routesHit < 1) {
                      DanceCard.router.navigate('search', {trigger: true});
                    } else {
                      window.history.back();
                    }
                  self.remove();
                },
                error: function() {
                  if (arguments[1].code === 202) {
                    $('label[name="email"]').append('<div class="invalid-form-warning"></div>');
                    $('.invalid-form-warning').html('this email is already registered');
                    $('.email-input').addClass('invalid').focus();
                  } else {
                    self.$el.append('<div class="invalid-form-warning invalid"></div>');
                    $('.invalid-form-warning').html('something went wrong, please try again');
                  }
                }
              });
            } else {
              $('label[name="name"]').append('<div class="invalid-form-warning"></div>');
              $('.invalid-form-warning').html('username already exists');
              $('.name-input').addClass('invalid').focus();
            }
          }
        });
      }

    },

    validateUser: function(attrs, password) {
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      if (!attrs.name) {
        $('label[name="name"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('username is required');
        $('.name-input').addClass('invalid').focus();
        return false;
      } else if (!attrs.email) {
        $('label[name="email"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('email required');
        $('.email-input').addClass('invalid').focus();
        return false;
      } else if (attrs.organizer === undefined) {
        $('label[name="organzier"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('you must indicate if you are a dance organizer');
        $('.organizer-label').addClass('invalid').focus();
        return false;
      } else if (!password) {
        $('label[name="password"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('password required');
        $('.password-input').addClass('invalid').focus();
        return false;
      } else {
        return true;
      }
    },

    verifyPassword: function(e) {
      if ($('.password-input').val() !== $('.verify-password').val()) {
        $(e.target).addClass('invalid');
      } else {
        $(e.target).removeClass('invalid');
        $('.submit-register').removeAttr('disabled');
      }
    }
  });

})();
