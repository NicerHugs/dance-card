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
      'search'                 : 'search',
      'search?:searchTerms'    : 'searchResults',
      'login'                  : 'login',
      'logout'                 : 'logout',
      'register'               : 'register',
      'settings'               : 'settings',
      'orgs'                   : 'orgs',
      'orgs/:org'              : 'org', //dynamic, for validated user will allow user to manage events, otherwise will show the org and their events
      'orgs/:org/create-event' : 'createEvent', //dynamic
      'orgs/:org/:event'       : 'evnt', //dynamic, for validated user will be manage event page, otherwise will show the event info
      'orgs/:org/:event/email' : 'emailAttendees',
      'dancers/:dancer'        : 'dancer',
      '*404'                   : 'notFound'
    },
    mainChildren: [],

    index: function() {
      _.invoke(this.mainChildren, 'remove');
      $('.container').addClass('index-view');
      this.mainChildren.push(new DanceCard.Views.Index({
        $container: $('main')
      }));
    },
    search: function() {
      _.invoke(this.mainChildren, 'remove');
      $('.container').removeClass('index-view');
      this.mainChildren.push(new DanceCard.Views.Search({
        $container: $('main')
      }));
    },
    searchResults: function(searchTerms) {
      _.invoke(this.mainChildren, 'remove');
      $('.container').removeClass('index-view');
      this.mainChildren.push(new DanceCard.Views.Search({
        $container: $('main'),
        searchTerms: searchTerms
      }));
    },
    login: function() {
      _.invoke(this.mainChildren, 'remove');
      $('.container').removeClass('index-view');
      this.mainChildren.push(new DanceCard.Views.Login({
        $container: $('main')
      }));
    },
    register: function() {
      _.invoke(this.mainChildren, 'remove');
      $('.container').removeClass('index-view');
      this.mainChildren.push(new DanceCard.Views.Register({
        $container: $('main'),
        model: new DanceCard.Models.User()
      }));
    },

    settings: function() {
      _.invoke(this.mainChildren, 'remove');
      $('.container').removeClass('index-view');
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
      $('.container').removeClass('index-view');
      this.mainChildren.push(new DanceCard.Views.NotFound({
        $container: $('main')
      }));
    },
    org: function(org) {
      var self = this;
      _.invoke(this.mainChildren, 'remove');
      $('.container').removeClass('index-view');
      new Parse.Query('User')
        .equalTo('urlId', org)
        .find({
          success: function(org) {
            // org exists
            if (org.length > 0 && org[0].get('organizer')) {
              if (org[0].authenticated()) {
                // current user is the org being viewed
                self.mainChildren.push(new DanceCard.Views.OrgManage({
                  $container: $('main'),
                  model: org[0]
                }));
              } else {
                self.mainChildren.push(new DanceCard.Views.Org({
                  $container: $('main'),
                  model: org[0]
                }));
              }
            } else {
              console.log('user not found');
              self.mainChildren.push(new DanceCard.Views.NotFound({
                $container: $('main')
              }));
            }
          }, error: function() {
            console.log('error retrieving user');
            self.mainChildren.push(new DanceCard.Views.NotFound({
              $container: $('main')
            }));
          }
        });
    },
    createEvent: function(org) {
      _.invoke(this.mainChildren, 'remove');
      $('.container').removeClass('index-view');
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
      $('.container').removeClass('index-view');
      var self = this,
          query = new Parse.Query('Event');
      query.get(evnt)
      .then(function(evt) {
        if (DanceCard.session.get('user')) {
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
        }
      });
    },

    emailAttendees: function(org, evnt) {
      var self = this,
          query = new Parse.Query('Event');
      $('.container').removeClass('index-view');
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
    },

    dancer: function(dancer) {
      var self = this;
      _.invoke(this.mainChildren, 'remove');
      $('.container').removeClass('index-view');
      new Parse.Query('User')
        .equalTo('urlId', dancer)
        .find({
          success: function(dancer) {
            // dancer exists
            if (dancer.length > 0) {
              self.mainChildren.push(new DanceCard.Views.Dancer({
                $container: $('main'),
                model: dancer[0]
              }));
            } else {
              self.mainChildren.push(new DanceCard.Views.NotFound({
                $container: $('main'),
                model: dancer[0]
              }));
            }
          }, error: function() {
            console.log('error retrieving user');
            self.mainChildren.push(new DanceCard.Views.NotFound({
              $container: $('main'),
            }));
          }
        });
    },

    notFound: function() {
      _.invoke(this.mainChildren, 'remove');
      $('.container').removeClass('index-view');
      this.mainChildren.push(new DanceCard.Views.NotFound({
        $container: $('main'),
      }));
    }

  });

})();
