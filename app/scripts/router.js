(function() {
  'use strict';

  DanceCard.Router = Parse.Router.extend({
    initialize: function() {
      var self=this;
      new DanceCard.Views.App({});
      this.routesHit = 0;
      Parse.history.on('route', function() {
        self.routesHit++;}, self);
    },
    routes: {
      ''                     : 'index',
      'login'                : 'login',
      'logout'               : 'logout',
      'register'             : 'register',
      'events'               : 'events',
      'events/:event'        : 'event', //dynamic
      'events/:event/manage' : 'manageEvent',
      'events/:event/RSVP'   : 'attendEvent',
      'orgs'                 : 'orgs',
      'orgs/:org'            : 'org',
      'create-event'         : 'createEvent',
    },

    index: function() {
      new DanceCard.Views.Index({
        $container: $('main'),
      });
    },
    login: function() {
      $('main').empty();
      if (Parse.User.current()) {
        this.navigate('', {trigger: true});
      } else {
        new DanceCard.Views.Login({
          $container: $('main')
        });
      }
    },
    logout: function() {
      $('main').empty();
      if (Parse.User.current()){
        Parse.User.logOut();
        Anypic.session.set('user', Parse.User.current());
        new DanceCard.Views.Logout({
          $container: $('main')
        });
        new DanceCard.Views.Login({
          $container: $('main')
        });
      } else {
        this.navigate('login', {trigger: true});
      }
    },
    signup: function() {
      if (Parse.User.current()) {
        this.navigate('', {trigger: true});
      } else {
        $('main').empty();
        new DanceCard.Views.Signup({
        $container: $('main')
      });
      }
    }

  });

})();
