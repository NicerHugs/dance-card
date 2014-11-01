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
      ''                       : 'index',
      'login'                  : 'login',
      'logout'                 : 'logout',
      'register'               : 'register',
      'orgs'                   : 'orgs',
      'orgs/:org'              : 'org', //dynamic, for validated user will allow user to manage events, otherwise will show the org and their events
      'orgs/:org/create-event' : 'createEvent', //dynamic
      'orgs/:org/:event'       : 'evnt', //dynamic
      'orgs/:org/:event/manage': 'manageEvent', //dynamic
      'orgs/:org/:event/RSVP'  : 'attendEvent', //dynamic
    },

    index: function() {
      $('main').empty();
      new DanceCard.Views.Index({
        $container: $('main')
      });
    },
    login: function() {
      $('main').empty();
      new DanceCard.Views.Login({
        $container: $('main')
      });
    },
    logout: function() {
      Parse.User.logOut();
      DanceCard.session.set('user', Parse.User.current());
      $('main').empty();
      new DanceCard.Views.Logout({
        $container: $('main'),
      });
      new DanceCard.Views.Login({
        $container: $('main')
      });
    },
    register: function() {
      $('main').empty();
      new DanceCard.Views.Register({
        $container: $('main'),
        model: new DanceCard.Models.User()
      });
    },
    orgs: function() {
      $('main').empty();
      new DanceCard.Views.Orgs({
        $container: $('main')
      });
    },
    org: function() {
      $('main').empty();
      var query = new Parse.Query('User');
      query.equalTo('urlId', location.hash.slice(7));
      var user = query.find({
        success: function(user) {
          new DanceCard.Views.Org({
            $container: $('main'),
            model: user[0]
          });
        }, error: function() {
          console.log('user not found');
          new DanceCard.Views.OrgNotFound({
            $container: $('main')
          });
        }
      });
    },
    createEvent: function() {
      $('main').empty();
      new DanceCard.Views.CreateEvent({
        $container: $('main'),
        model: new DanceCard.Models.Event({
          org: Parse.User.current(),
          orgUrlId: Parse.User.current().get('urlId')
        })
      });
    },
    evnt: function() {
      $('main').empty();
      console.log('event view');
    }
  });

})();
