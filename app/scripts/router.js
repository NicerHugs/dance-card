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
      'settings'               : 'settings',
      'orgs'                   : 'orgs',
      'orgs/:org'              : 'org', //dynamic, for validated user will allow user to manage events, otherwise will show the org and their events
      'orgs/:org/create-event' : 'createEvent', //dynamic
      'orgs/:org/:event'       : 'evnt', //dynamic, for validated user will be manage event page, otherwise will show the event info
      'orgs/:org/:event/email' : 'emailAttendees'
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

    settings: function() {
      _.invoke(this.mainChildren, 'remove');
      if (Parse.User.current()) {
        this.mainChildren.push(new DanceCard.Views.Settings({
          $container: $('main'),
          model: Parse.User.current()
        }));
      } else {
        this.mainChildren.push(new DanceCard.Views.NotFound({
          $container: $('main')
        }));
      }
    },

    orgs: function() {
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren.push(new DanceCard.Views.Orgs({
        $container: $('main')
      }));
    },
    org: function(org) {
      var self = this;
      new Parse.Query('User')
        .equalTo('urlId', org)
        .find({
          success: function(org) {
            // org exists
            if (org.length > 0) {
              if (org[0].authenticated()) {
                // current user is the org being viewed
                _.invoke(self.mainChildren, 'remove');
                self.mainChildren.push(new DanceCard.Views.OrgManage({
                  $container: $('main'),
                  model: org[0]
                }));
              } else {
                _.invoke(self.mainChildren, 'remove');
                self.mainChildren.push(new DanceCard.Views.Org({
                  $container: $('main'),
                  model: org[0]
                }));
              }
            } else {
              console.log('user not found');
              _.invoke(self.mainChildren, 'remove');
              self.mainChildren.push(new DanceCard.Views.NotFound({
                $container: $('main')
              }));
            }
          }, error: function() {
            console.log('error retrieving user');
            _.invoke(self.mainChildren, 'remove');
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
        if (DanceCard.session.get('user') && !DanceCard.session.get('dancer')) {
          if (evt.get('orgUrlId') === Parse.User.current().get('urlId')) {
            self.mainChildren.push(new DanceCard.Views.EventManage({
              $container: $('main'),
              model: evt
            }));
          } else {
            self.mainChildren.push(new DanceCard.Views.Event({
              $container: $('main'),
              model: evt
            }));
          }
        } else {
          self.mainChildren.push(new DanceCard.Views.Event({
            $container: $('main'),
            model: evt
          }));
        }
      });
    },

    emailAttendees: function(org, evnt) {
      var self = this,
          query = new Parse.Query('Event');
      if ( DanceCard.session.get('user') && Parse.User.current().get('urlId') === org) {
        query.get(evnt)
        .then(function(evt) {
          self.mainChildren.push(new DanceCard.Views.Email({
            $container: $('main'),
            model: evt
          }));
        });
      } else {
        window.history.back();
      }
    }
  });

})();
