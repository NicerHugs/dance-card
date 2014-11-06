(function(){
  'use strict';

  Handlebars.registerHelper('select', function(value, options) {
    var val = '"' + value.split(' ').join('-') + '"',
        re = new RegExp(val, 'g'),
       newStr = options.fn(this).replace(re, val + ' selected');
    return newStr;
  });

  Handlebars.registerHelper('dateForm', function(options) {
    var date = moment(options.fn(this)).format('YYYY-MM-DD');
    return date;
  });

  Handlebars.registerHelper('dateDisplay', function(options) {
    var date = moment(options.fn(this)).format('MMMM Do YYYY');
    return date;
  });

  Handlebars.registerHelper('dateShort', function(options) {
    var date = moment(options.fn(this)).format('MMM DD YYYY');
    return date;
  });

  Handlebars.registerHelper('time', function(options) {
    var time = options.fn(this);
    if (time.slice(0,2) > 12) {
      time = time.slice(0,2)-12 + time.slice(2) + ' pm';
    } else if (time.slice(0,2) < 10) {
      time = time.slice(1,2) + time.slice(2) + ' am';
    } else {
      time = time + ' am';
    }
    return time;
  });

})();

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

(function(){
  'use strict';

  DanceCard.Utility = {

    userLocation: function() {
      var deferred = new $.Deferred();
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude,
            userLocation = {
              lat: lat,
              lng: lng,
              userPoint: new Parse.GeoPoint({
                latitude: lat,
                longitude: lng,
            })
          };
        deferred.resolve(userLocation);
      });
      return deferred.promise();
    },

    addDays: function(dateObj, numDays) {
     dateObj.setDate(dateObj.getDate() + numDays);
     return dateObj;
   },

    findLocation: function(address) {
      var geocoder = new google.maps.Geocoder(),
          deferred = new $.Deferred();
      geocoder.geocode({'address': address}, function(results, status) {
        if (results && results[0]) {
          var lat = results[0].geometry.location.k,
              lng = results[0].geometry.location.B,
              location = {
                addressParts: results[0].address_components,
                fullAddress: results[0].formatted_address,
              },
              point;
          if (lat && lng) {
            point = new Parse.GeoPoint({
              latitude: lat,
              longitude: lng
            });
            deferred.resolve({point: point, location: location});
          }
        }
      });
      return deferred.promise();
    },

    nextDateOfWeek: function(startDate, day) {
      var diff;
      if (startDate.getDay() === day) {
        return startDate;
      } else {
        if (day - startDate.getDay() > 0) {
          diff = day - startDate.getDay();
          startDate.setDate(startDate.getDate() + diff);
          return startDate;
        } else {
          diff = 7 + (day - startDate.getDay());
          startDate.setDate(startDate.getDate() + diff);
          return startDate;
        }
      }
    },

    addYear: function(startDate) {
      var date = new Date(startDate);
      date.setFullYear(date.getFullYear() + 1);
      return date;
    },

    filterByWeekOfMonth: function(dates, week) {
      // var week = this.get('monthlyRpt');
      if (week === 'first') {
        dates = _.filter(dates, function(date) {
          if (date.getDate() <= 7 && date.getDay() + date.getDate() <= 13) {
            return date;
          }
        });
      } else if (week === 'second') {
        dates = _.filter(dates, function(date) {
          if (date.getDate() >= 8 && date.getDate() <= 14 && date.getDay() + date.getDate() <= 20) {
            return date;
          }
        });
      } else if (week === 'third') {
        dates = _.filter(dates, function(date) {
          if (date.getDate() >= 15 && date.getDate() <= 21 && date.getDay() + date.getDate() <= 27) {
            return date;
          }
        });
      } else if (week === 'fourth') {
        dates = _.filter(dates, function(date) {
          if (date.getDate() >= 22 && date.getDate() <= 28 && date.getDay() + date.getDate() <= 34) {
            return date;
          }
        });
      } else if (week === 'last') {
        dates = _.filter(dates, function(date) {
          var month = date.getMonth(),
              nextWeek = new Date(date),
              nextWeekMonth;
          nextWeek.setDate(nextWeek.getDate() + 7);
          nextWeekMonth = nextWeek.getMonth();
          if (month !== nextWeekMonth){
            return date;
          }
        });
      }
      return dates;
    },

    buildWeeklyDateArray: function(start, end) {
      end = end || this.addYear(start);
      var date = new Date(start),
          arrayOfDates = [start],
          msBetween = end - start,
          // there are 86400000 milliseconds in a day
          days = msBetween/86400000,
          weeks = Math.floor(days/7);
      _.times(weeks-1, function(n) {
        arrayOfDates.push(new Date(date.setDate(date.getDate() + 7)));
      });
      return arrayOfDates;
    },

    // this is a crazy convoluted way to destroy all the children of this
    // model. try as i might i couldn't get any of parse's built in functions
    // to work for destroying the items in the collection and ultimately opted
    // to do it manually.
    destroyAll: function(collection) {
      var ids = _.map(collection.models, function(model){
        return model.id;
      });
      _.each(ids, function(id) {
        var query = new Parse.Query('Event');
        query.get(id, {
          success: function(event){
            event.destroy({success: function(){
          },
          error: function(error) {
            console.log('error', error);
          }});
        }});
      });
      return collection;
    }

  };

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

this["DanceCard"] = this["DanceCard"] || {};
this["DanceCard"]["templates"] = this["DanceCard"]["templates"] || {};
this["DanceCard"]["templates"]["_eventList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.location : depth0)) != null ? stack1.location : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "\n";
},"3":function(depth0,helpers,partials,data) {
  return "    you\n";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.searchResults : depth0)) != null ? stack1.startDate : stack1), depth0));
  },"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.searchResults : depth0)) != null ? stack1.endDate : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<h3>\n  Events within "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.searchResults : depth0)) != null ? stack1.distance : stack1), depth0))
    + " miles of\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.location : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</h3>\n\n<h4>Date Range:</h4>\n";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n-\n";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n<h4>Event Type:</h4>\n"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.searchResults : depth0)) != null ? stack1.type : stack1), depth0))
    + "\n";
},"useData":true});
this["DanceCard"]["templates"]["_eventListItem"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.startDate : depth0)) != null ? stack1.iso : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<h5><a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "/"
    + escapeExpression(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"objectId","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a></h5>\n";
  stack1 = ((helper = (helper = helpers.dateDisplay || (depth0 != null ? depth0.dateDisplay : depth0)) != null ? helper : helperMissing),(options={"name":"dateDisplay","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateDisplay) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + " "
    + escapeExpression(((helper = (helper = helpers.startTime || (depth0 != null ? depth0.startTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"startTime","hash":{},"data":data}) : helper)))
    + "\n";
},"useData":true});
this["DanceCard"]["templates"]["_infoWindow"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.startDate : depth0)) != null ? stack1.iso : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, lambda=this.lambda, buffer = "<div id=\"content\">\n  <div id=\"siteNotice\">\n  </div>\n  <h1 id=\"firstHeading\" class=\"firstHeading\">\n  <a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "/"
    + escapeExpression(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"objectId","hash":{},"data":data}) : helper)))
    + "\">\n  "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a></h1>\n  <div id=\"bodyContent\">\n  <p>";
  stack1 = ((helper = (helper = helpers.dateDisplay || (depth0 != null ? depth0.dateDisplay : depth0)) != null ? helper : helperMissing),(options={"name":"dateDisplay","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateDisplay) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + " "
    + escapeExpression(((helper = (helper = helpers.startTime || (depth0 != null ? depth0.startTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"startTime","hash":{},"data":data}) : helper)))
    + "</p>\n  <p>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.venue : depth0)) != null ? stack1.fullAddress : stack1), depth0))
    + "</p>\n  </div>\n</div>\n";
},"useData":true});
this["DanceCard"]["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"searchBox\">\n  <form>\n    <input class=\"search-location\" type=\"text\" placeholder=\"location\">\n    <input class=\"search-distance\" type=\"text\" placeholder=\"within miles\">\n    <input class=\"search-start-date\" type=\"date\">\n    <input class=\"search-end-date\"type=\"date\">\n    <select class=\"search-type\">\n      <option value=\"all\">all</option>\n      <option value=\"contra-dance\">Contra Dance</option>\n      <option value=\"advanced-contra-dance\">Advanced Contra Dance</option>\n      <option value=\"contra-workshop\">Contra Workshop</option>\n      <option value=\"waltz\">Waltz Dance</option>\n      <option value=\"waltz-workshop\">Waltz Workshop</option>\n      <option value=\"square-dance\">Square Dance</option>\n      <option value=\"dance-weekend\">Dance Weekend</option>\n      <option value=\"caller-workshop\">Caller Workshop</option>\n    </select>\n    <input class=\"search-submit\" type=\"submit\">\n</form>\n</div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["login"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Log In</h2>\n<label name=\"email\">Organization Email:</label>\n  <input name=\"email\" type=\"text\" class=\"email-input\" placeholder=\"email\">\n<label name=\"password\">Password:</label>\n  <input name=\"password\" type=\"password\" class=\"password-input\" placeholder=\"password\">\n<input type=\"submit\" value=\"login\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["logout"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<p>You have successfully logged out</p>\n";
  },"useData":true});
this["DanceCard"]["templates"]["nav"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <div class=\"left-nav\">\n    <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "\" class=\"manage\">manage your events</a>\n    <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "/create-event\" class=\"create\">add an event</a>\n  </div>\n  <div class=\"right-nav\">\n    <a href=\"#/logout\" class=\"logout\">logout</a>\n  </div>\n";
},"3":function(depth0,helpers,partials,data) {
  return "  <div class=\"right-nav\">\n    <a href=\"#/login\" class=\"login\">organizer login</a>\n    <a href=\"#/register\" class=\"signup\">register</a>\n  </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.user : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["notFound"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1>Not found <span>:(</span></h1>\n<p>Sorry, but the page you were trying to view does not exist.</p>\n<p>It looks like this was the result of either:</p>\n<ul>\n  <li>a mistyped address</li>\n  <li>an out-of-date link</li>\n</ul>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "orgs template\n";
  },"useData":true});
this["DanceCard"]["templates"]["register"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Register</h2>\n<label name=\"orgName\">Organization Name:</label>\n  <input name=\"orgName\" type=\"text\" class=\"orgName-input\" placeholder=\"Organization Name\">\n<label name=\"email\">Contact Email:</label>\n  <input name=\"email\" type=\"email\" class=\"email-input\" placeholder=\"email\">\n<label name=\"password\">Password:</label>\n  <input type=\"password\" class=\"password-input\" placeholder=\"password\">\n  <input type=\"password\" class=\"verify-password\" placeholder=\"verify password\">\n<input class=\"submit\" type=\"submit\" value=\"create account\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"] = this["DanceCard"]["templates"]["orgs"] || {};
this["DanceCard"]["templates"]["orgs"]["org"] = this["DanceCard"]["templates"]["orgs"]["org"] || {};
this["DanceCard"]["templates"]["orgs"]["org"]["_eventHeader"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "  <div class=\"event-header-editing\">\n    <span><a href=\"#\" class=\"save-event-header\">save changes</a></span>\n    <span><a href=\"#\" class=\"edit-event-header\">cancel</a></span>\n\n    <h2><input value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "\"name=\"name\" class=\"event-name-input\" type=\"text\"></h2>\n\n    <p><label name=\"event-type\">Event Type</label>\n      <select class=\"event-type-input\" name=\"event-type\">\n";
  stack1 = ((helpers.select || (depth0 && depth0.select) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.type : stack1), {"name":"select","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </select></p>\n\n";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"unless","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n    <p><label name=\"start-time\">Start time</label>\n      <input value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startTime : stack1), depth0))
    + "\" name=\"start-time\" class=\"event-start-time-input\" type=\"time\"></p>\n\n    <p><label name=\"end-time\">End time</label>\n      <input value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endTime : stack1), depth0))
    + "\" name=\"end-time\" class=\"event-end-time-input\" type=\"time\"></p>\n\n  </div>\n";
},"2":function(depth0,helpers,partials,data) {
  return "        <option value=\"contra-dance\">Contra Dance</option>\n        <option value=\"advanced-contra-dance\">Advanced Contra Dance</option>\n        <option value=\"contra-workshop\">Contra Workshop</option>\n        <option value=\"waltz\">Waltz Dance</option>\n        <option value=\"waltz-workshop\">Waltz Workshop</option>\n        <option value=\"square-dance\">Square Dance</option>\n        <option value=\"dance-weekend\">Dance Weekend</option>\n        <option value=\"caller-workshop\">Caller Workshop</option>\n";
  },"4":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "        <p>\n          <label name=\"start-date\">Start date</label>\n            <input name=\"start-date\" class=\"event-start-date-input\" type=\"date\" value=";
  stack1 = ((helper = (helper = helpers.dateForm || (depth0 != null ? depth0.dateForm : depth0)) != null ? helper : helperMissing),(options={"name":"dateForm","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateForm) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n        </p>\n        <p><label name=\"multi-day\">Multi-day Event</label>\n          <input name=\"multi-day\" class=\"multi-day-input\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "></p>\n          <div class=\"multi-day\">\n        </div>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"7":function(depth0,helpers,partials,data) {
  return "checked";
  },"9":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "  <span><a href=\"#\" class=\"delete-event\">delete this event</a></span>\n  <div class=\"event-header-viewing\">\n    <span><a href=\"#\" class=\"edit-event-header\">edit</a></span>\n    <h2>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h2>\n      <p>Type: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.type : stack1), depth0))
    + "</p>\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"unless","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <p>Start Time: ";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(18, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "</p>\n      <p>End Time: ";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(20, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n  </div>\n";
},"10":function(depth0,helpers,partials,data) {
  return "<p>This is a multi-day event</p>";
  },"12":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "        <p>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "Date: ";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "</p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"13":function(depth0,helpers,partials,data) {
  return "Start ";
  },"15":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "          <p>End Date: ";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(16, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"16":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startTime : stack1), depth0));
  },"20":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endTime : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.edit : depth0)) != null ? stack1.eventHeader : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(9, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_eventInfo"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <div class=\"event-info-editing\">\n    <span><a href=\"#\" class=\"save-event-info\">save changes</a></span>\n    <span><a href=\"#\" class=\"edit-event-info\">cancel</a></span>\n    <h3>Event Info</h3>\n    <label name=\"event-price\">Price</label>\n      <input type=\"text\" class=\"price-input\" name=\"event-price\" placeholder=\"price\" value="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.price : stack1), depth0))
    + ">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <label name=\"beginner-friendly\">Beginner Friendly</label>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.beginnerFrdly : stack1), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.program(8, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <label name=\"workshop-included\">Workshop Included</label>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.workshopIncl : stack1), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.program(12, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    <label name=\"notes\">Notes</label>\n      <textarea name=\"notes\" class=\"notes-input\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), depth0))
    + "</textarea>\n  </div>\n";
},"2":function(depth0,helpers,partials,data) {
  return "      <p>To edit band and caller info, please edit the individual event</p>\n";
  },"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "      <label name=\"band-name\">Band Name</label>\n        <input type=\"text\" class=\"band-name-input\" name=\"band-name\" placeholder=\"band name\" value="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.band : stack1), depth0))
    + ">\n      <label name=\"musicians\">Musicians</label>\n        <textarea name=\"musicians\" class=\"musicians-input\" rows=\"8\" cols=\"10\" placeholder=\"musicians\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), depth0))
    + "</textarea>\n      <label name=\"caller\">Caller</label>\n        <input type=\"text\" class=\"caller-input\" name=\"caller\" placeholder=\"caller\" value="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), depth0))
    + ">\n";
},"6":function(depth0,helpers,partials,data) {
  return "      <input type=\"checkbox\" class=\"beginner\" name=\"beginner-friendly\" checked>\n";
  },"8":function(depth0,helpers,partials,data) {
  return "      <input type=\"checkbox\" class=\"beginner\" name=\"beginner-friendly\">\n";
  },"10":function(depth0,helpers,partials,data) {
  return "      <input type=\"checkbox\" class=\"workshop-incl\" name=\"workshop-included\" checked>\n";
  },"12":function(depth0,helpers,partials,data) {
  return "      <input type=\"checkbox\" class=\"workshop-incl\" name=\"workshop-included\">\n";
  },"14":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <div class=\"event-info-viewing\">\n    <span><a href=\"#\" class=\"edit-event-info\">edit</a></span>\n    <h3>Event Info</h3>\n    <p>Cost: $"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.price : stack1), depth0))
    + "</p>\n";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"unless","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <p>\n      This "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.type : stack1), depth0))
    + " is\n      ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.beginnerFrdly : stack1), {"name":"unless","hash":{},"fn":this.program(24, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      beginner friendly\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.workshopIncl : stack1), {"name":"if","hash":{},"fn":this.program(26, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    </p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), {"name":"if","hash":{},"fn":this.program(28, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, buffer = "      <p>\n        Band: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.band : stack1), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      </p>\n      <p>\n        Musicians: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), {"name":"if","hash":{},"fn":this.program(20, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      </p>\n      <p>\n        Caller: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), {"name":"if","hash":{},"fn":this.program(22, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n      </p>\n";
},"16":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.band : stack1), depth0));
  },"18":function(depth0,helpers,partials,data) {
  return "TBA";
  },"20":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), depth0));
  },"22":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), depth0));
  },"24":function(depth0,helpers,partials,data) {
  return " NOT ";
  },"26":function(depth0,helpers,partials,data) {
  return " and includes a workshop.";
  },"28":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "      <p>\n        Organizer notes: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), depth0))
    + "\n      </p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.edit : depth0)) != null ? stack1.eventInfo : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(14, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_eventRecur"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, options, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing, buffer = "  <div class=\"event-recur-editing\">\n    <span><a href=\"#\" class=\"save-event-recur\">save changes</a></span>\n    <span><a href=\"#\" class=\"edit-event-recur\">cancel</a></span>\n\n    <h3>Event Schedule</h3>\n    <p>\n      This event occurs once a\n      <input class=\"chooseRpt\" name=\"chooseRpt\" type=\"radio\" value=\"true\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurMonthly : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "><label name=\"chooseRpt\">month</label>\n      <input class=\"chooseRpt\" name=\"chooseRpt\" type=\"radio\" value=\"false\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurMonthly : stack1), {"name":"unless","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "><label name=\"chooseRpt\">week</label>\n    </p>\n    <p>on\n      <div class=\"choose-monthly-rpt\">\n      </div>\n      <select class=\"weekly-option-input\">\n";
  stack1 = ((helpers.select || (depth0 && depth0.select) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.weeklyRpt : stack1), {"name":"select","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </select>\n    </p>\n    <p><label name=\"end-date\">End Date</label>\n      <input name=\"end-date\" class=\"event-end-date-input\" type=\"date\" value=";
  stack1 = ((helper = (helper = helpers.dateForm || (depth0 != null ? depth0.dateForm : depth0)) != null ? helper : helperMissing),(options={"name":"dateForm","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateForm) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "></p>\n  </div>\n\n";
},"2":function(depth0,helpers,partials,data) {
  return " checked";
  },"4":function(depth0,helpers,partials,data) {
  return " checked ";
  },"6":function(depth0,helpers,partials,data) {
  return "        <option value=\"1\">Monday</option>\n        <option value=\"2\">Tuesday</option>\n        <option value=\"3\">Wednesday</option>\n        <option value=\"4\">Thursday</option>\n        <option value=\"5\">Friday</option>\n        <option value=\"6\">Saturday</option>\n        <option value=\"0\">Sunday</option>\n";
  },"8":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"10":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "  <div class=\"event-recur-viewing\">\n    <span><a href=\"#\" class=\"edit-event-recur\">edit</a></span>\n    <h3>Event Schedule</h3>\n    </p>This event repeats every "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.monthlyRpt : stack1), depth0))
    + " "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.weeklyRptName : stack1), depth0))
    + "</p>\n    <p>End Date: ";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.edit : depth0)) != null ? stack1.eventRecur : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(10, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_multiDay"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<label name=\"end-date\">End date</label>\n  <input name=\"end-date\" class=\"event-end-date-input\" type=\"date\" value=";
  stack1 = ((helper = (helper = helpers.dateForm || (depth0 != null ? depth0.dateForm : depth0)) != null ? helper : helperMissing),(options={"name":"dateForm","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateForm) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_onetimeList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "  <h3>Your One Time Events</h3>\n";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  You have no one time events.\n  <a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "/create-event\">Click here to add a new event</a>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "  <li class=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.orgUrlId : stack1), depth0))
    + "-event\">\n    <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.orgUrlId : stack1), depth0))
    + "/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>\n    ";
  stack1 = ((helper = (helper = helpers.dateDisplay || (depth0 != null ? depth0.dateDisplay : depth0)) != null ? helper : helperMissing),(options={"name":"dateDisplay","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateDisplay) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.startTime : stack1), depth0))
    + "-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.endTime : stack1), depth0))
    + "\n  </li>\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.startDate : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.parentEvent : depth0), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.models : depth0), {"name":"unless","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.models : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_recurList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <h4>\n    <a href=\"#\" class=\"recur-event-name\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a> occurs every "
    + escapeExpression(((helper = (helper = helpers.monthlyRpt || (depth0 != null ? depth0.monthlyRpt : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"monthlyRpt","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.weeklyRptName || (depth0 != null ? depth0.weeklyRptName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weeklyRptName","hash":{},"data":data}) : helper)))
    + "\n    <a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "/"
    + escapeExpression(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"objectId","hash":{},"data":data}) : helper)))
    + "\">manage this event</a>\n    <a href=\"#\" class=\"delete-recur\">delete this event</a>\n  </h4>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  You have no recurring events. <a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.urlId || (depth0 != null ? depth0.urlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"urlId","hash":{},"data":data}) : helper)))
    + "/create-event\">Click here to add a new event</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.name : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_regReq"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<label name=\"reg-limit\">Registration Limit</label>\n  <input name=\"reg-limit\" class=\"reg-limit-input\" type=\"number\">\n<label name=\"gender-bal\">Lead/Follow Balanced</label>\n  <input type=\"checkbox\" class=\"gender-bal-input\" name=\"gender-bal\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_saveWarning"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"save-warning\">\n  These changes will also occur on all instances of this recurring event.\n  Previously made changes to any instance of this event may be overwritten.\n  Are you sure you want to continue?\n  <input type=\"button\" class=\"continue-save\" value=\"continue\">\n  <a href='#' class=\"cancel-save\">cancel</a>\n</div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_venueInfo"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <divclass=\"venue-info-editing\">\n      <span><a href=\"#\" class=\"save-venue-info\">save changes</a></span>\n      <span><a href=\"#\" class=\"edit-venue-info\">cancel</a></span>\n      <h3>Venue Info</h3>\n      <label name=\"venue-name\">Venue Name</label>\n        <input name=\"venue-name\" class=\"venue-name-input\" type=\"text\" placeholder=\"venue name\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.name : stack1), depth0))
    + "\">\n      <label name=\"address\">Venue Address</label>\n        <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "\">\n    </div>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <div class=\"venue-info-viewing\">\n    <span><a href=\"#\" class=\"edit-venue-info\">edit</a></span>\n    <h3>Venue Info</h3>\n    <h4>\n      "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.name : stack1), depth0))
    + "\n    </h4>\n    <p>\n      "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "\n    </p>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.edit : depth0)) != null ? stack1.venueInfo : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseMoRpt"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<select name=\"monthlyRpt\" class=\"monthly-option-input\">\n  <option value=\"first\">the first</option>\n  <option value=\"second\">the second</option>\n  <option value=\"third\">the third</option>\n  <option value=\"fourth\">the fourth</option>\n  <option value=\"last\">the last</option>\n</select>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseRecur"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<p>\n  I want to create a\n</p>\n<button class=\"choose-recur\" value=\"onetime\">stand alone event</button>\n<button class=\"choose-recur\" value=\"recur\">weekly or monthly event</button>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseWkMo"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<p>\n  This event occurs:\n</p>\n<button class=\"choose-wk-mo\" value=\"weekly\">Weekly</button>\n<button class=\"choose-wk-mo\" value=\"monthly\">Monthly</button>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseWkRpt"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<select class=\"weekly-option-input\">\n  <option value=\"1\">Monday</option>\n  <option value=\"2\">Tuesday</option>\n  <option value=\"3\">Wednesday</option>\n  <option value=\"4\">Thursday</option>\n  <option value=\"5\">Friday</option>\n  <option value=\"6\">Saturday</option>\n  <option value=\"0\">Sunday</option>\n</select>\n\n<button class=\"choose-rpt\">Continue</button>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["createEvent"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"recurInfo\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.recurMonthly : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  <p>\n    Your event will run for one year by default.\n  </p>\n  <p>\n    You can set bands, callers, musicians, and other special info for each event in this series after the series is created. Need to cancel an event in this series? You can do that all from the \"manage my events\" page.\n  </p>\n</div>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    This event occurs on the "
    + escapeExpression(((helper = (helper = helpers.monthlyRpt || (depth0 != null ? depth0.monthlyRpt : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"monthlyRpt","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.weeklyRptName || (depth0 != null ? depth0.weeklyRptName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weeklyRptName","hash":{},"data":data}) : helper)))
    + " of each month.\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    This event occurs every "
    + escapeExpression(((helper = (helper = helpers.weeklyRptName || (depth0 != null ? depth0.weeklyRptName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weeklyRptName","hash":{},"data":data}) : helper)))
    + ".\n";
},"6":function(depth0,helpers,partials,data) {
  return "  <label name=\"start-date\">Start date</label>\n    <input name=\"start-date\" class=\"event-start-date-input\" type=\"date\">\n";
  },"8":function(depth0,helpers,partials,data) {
  return "  <label name=\"multi-day\">Multi-day Event</label>\n    <input name=\"multi-day\"class=\"multi-day-input\" type=\"checkbox\">\n    <div class=\"multi-day\">\n    </div>\n";
  },"10":function(depth0,helpers,partials,data) {
  return "<label name=\"band-name\">Band Name</label>\n  <input type=\"text\" class=\"band-name-input\" name=\"band-name\" placeholder=\"band name\">\n<label name=\"musicians\">Musicians</label>\n  <textarea name=\"musicians\" class=\"musicians-input\" rows=\"8\" cols=\"10\" placeholder=\"musicians\"></textarea>\n\n<label name=\"caller\">Caller</label>\n  <input type=\"text\" class=\"caller-input\" name=\"caller\" placeholder=\"caller\">\n";
  },"12":function(depth0,helpers,partials,data) {
  return "  <label name=\"pre-reg-req\">Pre-registration required</label>\n    <input type=\"checkbox\" name=\"pre-reg-req\" class=\"pre-reg-req-input\">\n    <div class=\"reg-req\">\n    </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.recurring : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n<label name=\"name\">Event Name</label>\n  <input name=\"name\" class=\"event-name-input\" type=\"text\">\n\n<label name=\"event-type\">Event Type</label>\n  <select class=\"event-type-input\" name=\"event-type\">\n    <option value=\"contra-dance\" selected>Contra Dance</option>\n    <option value=\"advanced-contra-dance\">Advanced Contra Dance</option>\n    <option value=\"contra-workshop\">Contra Workshop</option>\n    <option value=\"waltz\">Waltz Dance</option>\n    <option value=\"waltz-workshop\">Waltz Workshop</option>\n    <option value=\"square-dance\">Square Dance</option>\n    <option value=\"dance-weekend\">Dance Weekend</option>\n    <option value=\"caller-workshop\">Caller Workshop</option>\n  </select>\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.recurring : depth0), {"name":"unless","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n<label name=\"start-time\">Start time</label>\n  <input name=\"start-time\" class=\"event-start-time-input\" type=\"time\">\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.recurring : depth0), {"name":"unless","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n<label name=\"end-time\">End time</label>\n  <input name=\"end-time\" class=\"event-end-time-input\" type=\"time\">\n\n<label name=\"venue-name\">Venue Name</label>\n  <input name=\"venue-name\" class=\"venue-name-input\" type=\"text\" placeholder=\"venue name\">\n<label name=\"address\">Venue Address</label>\n  <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\">\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.recurring : depth0), {"name":"unless","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n<label name=\"event-price\">Price</label>\n  <input type=\"text\" class=\"price-input\" name=\"event-price\" placeholder=\"price\">\n\n<label name=\"beginner-friendly\">Beginner Friendly</label>\n  <input type=\"checkbox\" class=\"beginner\" name=\"beginner-friendly\">\n\n<label name=\"workshop-included\">Workshop Included</label>\n  <input type=\"checkbox\" class=\"workshop-incl\" name=\"workshop-included\">\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.recurring : depth0), {"name":"unless","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n<label name=\"notes\">Notes</label>\n<textarea name=\"note\" class=\"notes-input\" placeholder=\"notes\"></textarea>\n\n<input type=\"submit\" class=\"submit-event\" value=\"create your event\">\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["event"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n\n  <div class=\"event-header\">\n  </div>\n\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  <div class=\"event-info\">\n  </div>\n\n  <div class=\"venue-info\">\n  </div>\n\n";
},"2":function(depth0,helpers,partials,data) {
  return "    <div class=\"event-recur\">\n    </div>\n";
  },"4":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"5":function(depth0,helpers,partials,data) {
  return "  <span>sorry, you don't have permission to manage this event</span>\n\n";
  },"7":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "    <div class=\"event-header-viewing\">\n      <h2>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h2>\n      <p>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.weeklyRptName : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " from\n        ";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(17, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "-";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      </p>\n      <p>by <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.eventOrg : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.eventOrg : depth0)) != null ? stack1.orgName : stack1), depth0))
    + "</a></p>\n    </div>\n\n    <div class=\"event-info-viewing\">\n      <h3>Event Info</h3>\n      <p>Cost: $"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.price : stack1), depth0))
    + "</p>\n      <p>\n        Band: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.band : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      </p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <p>\n        Caller: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      </p>\n      <p>\n        This "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.type : stack1), depth0))
    + " is\n        ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.beginnerFrdly : stack1), {"name":"unless","hash":{},"fn":this.program(29, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n        beginner friendly\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.workshopIncl : stack1), {"name":"if","hash":{},"fn":this.program(31, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      </p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), {"name":"if","hash":{},"fn":this.program(33, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n\n    <div class=\"venue-info-viewing\">\n      <h3>Venue Info</h3>\n      <h4>\n        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.name : stack1), depth0))
    + "\n      </h4>\n      <p>\n        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "\n      </p>\n    </div>\n\n";
},"8":function(depth0,helpers,partials,data) {
  return "From ";
  },"10":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"12":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = " to ";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"15":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " and every "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.weeklyRptName : stack1), depth0));
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startTime : stack1), depth0));
  },"19":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endTime : stack1), depth0));
  },"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.band : stack1), depth0));
  },"23":function(depth0,helpers,partials,data) {
  return "TBA";
  },"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <p>\n          Musicians: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), depth0))
    + "\n        </p>\n";
},"27":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), depth0));
  },"29":function(depth0,helpers,partials,data) {
  return " NOT ";
  },"31":function(depth0,helpers,partials,data) {
  return " and includes a workshop.";
  },"33":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <p>\n          Organizer notes: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), depth0))
    + "\n        </p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.loggedIn : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["index"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <h2>Hi, "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.orgName : stack1), depth0))
    + "!</h2>\n  <p>Below is a list of your events. Click on any event name to view, add or change the event's info</p>\n  <ul class=\"recurring-event-list\">\n    <h3>Your Recurring Events</h3>\n\n  </ul>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <h2>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.orgName : stack1), depth0))
    + " Events</h2>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.events : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(8, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <ul class=\""
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "-event-list\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.events : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ul>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "        <li class=\""
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "-event\">\n          <a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "/"
    + escapeExpression(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"objectId","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n          ";
  stack1 = ((helper = (helper = helpers.dateDisplay || (depth0 != null ? depth0.dateDisplay : depth0)) != null ? helper : helperMissing),(options={"name":"dateDisplay","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateDisplay) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n          "
    + escapeExpression(((helper = (helper = helpers.startTime || (depth0 != null ? depth0.startTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"startTime","hash":{},"data":data}) : helper)))
    + "-"
    + escapeExpression(((helper = (helper = helpers.endTime || (depth0 != null ? depth0.endTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"endTime","hash":{},"data":data}) : helper)))
    + "\n        </li>\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.startDate : depth0)) != null ? stack1.iso : stack1), depth0));
  },"8":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.orgName : stack1), depth0))
    + " has no upcoming events.\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.loggedIn : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
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
      this.options = options;
      this.$container = options.$container;
      this.$container.append(this.el);
      this.children = [];
      this.render();
    },
    remove: function() {
      this.$el.remove();
      this.removeChildren();
      return this;
    },
    removeChildren: function() {
      _.invoke(this.children, 'remove');
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
      this.$el.append('<span>Do you want to dance?</span>');
      this.navView = new DanceCard.Views.Nav({
        $container: this.$el,
        model: DanceCard.session
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
    template: DanceCard.templates.login,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit' : 'login'
    },
    login: function(e) {
      e.preventDefault();
      var self = this;
      var email = this.$('.email-input').val();
      var password = this.$('.password-input').val();
      Parse.User.logIn(email, password).then(
        function() {
          self.remove();
          if ($('.logout-msg')) {
            $('.logout-msg').remove();
          }
          DanceCard.router.navigate('#/orgs/'+ Parse.User.current().get('urlId'), {trigger: true});
          DanceCard.session.set('user', Parse.User.current().toJSON());
        }
      );
    }
  });
})();

(function() {
  'use strict';

  DanceCard.Views.Logout = DanceCard.Views.Base.extend({
    className: 'logout-msg',
    template: DanceCard.templates.logout,
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
  'use strict';

  DanceCard.Views.Index = DanceCard.Views.Base.extend({
    className: 'index',
    template: DanceCard.templates.index,
    render: function() {
      this.$el.html(this.template());
      this.searchResults();
    },
    events: {
      'click .search-submit' : 'searchResults'
    },
    searchResults: function(e) {
      if (e) e.preventDefault();
      var self = this,
          startDate = $('.search-start-date').val() || new Date(),
          endDate = $('.search-end-date').val() || DanceCard.Utility.addDays(new Date(), 6),
          location = $('.search-location').val() || undefined,
          distance = $('.search-distance').val() || 50,
          type = $('.search-type :selected').val().split('-').join(' '),
          collection;

      this.searchCollection = {
            startDate: new Date(startDate),
            endDate: DanceCard.Utility.addDays(new Date(endDate), 1),
            distance: distance,
            type: type
          };
      if (location) {
        DanceCard.Utility.findLocation(location)
        .done(function(location) {
          self.searchCollection.location = location.point;
          collection = new DanceCard.Collections.SearchEventList(self.searchCollection);
          _.invoke(this.children, 'remove');
          self.removeChildren();
          self.makeList(collection, location);
          self.makeMap(collection, location.point);
        });
      } else {
        if (localStorage.getItem('danceCardLoc')) {
          var position = JSON.parse(localStorage.getItem('danceCardLoc'));
          this.userLocSearchResults(position);
        }
        navigator.geolocation.getCurrentPosition(_.bind(this.userLocSearchResults, this));
      }
    },

    userLocSearchResults: function(position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude,
          point = new Parse.GeoPoint(lat, lng),
          collection;
      localStorage.setItem('danceCardLoc', JSON.stringify(position));
      this.searchCollection.location = point;
      collection = new DanceCard.Collections.SearchEventList(this.searchCollection);
      this.removeChildren();
      this.makeList(collection);
      this.makeMap(collection, point);
    },
    makeMap: function(collection, point) {
      var lat = point.latitude,
          lng = point.longitude;
      this.children.push(new DanceCard.Views.MapPartial({
        $container: this.$el,
        zoom: 9,
        loc: {lat: lat, lng: lng},
        collection: collection
      }));
    },
    makeList: function(collection, loc) {
      loc = loc || undefined;
      this.children.push(new DanceCard.Views.EventListPartial({
        $container: this.$el,
        collection: collection,
        searchResults: this.searchCollection,
        location: loc
      }));
    }
  });

})();

(function() {

  DanceCard.Views.Nav = Parse.View.extend({
    initialize: function(options) {
      this.$container = options.$container;
      this.$container.append(this.el);
      this.render();
      this.model.on('change', _.bind(this.render, this));
    },
    tagName: 'nav',
    template: DanceCard.templates.nav,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

})();

(function() {
  DanceCard.Views.Register = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'register-form',
    template: DanceCard.templates.register,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit' : 'register'
    },
    register: function(e) {
      e.preventDefault();
      var self = this;
      var email = this.$('.email-input').val();
      var password = this.$('.password-input').val();
      var orgName = this.$('.orgName-input').val();
      var urlId = orgName.replace(/[^\w\d\s]/g, '').split(' ').join('_');
      var attrs = {
        email: email,
        orgName: orgName,
        urlId: urlId
      };
      Parse.User.signUp(email, password, attrs)
      .then(function(){
        DanceCard.session.set('user', Parse.User.current());
        DanceCard.router.navigate('', {trigger: true});
        self.remove();
        console.log(DanceCard.session.get('user'));
      });
    }
  });
})();

(function() {

  DanceCard.Views.Orgs = DanceCard.Views.Base.extend({
    className: 'orgs',
    render: function() {
      new DanceCard.Views.OrgsIndex({
        $container: this.$el
      });
    },
  });

})();

(function() {

  DanceCard.Views.OrgsIndex = DanceCard.Views.Base.extend({
    className: 'orgs-index',
    template: DanceCard.templates.orgs,
    render: function() {
      this.$el.html(this.template());
    },
  });

})();

(function() {

  DanceCard.Views.Org = DanceCard.Views.Base.extend({
    className: 'org',
    render: function() {
      new DanceCard.Views.OrgIndex({
        $container: this.$el,
        model: this.model
      });
    },
  });

})();

(function() {

  DanceCard.Views.OrgIndex = DanceCard.Views.Base.extend({
    className: 'org-index',
    template: DanceCard.templates.orgs.org.index,
    render: function() {
      var self = this;

      //if the user is logged in and viewing thier own page
      if (Parse.User.current().get('urlId') === this.model.get('urlId')){
        this.$el.html(this.template({
          model: this.model.toJSON(),
          loggedIn: true
        }));
        //render a list of their recurring events, each as its own view
        var recurringCollection = new DanceCard.Collections.RecurringEventList({
          urlId: this.model.get('urlId')
        });
        recurringCollection.fetch({
          success: function() {
            if (recurringCollection.models.length > 0) {
              _.each(recurringCollection.models, function(event) {
                new DanceCard.Views.RecurringEventListItem({
                  $container: $('.recurring-event-list'),
                  model: event.toJSON()
                });
              });
            } else {
              new DanceCard.Views.RecurringEventListItem({
                $container: $('.recurring-event-list'),
                model: {urlId: self.model.get('urlId')}
              });
            }
          },
          fail: function(){
            console.log('fail');
          }
        });
        //render a list of their one time events, all in one view
        var onetimeCollection = new DanceCard.Collections.OnetimeEventList({
          orgUrlId: this.model.get('urlId')
        });
        onetimeCollection.fetch()
        .then(function() {
          new DanceCard.Views.OnetimeEventList({
            $container: self.$el,
            collection: onetimeCollection
          });
        });

      //if the user is not logged in or is viewing another orgs page
      } else {
        //render a list of their next 10 upcoming events
        var collection = new DanceCard.Collections.LoggedOutEventList({
          urlId: this.model.get('urlId')
        });
        collection.fetch()
        .then(function() {
          var events = collection.toJSON();
          self.$el.html(self.template({
            events: events,
            loggedIn: false,
            model: {orgName: self.model.get('orgName')}
          }));
        });
      }
    },
  });

})();

(function(){
  'use strict';

  DanceCard.Views.RecurringEventListItem = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'recurring-event',
    template: DanceCard.templates.orgs.org._recurList,
    render: function() {
      var self = this;
      //render the recurring event
      this.$el.html(this.template(this.model));

      //render the children of the recurring event
      new Parse.Query('Event').get(this.model.objectId, {
        success: function(model) {
          var collection = new DanceCard.Collections.OnetimeEventList({
            orgUrlId: self.model.orgUrlId,
            parentEvent: model
          });
          collection.fetch()
          .then(function() {
            new DanceCard.Views.OnetimeEventList({
              $container: self.$el,
              collection: collection
            });
          });
        }
      });  
    },
    events: {
      'click .recur-event-name' : 'toggleChildren',
      'click .delete-recur'     : 'deleteEvent'
    },
    toggleChildren: function(e) {
      e.preventDefault();
      if (this.$el.children('ul').css('height') === '0px') {
        this.$el.children('ul').css('height', 'auto');
      }
      else {
        this.$el.children('ul').css('height', 0);
      }
    },
    deleteEvent: function(e) {
      e.preventDefault();
      var self = this,
          collection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.model.orgUrlId,
        parentEvent: this.model.urlId
      });
      collection.fetch()
      .then(function(){
        DanceCard.Utility.destroyAll(collection);
      });
      new Parse.Query('Event')
      .get(this.model.objectId, {
        success: function(event) {
          event.destroy();
          self.remove();
        },
        fail: function(error) {
          console.log(error);
        }
      });
    }
  });

})();

(function(){
  'use strict';

  DanceCard.Views.OnetimeEventList = DanceCard.Views.Base.extend({
    tagName: 'ul',
    className: 'onetime-events',
    template: DanceCard.templates.orgs.org._onetimeList,
    render: function() {
      this.$el.html(this.template(this.collection));
    }
  });

})();

(function() {

  DanceCard.Views.CreateEvent = DanceCard.Views.Base.extend({
    tagName: 'form',
    className: 'new-event-form',
    template: DanceCard.templates.orgs.org.chooseRecur,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'click .choose-recur'        : 'chooseRecur',
      'click .choose-wk-mo'        : 'chooseWkMo',
      'click .choose-rpt'          : 'chooseRpt',
      'keyup .event-address-input' : 'getLocation',
      'click .submit-event'        : 'createEvent',
      'click .pre-reg-req-input'   : 'regReq',
      'click .multi-day-input'     : 'multiDay'
    },

    multiDay: function() {
      if (this.model.get('multiDay')) {
        this.model.set('multiDay', false);
        $('.multi-day').html('');
      } else {
        this.model.set('multiDay', true);
        $('.multi-day').html(DanceCard.templates.orgs.org._multiDay);
      }
    },

    regReq: function() {
      if (this.model.get('regReq')) {
        this.model.set('regReq', false);
        $('.reg-req').html('');
      } else {
        this.model.set('regReq', true);
        $('.reg-req').html(DanceCard.templates.orgs.org._regReq);
      }
    },

    chooseRecur: function(e) {
      e.preventDefault();
      if ($(e.target).val() === 'onetime') {
        this.model.set('recurring', false);
        this.model.set('multiDay', false);
        this.$el.html(DanceCard.templates.orgs.org.createEvent(this.model.toJSON()));
      } else {
        this.model.set('recurring', true);
        this.model.set('multiDay', false);
        this.$el.html(DanceCard.templates.orgs.org.chooseWkMo);
      }
    },

    chooseWkMo: function(e) {
      e.preventDefault();
      if ($(e.target).val() === 'weekly') {
        this.model.set('recurMonthly', false);
        this.$el.append('On');
        this.$el.append(DanceCard.templates.orgs.org.chooseWkRpt);
      } else {
        this.model.set('recurMonthly', true);
        this.$el.append('On');
        this.$el.append(DanceCard.templates.orgs.org.chooseMoRpt);
        this.$el.append(DanceCard.templates.orgs.org.chooseWkRpt);
      }
    },

    chooseRpt: function(e) {
      e.preventDefault();
      var weeklyRpt = $('.weekly-option-input').val();
      var weeklyRptName = $('.weekly-option-input option:selected').text();
      var monthlyRpt = $('.monthly-option-input').val() || null;
      this.model.set({weeklyRpt: weeklyRpt, weeklyRptName: weeklyRptName});
      if (monthlyRpt) {
        this.model.set('monthlyRpt', monthlyRpt);
      }
      this.$el.html(DanceCard.templates.orgs.org.createEvent(this.model.toJSON()));
    },

    getLocation: function(e) {
      var self = this,
          address = $('.event-address-input').val();
      DanceCard.Utility.findLocation(address)
      .done(function(location) {
        var attrs = { name: name,
                      fullAddress: location.location.fullAddress,
                      addressParts: location.location.addressParts
                    },
            point = location.point;

        self.model.set({venue: attrs, point: point});
      });
    },

    createEvent: function(e) {
      e.preventDefault();
      if (this.model.get('recurring')){
        this.createRecurringEvent();
      } else {
        this.createOnetimeEvent();
      }
    },

    validateEvent: function() {
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      if (!this.model.get('name')) {
        $('label[name="name"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('event name required');
        $('.event-name-input').addClass('invalid').focus();
        return false;
      } else if (!this.model.get('recurring') && !this.model.get('startDate')) {
        $('label[name="start-date"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('start date is required');
        $('.event-start-date-input').addClass('invalid').focus();
        return false;
      } else if (this.model.get('startDate') < new Date()){
        $('label[name="start-date"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('start date must be after today');
        $('.event-start-date-input').addClass('invalid').focus();
        return false;
      } else if (!this.model.get('startTime')) {
        $('label[name="start-time"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('start time is required');
        $('.event-start-time-input').addClass('invalid').focus();
        return false;
      } else if (!this.model.get('endTime')) {
        $('label[name="end-time"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('end time is required');
        $('.event-end-time-input').addClass('invalid').focus();
        return false;
      } else if (!this.model.get('venue')) {
        $('label[name="address"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('venue address is required');
        $('.event-address-input').addClass('invalid').focus();
        return false;
      } else {
        return true;
      }
    },

    createRecurringEvent: function() {
      var self = this,
          name = $('.event-name-input').val(),
          type = $('.event-type-input').val().split('-').join(' '),
          startTime = $('.event-start-time-input').val(),
          endTime = $('.event-end-time-input').val(),
          venueName = $('.venue-name-input').val(),
          price = $('.price-input').val(),
          beginner = $('.beginner').prop('checked'),
          workshopIncl = $('.workshop-incl').prop('checked'),
          notes = $('.notes-input').val(),
          day = this.model.get('weeklyRpt'),
          startDate = DanceCard.Utility.nextDateOfWeek(new Date(), day),
          endDate = DanceCard.Utility.addYear(startDate);
      this.model.set({
        name: name,
        type: type,
        startTime: startTime,
        endTime: endTime,
        price: price,
        beginnerFrdly: beginner,
        workshopIncl: workshopIncl,
        notes: notes,
        startDate: startDate,
        endDate: endDate
      });
      if ($('.event-address-input').val()) {
        this.model.set('venue', {
          name: venueName,
          addressParts: this.model.attributes.venue.addressParts,
          fullAddress: this.model.attributes.venue.fullAddress,
          zipcode: this.model.attributes.venue.zipcode
        });
      }
      if (this.validateEvent()) {
        this.model.save(null, {
          success: function() {
            self.model.createChildren(self.model);
            self.remove();
            DanceCard.router.navigate("#/orgs/" + self.model.get('orgUrlId'), {trigger: true});
          },
          error: function() {
            console.log('error saving the event', arguments[1]);
          }
        });
      }
    },

    createOnetimeEvent: function() {
      var self= this,
          name = $('.event-name-input').val(),
          type = $('.event-type-input').val().split('-').join(' '),
          startDate,
          startTime = $('.event-start-time-input').val(),
          endTime = $('.event-end-time-input').val(),
          venueName = $('.venue-name-input').val(),
          bandName = $('.band-name-input').val(),
          musicians = $('.musicians-input').val(),
          caller = $('.caller-input').val(),
          price = $('.price-input').val(),
          beginner = $('.beginner').prop('checked'),
          workshopIncl = $('.workshop-incl').prop('checked'),
          preRegReq = $('.pre-reg-req-input').prop('checked'),
          notes = $('.notes-input').val(),
          endDate,
          regLimit,
          genderBal;
      if ($('.event-start-date-input').val()) {
        startDate = new Date(moment($('.event-start-date-input').val()).format());
      }
      if (this.model.get('multiDay')) {
        endDate = new Date(moment($('.event-end-date-input').val()).format());
      } else {
        endDate = new Date(moment(startDate).format());
      }
      if (preRegReq) {
        regLimit = $('.reg-limit-input').val();
        genderBal = $('.gender-bal-input').prop('checked');
      }
      this.model.set({
        name: name,
        type: type,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        band: bandName,
        musicians: musicians,
        caller: caller,
        price: price,
        beginnerFrdly: beginner,
        workshopIncl: workshopIncl,
        preRegReq: preRegReq,
        notes: notes
      });
      if ($('.event-address-input').val()) {
        this.model.set('venue', {
          name: venueName,
          addressParts: this.model.attributes.venue.addressParts,
          fullAddress: this.model.attributes.venue.fullAddress,
          zipcode: this.model.attributes.venue.zipcode
        });
      }
      if (preRegReq) {
        this.model.set('regInfo', {
          regLimit: regLimit,
          genderBal: genderBal
        });
      }
      if (this.validateEvent()) {
        this.model.save(null, {
          success: function() {
            self.remove();
            DanceCard.router.navigate("#/orgs/" + self.model.get('orgUrlId'), {trigger: true});
          },
          error: function() {
            console.log('error saving the event', arguments[1]);
          }
        });
      }
    }
  });

})();

(function(){
  'use strict';

  DanceCard.Views.Event = DanceCard.Views.Base.extend({
    className: 'event',
    template: DanceCard.templates.orgs.org.event,
    render: function() {
      var loggedIn;
      if (DanceCard.session.get('user')) {
        loggedIn = (this.model.get('orgUrlId') === DanceCard.session.get('user').urlId);
      } else {
        loggedIn = false;
      }
      this.templateData = {
                          edit: {},
                          event: this.model.toJSON(),
                          loggedIn: loggedIn,
                          eventOrg: DanceCard.session.get('user')
                          };
      this.$el.html(this.template(this.templateData)
      );
      if (loggedIn) {
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.templateData));
        if (this.model.get('recurring')) {
          $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.templateData));
        }
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.templateData));
        if (this.model.get('recurMonthly')) {
          $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.model.templateData));
        }
      }
      this.makeMap();
    },

    events: {
      'click .edit-event-header' : 'editEventHeader',
      'click .edit-event-recur'  : 'editEventRecur',
      'click .edit-event-info'   : 'editEventInfo',
      'click .edit-venue-info'   : 'editVenueInfo',
      'click .save-event-header' : 'saveEventHeader',
      'click .save-event-recur'  : 'saveEventRecur',
      'click .save-event-info'   : 'saveEventInfo',
      'click .save-venue-info'   : 'saveVenueInfo',
      'click .multi-day-input'   : 'multiDay',
      'click .chooseRpt'         : 'chooseRpt',
      'click .delete-event'      : 'deleteEvent'
    },

    makeMap: function() {
      var lat = this.model.get('point').latitude,
          lng = this.model.get('point').longitude;
      this.children.push(new DanceCard.Views.MapPartial({
        $container: $('.venue-info-viewing'),
        zoom: 13,
        loc: {lat: lat, lng: lng},
        model: this.model
      }));
    },

    alertRecurWarning: function() {
      var def = new $.Deferred();
      $('main').append(DanceCard.templates.orgs.org._saveWarning());
      $('.save-warning').on('click', '.continue-save', function(e) {
        e.preventDefault();
        $('.save-warning').remove();
        def.resolve();
      });
      $('.save-warning').on('click', '.cancel-save', function(e) {
        e.preventDefault();
        $('.save-warning').remove();
        def.reject();
      });
      return def.promise();
    },

    deleteEvent: function(e) {
      e.preventDefault();
      var self = this;
      this.model.destroy({
        success: function() {
          DanceCard.router.navigate('#/orgs/' + self.model.get('orgUrlId'));
          self.remove();
        },
        fail: function() {
          console.log('failed to destroy the event');
        }
      });
    },
    editEventHeader: function(e) {
      if (e) e.preventDefault();
      if (this.templateData.edit.eventHeader) {
        this.templateData.edit.eventHeader = false;
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.templateData));
      } else {
        this.templateData.edit.eventHeader = true;
        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.templateData));
        if (this.model.get('multiDay')) {
          $('.multi-day').html(DanceCard.templates.orgs.org._multiDay(this.templateData));
        }
      }
    },
    editEventRecur: function(e) {
      if (e) e.preventDefault();
      if (this.templateData.edit.eventRecur) {
        this.templateData.edit.eventRecur = false;
        $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.templateData));
      } else {
        this.templateData.edit.eventRecur = true;
        $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.templateData));
        if (this.model.get('recurMonthly')) {
          $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.templateData));
        }
      }
    },
    editEventInfo: function(e) {
      if (e) e.preventDefault();
      if (this.templateData.edit.eventInfo) {
        this.templateData.edit.eventInfo = false;
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
      } else {
        this.templateData.edit.eventInfo = true;
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
      }
    },
    editVenueInfo: function(e) {
      if (e) e.preventDefault();
      if (this.templateData.edit.venueInfo) {
        this.templateData.edit.venueInfo = false;
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.templateData));
      } else {
        this.templateData.edit.venueInfo = true;
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.templateData));
      }
    },

    saveEventHeader: function(e) {
      e.preventDefault();
      var self = this,
          attrs = this.setEventHeader();
      if (this.model.get('recurring')) {
        this.alertRecurWarning()
        .done(function(){
          self.model.saveHeader(attrs.attrs, attrs.dateAttrs)
          .then(_.bind(self.resetAfterSaveHeader, self));
        })
        .fail(_.bind(self.editEventHeader, self));
      } else {
        self.model.saveHeader(attrs.attrs, attrs.dateAttrs)
        .then(_.bind(self.resetAfterSaveHeader, self));
      }
    },

    setEventHeader: function() {
      var self = this,
          attrs = {
                    name: $('.event-name-input').val(),
                    type: $('.event-type-input').val().split('-').join(' '),
                    startTime: $('.event-start-time-input').val(),
                    endTime: $('.event-end-time-input').val()
                  },
          dateAttrs = {};
      if ($('.event-start-date-input').val()) {
        dateAttrs.startDate = new Date(moment($('.event-start-date-input').val()).format());
      }
      if ($('.multi-day-input').prop('checked')) {
        dateAttrs.endDate = new Date(moment($('.event-end-date-input').val()).format());
        dateAttrs.multiDay = $('.multi-day-input').prop('checked');
      } else {
        dateAttrs.endDate = dateAttrs.startDate;
      }
      return {attrs: attrs, dateAttrs: dateAttrs};
    },

    resetAfterSaveHeader: function(model) {
      this.model = model;
      this.templateData.event = this.model.toJSON();
      this.templateData.edit.eventHeader = false;
      $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(this.templateData));
    },

    saveEventRecur: function(e) {
      e.preventDefault();
      var self = this;
      var attrs = this.setEventRecur();
      this.model.saveRecur(attrs.attrs, attrs.dateAttrs)
      .then(_.bind(this.resetAfterSaveEventRecur, this));
    },

    setEventRecur: function() {
      var self = this,
          attrs = {
                    weeklyRpt: $('.weekly-option-input').val(),
                    weeklyRptName: $('.weekly-option-input :selected').text(),
                    monthlyRpt: $('.monthly-option-input').val()
                  },
          dateAttrs = {
                    endDate: new Date(moment($('.event-end-date-input').val()).format())
                  };
      if ($('.chooseRpt:checked').val() === "true") {
        attrs.recurMonthly = true;
      } else {
        attrs.recurMonthly = false;
      }
      return {attrs: attrs, dateAttrs: dateAttrs};
    },

    resetAfterSaveEventRecur: function(model) {
      this.model = model;
      this.templateData.event = this.model.toJSON();
      this.templateData.edit.eventRecur = false;
      $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(this.templateData));
    },

    saveEventInfo: function(e) {
      e.preventDefault();
      var self = this;
      var attrs = this.setEventInfo();
      if (this.model.get('recurring')) {
        this.alertRecurWarning()
        .done(function(){
          self.model.saveInfo(attrs)
          .then(_.bind(self.resetAfterSaveEventInfo, self));
        })
        .fail(_.bind(self.editEventInfo, self));
      } else {
        self.model.saveInfo(attrs)
        .then(_.bind(self.resetAfterSaveEventInfo, self));
      }
    },

    setEventInfo: function() {
      var self = this,
        attrs = {
          price: $('.price-input').val(),
          band: $('.band-name-input').val() || 'TBA',
          musicians: $('.musicians-input').val(),
          caller: $('.caller-input').val() || 'TBA',
          beginnerFrdly: $('.beginner').prop('checked'),
          workshopIncl: $('.workshop-incl').prop('checked'),
          notes: $('.notes-input').val()
        };
      return attrs;
    },

    resetAfterSaveEventInfo: function(model) {
      this.model = model;
      this.templateData.event = this.model.toJSON();
      this.templateData.edit.eventInfo = false;
      $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(this.templateData));
    },

    saveVenueInfo: function(e) {
      e.preventDefault();
      var self = this;
      var attrs = this.setVenueInfo();
      if (this.model.get('recurring')) {
        this.alertRecurWarning()
        .done(function(){
          self.model.saveVenue(attrs, self);
        })
        .fail(_.bind(self.editVenueInfo, self));
      } else {
        self.model.saveVenue(attrs, self);
      }
    },

    setVenueInfo: function() {
      var attrs = {
        address: $('.event-address-input').val(),
        name: $('.venue-name-input').val()
      };
      return attrs;
    },

    resetAfterSaveVenueInfo: function(model) {
      this.model= model;
      this.templateData.event = this.model.toJSON();
      this.templateData.edit.venueInfo = false;
      $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(this.templateData));
    },

    multiDay: function() {
      if (this.model.get('multiDay')) {
        this.model.set('multiDay', false);
        this.templateData.event = this.model.toJSON();
        $('.multi-day').html('');
      } else {
        this.model.set('multiDay', true);
        this.templateData.event = this.model.toJSON();
        $('.multi-day').html(DanceCard.templates.orgs.org._multiDay(this.templateData));
      }
    },

    chooseRpt: function() {
      if ($('.chooseRpt:checked').val() === "true") {
        $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.templateData));
      } else {
        $('.choose-monthly-rpt').html('');
      }
    }
  });

})();

(function() {
  'use strict';

  DanceCard.Views.MapPartial = DanceCard.Views.Base.extend({
    id: 'map-canvas',
    render: function() {
      var self = this;
      this.zoomArray = [];
      this.map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: this.options.zoom,
        center: this.options.loc
      });
      if (this.collection) {
        this.collection.fetch()
        .then(function() {
          if (self.collection.models.length > 0) {
            self.renderChildren(self.collection);
            var bounds = new google.maps.LatLngBounds();
            _.each(self.zoomArray, function(bound) {
              bounds.extend(bound);
            });
            self.map.fitBounds(bounds);
          }  
        });
      } else if (this.model) {
        self.children.push(new DanceCard.Views.MarkerPartial({
          $container: self.$el,
          model: self.model,
          map: self.map,
          bounds: this.zoomArray
        }));
      }
    },

    renderChildren: function(collection) {
      var self = this;
      _.each(collection.models, function(model) {
        self.children.push(new DanceCard.Views.MarkerPartial({
          $container: self.$el,
          model: model,
          map: self.map,
          bounds: self.zoomArray
        }));
      });
    },

  });

})();

(function() {
  'use strict';

  DanceCard.Views.MarkerPartial = DanceCard.Views.Base.extend({
    render: function() {
      var self = this,
          position = new google.maps.LatLng(this.model.get('point')._latitude, this.model.get('point')._longitude),
          color = this.setColor(this.model),
          image= "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color;
      this.infowindow = new google.maps.InfoWindow({
        content: DanceCard.templates._infoWindow(this.model.toJSON())
      });
      this.marker = new google.maps.Marker({
        map: this.options.map,
        position: position,
        icon: image
      });
      google.maps.event.addListener(this.marker, 'click', function() {
        self.infowindow.open(self.options.map, self.marker);
      });
      this.options.bounds.push(position);
    },

    setColor: function(model) {
      var iconColors = {
        a: ['contra dance', '00A79D'],
        b: ['caller workshop', '21409A'],
        c: ['dance weekend', '61D515'],
        d: ['square dance', '00ACEF'],
        e: ['waltz workshop', '9079DB'],
        f: ['waltz', 'F36523'],
        g: ['contra workshop', 'FFDE17'],
        h: ['advanced contra dance', 'FF0A81']
      },
      color = _.filter(iconColors, function(color) {
        if (model.get('type') === color[0]){
          return color;
        }
      })[0][1];
      return color;
    }

  });

})();

(function() {
  'use strict';

  DanceCard.Views.EventListPartial = DanceCard.Views.Base.extend({
    className: 'search-results-list',
    template: DanceCard.templates._eventList,
    render: function() {
      this.$el.html(this.template({
        location: this.options.location,
        searchResults: this.options.searchResults
      }));
      this.renderChildren();
    },
    renderChildren: function() {
      var self = this;
      this.collection.fetch()
      .then(function(){
        _.each(self.collection.models, function(child){
          self.children.push(new DanceCard.Views.EventListItemPartial({
            $container: self.$el,
            model: child
          }));
        });
      });
    }
  });

})();

(function() {
  'use strict';

  DanceCard.Views.EventListItemPartial = DanceCard.Views.Base.extend({
    tagName: 'li',
    className: 'search-result',
    template: DanceCard.templates._eventListItem,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

})();

(function() {

  DanceCard.Views.NotFound = DanceCard.Views.Base.extend({
    className: '404',
    template: DanceCard.templates.notFound,
    render: function() {
      this.$el.append(this.template());
    }
  });

})();

DanceCard.Models.Activity = Parse.Object.extend({
  className: 'activity'
});

DanceCard.Models.Event = Parse.Object.extend({
  className: 'Event',

  createChildren: function(parent, startDate) {
    var week = parent.get('monthlyRpt'),
        endDate = parent.get('endDate'),
        dates;
    startDate = startDate || parent.get('startDate');
    dates = DanceCard.Utility.buildWeeklyDateArray(startDate, endDate);
    if (parent.get('recurMonthly')) {
      dates = DanceCard.Utility.filterByWeekOfMonth(dates, week);
    }
    _.each(dates, function(date) {
      var newEvent = new DanceCard.Models.Event(parent);
      newEvent.set({
        startDate: date,
        endDate: date,
        recurring: false,
        parentEvent: parent,
        parentEventUrlId: parent.get('urlId'),
      });
      newEvent.save();
    });
  },

  saveHeader: function(attrs, dateAttrs) {
    this.set(attrs);
    if (dateAttrs.startDate) {
      this.set(dateAttrs);
    }
    if (this.get('recurring')) {
      var collection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.get('orgUrlId'),
        parentEvent: this,
        limit: 1000
      });
      collection.fetch()
      .then(function() {
        _.each(collection.models, function(event) {
          event.set(attrs);
          event.save();
        });
      });
    }
    return this.save();
  },

  saveRecur: function(attrs, dateAttrs) {
    var self = this,
        endDate = dateAttrs.endDate,
        day = attrs.weeklyRpt,
        oldAttrs = {
                      weeklyRpt: this.get('weeklyRpt'),
                      weeklyRptName: this.get('weeklyRptName'),
                      recurMonthly: this.get('recurMonthly'),
                      monthlyRpt: this.get('monthlyRpt'),
                    },
        parentUrlId = this.get('urlId'),
        recurMonthly;
    if ($('.chooseRpt:checked').val() === "true") {
      recurMonthly = true;
    } else {
      recurMonthly = false;
    }
    var collection = new DanceCard.Collections.OnetimeEventList({
      orgUrlId: this.get('orgUrlId'),
      parentEvent: this,
      limit: 1000
    });
    collection.fetch()
    .then(function(){
      if (_.isEqual(oldAttrs, attrs)) {
        // if only the end date changes, add new children until new endDate
        var maxDate = _.max(collection.models, function(model){
           return model.get('startDate');
        });
        if (maxDate.get('startDate') < endDate) {
          // for a later end date, build new events
          startDate = new Date(maxDate.get('startDate'));
          startDate.setDate(startDate.getDate()+1);
          startDate = DanceCard.Utility.nextDateOfWeek(startDate, attrs.weeklyRpt);
          attrs.endDate = endDate;
          self.set(attrs);
          self.createChildren(self, startDate);
        } else {
          // for an earlier end date, destroy events beyond end date
          var cancelledEvents = {};
          cancelledEvents.models = _.filter(collection.models, function(event) {
            if (event.get('startDate') > endDate) {
              return event;
            }
          });
          DanceCard.Utility.destroyAll(cancelledEvents);
        }
      } else {
        // if anything other than end date changed, delete all children, and build all new children.
        attrs.startDate = DanceCard.Utility.nextDateOfWeek(new Date(), day);
        attrs.endDate = endDate;
        self.set(attrs);
        DanceCard.Utility.destroyAll(collection);
        self.createChildren(self);
      }
    });
    return this.save(attrs);
  },

  saveInfo: function(attrs) {
    this.set(attrs);
    if (this.get('recurring')) {
      var collection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.get('orgUrlId'),
        parentEvent: this,
        limit: 1000
      });
      collection.fetch()
      .then(function() {
        _.each(collection.models, function(event) {
          event.set(attrs);
          event.save();
        });
      });
    }
    return this.save();
  },

  saveVenue: function(attrs, view) {
    var self = this;
    DanceCard.Utility.findLocation(attrs.address)
    .done(function(location) {
      var locAttrs = {
                      name: attrs.name,
                      fullAddress: location.location.fullAddress,
                      addressParts: location.location.addressParts
                    },
          point = location.point;
      self.set({
        venue: locAttrs,
        point: point
      });
      if (self.get('recurring')) {
        var collection = new DanceCard.Collections.OnetimeEventList({
          orgUrlId: self.get('orgUrlId'),
          parentEvent: self,
          limit: 1000
        });
        collection.fetch()
        .then(function() {
          _.each(collection.models, function(event) {
            event.set({
              venue: locAttrs,
              point: point
              });
            event.save();
          });
        });
      }
      self.save()
      .then(_.bind(view.resetAfterSaveVenueInfo, view));
    });
  }
});

DanceCard.Models.Session = new Parse.Object.extend({
  className: "Session",
  initialize: function(){
    if (Parse.User.current()) {
      this.set('user', Parse.User.current().toJSON());
    } else {
      this.set('user', Parse.User.current());
    }
  }
});

DanceCard.Models.User = Parse.Object.extend({
  className: 'User',
  loggedIn: function() {
    if (DanceCard.session.get('user')){
      return true;
    } else {
      return false;
    }
  },
});

(function() {
	'use strict';

	DanceCard.Collections.LoggedOutEventList = Parse.Collection.extend({
		initialize: function(options){
			this.orgUrlId = options.urlId;
			var yesterday = new Date();
			yesterday.setDate(yesterday.getDate()-1);
			this.query = new Parse.Query('Event')
				.ascending('startDate')
				.equalTo('orgUrlId', this.orgUrlId)
				.equalTo('recurring', false)
				.greaterThan('startDate', yesterday)
				.limit(10);
		},
		model: DanceCard.Models.Event,
	});

})();

(function() {
  'use strict';

  DanceCard.Collections.RecurringEventList = Parse.Collection.extend({
    initialize: function(options){
      this.orgUrlId = options.urlId;
      this.query = new Parse.Query('Event')
        .equalTo('orgUrlId', this.orgUrlId)
        .equalTo('recurring', true)
        .limit(10);
    },
      model: DanceCard.Models.Event,
  });

})();

(function() {
  'use strict';

  DanceCard.Collections.OnetimeEventList = Parse.Collection.extend({
    initialize: function(options){
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1);
      this.orgUrlId = options.orgUrlId;
      this.parentEvent = options.parentEvent || undefined;
      this.limit = options.limit || 10;
      this.query = new Parse.Query('Event')
        .ascending('startDate')
        .equalTo('orgUrlId', this.orgUrlId)
        .equalTo('recurring', false)
        .equalTo('parentEvent', this.parentEvent)
        .greaterThanOrEqualTo('startDate', yesterday)
        .limit(this.limit);
    },
      model: DanceCard.Models.Event,
  });

})();

(function() {
	'use strict';

	DanceCard.Collections.currentEvent = Parse.Collection.extend({
		initialize: function(options){
			this.urlId = options.urlId;
			this.query = new Parse.Query('Event')
				.equalTo('urlId', this.urlId)
		},
		model: DanceCard.Models.Event,
	});

})();

(function() {
  'use strict';

  DanceCard.Collections.SearchEventList = Parse.Collection.extend({
    initialize: function(options){
      this.query = new Parse.Query('Event')
        .greaterThanOrEqualTo('startDate', options.startDate)
        .lessThanOrEqualTo('endDate', options.endDate)
        .withinMiles('point', options.location, options.distance);
        if (options.type !== "all") {
          this.query.equalTo('type', options.type);
        }
    },
    model: DanceCard.Models.Event,
  });

})();
