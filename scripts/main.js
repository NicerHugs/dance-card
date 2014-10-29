(function(){
  'use strict';

  window.DanceCard = {};
  DanceCard.Views = {};
  DanceCard.Collections = {};
  DanceCard.Models = {};

  $(document).ready(function() {
    Parse.initialize(
      "dzgQWSDzLlU4zFnfyZbUXjO1iwTPtG6asWXGkzX3",
      "mE1QVpTUAV96SNE4H5SFTVyF32tmQk6ZQY0iJm45");
    DanceCard.router = new DanceCard.Router();
    Parse.history.start();
  });

})();

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

this["DanceCard"] = this["DanceCard"] || {};
this["DanceCard"]["templates"] = this["DanceCard"]["templates"] || {};
this["DanceCard"]["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1>hi!</h1>\n<div id=\"map-canvas\"></div>\n";
  },"useData":true});
(function() {
  'use strict';

  function initializeMap(userLocation, queryResults) {
    var mapOptions = {
      zoom: 8,
      center: userLocation
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    _.each(queryResults, function(result) {
      var position = {
        lat: result.location.latitude,
        lng: result.location.longitude
        };
      var market = new google.maps.Marker({
        map: map,
        position: position
      });
    });
  }

  DanceCard.renderSearchMap = function(queryResults){
    navigator.geolocation.getCurrentPosition(
      function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var userLocation = new google.maps.LatLng(lat, lng);
        initializeMap(userLocation, queryResults);
      },
      function(){
        console.log('the browser didnt support geolocation');
      }
    );
  };

})();

(function(){
  'use strict';

  var geocoder;
  var map;
    function initialize() {
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(-34.397, 150.644);
      var mapOptions = {
        zoom: 8,
        center: latlng
      };
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }

    function codeAddress() {
      var address = document.getElementById("address").value;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          // set the latlong var on the event using this restult
          // below shows the location on the map for the user to confirm it's good.
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }

})();

(function(){
  'use strict';

  DanceCard.Views.App = Parse.View.extend({
      className: 'container',
      initialize: function(options) {
        options = options || {};
        DanceCard.session = new DanceCard.Models.Session();
        $('body').prepend(this.el);
        this.render();
      },
      render: function() {
        this.headerView = new DanceCard.Views.Header({
          $container: this.$el
        });
        this.mainView = new DanceCard.Views.Main({
          $container: this.$el
        });
        this.footerView = new DanceCard.Views.Footer({
          $container: this.$el
        });
      }
    });

})();

(function(){
  'use strict';

  DanceCard.Views.Base = Parse.View.extend({
   initialize: function(options) {
     this.$container = options.$container;
     this.$container.append(this.el);
     this.render();
   }
  });

})();

(function() {
  DanceCard.Views.Footer = DanceCard.Views.Base.extend({
    tagName: 'footer',
  });
})();

(function() {
  DanceCard.Views.Header = DanceCard.Views.Base.extend({
    tagName: 'header',
    render: function() {
      this.$el.append('<h1><a href="#">Contra Dance Card</a></h1>');
      this.navView = new DanceCard.Views.Nav({
        $container: this.$el
      });
    },

    events: {
      'click h1' : 'viewIndex'
    },

    viewIndex: function(e) {
      e.preventDefault();
      DanceCard.router.navigate('/', {trigger: true})
;    }
  });
})();

(function() {
  DanceCard.Views.Login = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'login-form',
    template: _.template($('#login-template').text()),
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit' : 'login'
    },
    login: function(e) {
      e.preventDefault();
      var self = this;
      var email = this.$('.email').val();
      var password = this.$('.password').val();
      Parse.User.logIn(email, password).then(
        function() {
          self.remove();
          if ($('.logout-msg')) {
            $('.logout-msg').remove();
          }
          DanceCard.router.navigate('', {trigger: true});
          DanceCard.session.set('user', Parse.User.current());
        }
      );
    }
  });
})();

(function() {
  DanceCard.Views.Logout = DanceCard.Views.Base.extend({
    className: 'logout-msg',
    template: _.template($('#logout-template').text()),
    render: function() {
      this.$el.html(this.template());
    }
  });
})();

(function() {

  DanceCard.Views.Main = DanceCard.Views.Base.extend({
    tagName: 'main',
  });

})();

(function() {

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    tagName: 'index',
    template: DanceCard.templates.index,
    render: function() {
      this.$el.html(this.template());
      DanceCard.renderSearchMap([
        {location: { latitude: 34.397, longitude: -84.644}},
        {location: { latitude: 34.397, longitude: -83.644}}
      ]);
    },
  });

})();

(function() {

  DanceCard.Views.Nav = Parse.View.extend({
    initialize: function(options) {
      this.$container = options.$container;
      this.$container.append(this.el);
      this.render();
      DanceCard.session.on('change', _.bind(this.render, this));
    },
    tagName: 'nav',
    template: _.template($('#nav-template').text()),
    render: function() {
      this.$el.html(this.template());
    }
  });

})();

(function() {
  DanceCard.Views.Signup = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'signup-form',
    template: _.template($('#signup-template').text()),
    render: function() {
      this.model = new Anypic.Models.User();
      this.$el.html(this.template());
    },
    events: {
      'submit' : 'signup',
      'change input[type=file]' : 'uploadFile'
    },
    uploadFile: function(e){
      var file = $(e.target)[0].files[0];
      var parseFile = new Parse.File(file.name, file);
      var self = this;
      parseFile.save().then(function(){
        self.model.set('profilePic', parseFile.url());
        $('.submit').prop("disabled", false);
      });
    },
    signup: function(e) {
      e.preventDefault();
      var self = this;
      var email = this.$('.email').val();
      var password = this.$('.password').val();
      var attrs = {
        name: this.$('.username').val(),
        image: this.model.get('profilePic')
      };
      Parse.User.signUp(email, password, attrs)
      .then(function(){
        Anypic.session.set('user', Parse.User.current());
        Anypic.router.navigate('', {trigger: true});
        self.remove();
      });
    }
  });
})();

DanceCard.Models.Activity = Parse.Object.extend({
  className: 'activity'
});

DanceCard.Models.Event = Parse.Object.extend({
  className: 'Event'
});

DanceCard.Models.Session = new Parse.Object.extend({
  className: "Session",
  initialize: function(){
    this.set('user', Parse.User.current());
  }
});

DanceCard.Models.User = Parse.Object.extend({
  className: 'User'
});
