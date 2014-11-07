(function() {
  'use strict';

  DanceCard.Router = Parse.Router.extend({
    initialize: function() {
      var self=this;
      new DanceCard.Views.App({});
      this.routesHit = 0;
      Parse.history.on('route', function() {
        self.routesHit++;
      });
    },
    routes: {
      ''                       : 'index',
      'login'                  : 'login',
      'logout'                 : 'logout',
      'register'               : 'register',
      'orgs'                   : 'orgs',
      'orgs/:org'              : 'org', //dynamic, for validated user will allow user to manage events, otherwise will show the org and their events
      'orgs/:org/create-event' : 'createEvent', //dynamic
      'orgs/:org/:event'       : 'evnt', //dynamic, for validated user will be manage event page, otherwise will show the event info
      'orgs/:org/:event/RSVP'  : 'attendEvent', //dynamic
    },
    mainChildren: [],

    index: function() {
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren.push(new DanceCard.Views.Index({
        $container: $('main')
      }));
    },
    login: function() {
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren.push(new DanceCard.Views.Login({
        $container: $('main')
      }));
    },
    logout: function() {
      Parse.User.logOut();
      DanceCard.session.set('user', Parse.User.current());
      DanceCard.session.set('dancer', false);
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren.push(new DanceCard.Views.Logout({
        $container: $('main'),
      }));
      this.mainChildren.push(new DanceCard.Views.Login({
        $container: $('main')
      }));
    },
    register: function() {
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren.push(new DanceCard.Views.Register({
        $container: $('main'),
        model: new DanceCard.Models.User()
      }));
    },
    orgs: function() {
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren.push(new DanceCard.Views.Orgs({
        $container: $('main')
      }));
    },
    org: function(org) {
      _.invoke(this.mainChildren, 'remove');
      var self = this;
      new Parse.Query('User')
        .equalTo('urlId', org)
        .find({
          success: function(user) {
            if (user.length > 0) {
              _.invoke(this.mainChildren, 'remove');
              self.mainChildren.push(new DanceCard.Views.Org({
                $container: $('main'),
                model: user[0]
              }));
            } else {
              console.log('user not found');
              _.invoke(this.mainChildren, 'remove');
              self.mainChildren.push(new DanceCard.Views.NotFound({
                $container: $('main')
              }));
            }
          }, error: function() {
            console.log('error retrieving user');
            _.invoke(this.mainChildren, 'remove');
            self.mainChildren.push(new DanceCard.Views.NotFound({
              $container: $('main')
            }));
          }
        });
    },
    createEvent: function(org) {
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren.push(new DanceCard.Views.CreateEvent({
        $container: $('main'),
        model: new DanceCard.Models.Event({
          org: Parse.User.current(),
          orgUrlId: org
        })
      }));
    },
    evnt: function(org, evnt) {
      _.invoke(this.mainChildren, 'remove');
      var self = this,
          query = new Parse.Query('Event');
      query.get(evnt)
      .then(function(evt) {
        self.mainChildren.push(new DanceCard.Views.Event({
          $container: $('main'),
          model: evt
        }));
      });

    }
  });

})();
