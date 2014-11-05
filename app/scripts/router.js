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
      var self = this,
          query = new Parse.Query('User'),
          user = query.find({
            success: function(user) {
              self.mainChildren.push(new DanceCard.Views.Org({
                $container: $('main'),
                model: user[0]
              }));
            }, error: function() {
              console.log('user not found');
              self.mainChildren.push(new DanceCard.Views.OrgNotFound({
                $container: $('main')
              }));
            }
          });
      query.equalTo('urlId', org);
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
        if (org === DanceCard.session.get('user').urlId) {
          self.mainChildren.push(new DanceCard.Views.Event({
            $container: $('main'),
            model: {
              edit: {},
              event: evt.toJSON(),
              loggedIn: true,
              eventOrg: DanceCard.session.get('user')
            }
          }));
        } else {
          var orgObj = evt.get('org');
          self.mainChildren.push(new DanceCard.Views.Event({
            $container: $('main'),
            model: {
              event: evt.toJSON(),
              loggedIn: false,
              eventOrg: orgObj.toJSON()
            }
          }));
        }
      });

    }
  });

})();
