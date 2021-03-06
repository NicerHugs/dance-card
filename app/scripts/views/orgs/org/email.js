(function() {

  DanceCard.Views.Email = DanceCard.Views.Base.extend({
    tagName: 'composeEmail',
    template: DanceCard.templates.orgs.org.email,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'click .send-email'   : 'sendEmail',
      'click .cancel-email' : 'cancelEmail',
      'click .close-modal'  : 'cancelEmail'
    },

    cancelEmail: function(e) {
      e.preventDefault();
      DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, self);
      this.remove();
      if (DanceCard.router.routesHit === 1) {
        DanceCard.router.navigate('#/orgs/org/' + this.model.id, {trigger: true});
      } else {
        window.history.back();
      }
    },

    sendEmail: function(e) {
      e.preventDefault();
      var self = this,
          body = $('.email-body').val(),
          subject = $('.email-subject').val();
      if (this.validateEmail(body, subject)) {
        Parse.Cloud.run('sendEmail', {
          event: this.model.toJSON(),
          body: body,
          subject: subject
        }, {
          success: function() {
            DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, self);
            self.remove();
            if (DanceCard.router.routesHit === 1) {
              DanceCard.router.navigate('#/orgs/org/' + self.model.id, {trigger: true});
            } else {
              window.history.back();
            }
            $('main').prepend('<div class="email-success">Your message was successfully sent</div>');
            window.setTimeout(function(){
              $('.email-success').remove();
            }, 4000);
          }, error: function() {
            $('main').prepend('<div class="email-failure">Your message was not sent. Please try again</div>');
            window.setTimeout(function(){
              $('.email-failure').remove();
            }, 4000);
            console.log('error', arguments);}
        });
      }
    },

    validateEmail: function(body, subject) {
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      if (!subject) {
        $('label[name="subject"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('subject required');
        $('.email-subject').addClass('invalid').focus();
        return false;
      } else if (!body) {
        $('label[name="body"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('body required');
        $('.email-body').addClass('invalid').focus();
      } else {
        return true;
      }
    }
  });

})();
