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

this["DanceCard"] = this["DanceCard"] || {};
this["DanceCard"]["templates"] = this["DanceCard"]["templates"] || {};
this["DanceCard"]["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "index template\n<div id=\"map-canvas\"></div>\n";
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
this["DanceCard"]["templates"]["orgs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "orgs template\n";
  },"useData":true});
this["DanceCard"]["templates"]["register"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Register</h2>\n<label name=\"orgName\">Organization Name:</label>\n  <input name=\"orgName\" type=\"text\" class=\"orgName-input\" placeholder=\"Organization Name\">\n<label name=\"email\">Contact Email:</label>\n  <input name=\"email\" type=\"email\" class=\"email-input\" placeholder=\"email\">\n<label name=\"password\">Password:</label>\n  <input type=\"password\" class=\"password-input\" placeholder=\"password\">\n  <input type=\"password\" class=\"verify-password\" placeholder=\"verify password\">\n<input class=\"submit\" type=\"submit\" value=\"create account\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"] = this["DanceCard"]["templates"]["orgs"] || {};
this["DanceCard"]["templates"]["orgs"]["org"] = this["DanceCard"]["templates"]["orgs"]["org"] || {};
this["DanceCard"]["templates"]["orgs"]["org"]["_multiDay"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<label name=\"end-date\">End date</label>\n  <input name=\"end-date\" class=\"event-end-date-input\" type=\"date\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_onetimeList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "  <h3>Your One Time Events</h3>\n";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  You have no one time events.\n  <a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.urlId || (depth0 != null ? depth0.urlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"urlId","hash":{},"data":data}) : helper)))
    + "/create-event\">Click here to add a new event</a>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <li class=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.orgUrlId : stack1), depth0))
    + "-event\">\n    <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.orgUrlId : stack1), depth0))
    + "/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>\n    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.startDate : stack1), depth0))
    + "\n    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.startTime : stack1), depth0))
    + "-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.endTime : stack1), depth0))
    + "\n  </li>\n";
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
this["DanceCard"]["templates"]["orgs"]["org"]["_recurList"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h4><a href=\"#\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a> occurs every "
    + escapeExpression(((helper = (helper = helpers.monthlyRpt || (depth0 != null ? depth0.monthlyRpt : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"monthlyRpt","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.weeklyRptName || (depth0 != null ? depth0.weeklyRptName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weeklyRptName","hash":{},"data":data}) : helper)))
    + "<h4>\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_regReq"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<label name=\"reg-limit\">Registration Limit</label>\n  <input name=\"reg-limit\" class=\"reg-limit-input\" type=\"number\">\n<label name=\"gender-bal\">Lead/Follow Balanced</label>\n  <input type=\"checkbox\" class=\"gender-bal-input\" name=\"gender-bal\">\n";
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
  buffer += "\n<label name=\"name\">Event Name</label>\n  <input name=\"name\" class=\"event-name-input\" type=\"text\">\n\n<label name=\"event-type\">Event Type</label>\n  <select class=\"event-type-input\" name=\"event-type\">\n    <option value=\"contraDance\" selected>Contra Dance</option>\n    <option value=\"advancedContraDance\">Advanced Contra Dance</option>\n    <option value=\"contraWorkshop\">Contra Workshop</option>\n    <option value=\"waltzDance\">Waltz Dance</option>\n    <option value=\"waltzWorkshop\">Waltz Workshop</option>\n    <option value=\"squareDance\">Square Dance</option>\n    <option value=\"danceWeekend\">Dance Weekend</option>\n    <option value=\"callerWorkshop\">Caller Workshop</option>\n  </select>\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.recurring : depth0), {"name":"unless","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n<label name=\"start-time\">Start time</label>\n  <input name=\"start-time\" class=\"event-start-time-input\" type=\"time\">\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.recurring : depth0), {"name":"unless","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n<label name=\"end-time\">End time</label>\n  <input name=\"end-time\" class=\"event-end-time-input\" type=\"time\">\n\n<label name=\"venue-name\">Venue Name</label>\n  <input name=\"venue-name\" class=\"venue-name-input\" type=\"text\" placeholder=\"venue name\">\n<label name=\"address\">Venue Address</label>\n  <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\">\n<label name=\"zipcode\">Venue Zipcode</label>\n  <input name=\"zipcode\" class=\"event-zipcode-input\"type=\"text\" placeholder=\"venue zipcode\">\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.recurring : depth0), {"name":"unless","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n<label name=\"event-price\">Price</label>\n  <input type=\"text\" class=\"price-input\" name=\"event-price\" placeholder=\"price\">\n\n<label name=\"beginner-friendly\">Beginner Friendly</label>\n  <input type=\"checkbox\" class=\"beginner\" name=\"beginner-friendly\">\n\n<label name=\"workshop-included\">Workshop Included</label>\n  <input type=\"checkbox\" class=\"workshop-incl\" name=\"workshop-included\">\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.recurring : depth0), {"name":"unless","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n<label name=\"notes\">Notes</label>\n<textarea name=\"note\" class=\"notes-input\" placeholder=\"notes\"></textarea>\n\n<input type=\"submit\" class=\"submit-event\" value=\"create your event\" disabled>\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["index"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <h2>Hi, "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.orgName : stack1), depth0))
    + "!</h2>\n  <p>Below is a list of your events. Click on any event name to view, add or change the event's info</p>\n  <ul class=\"recurring-event-list\">\n    <h3>Your Recurring Events</h3>\n  </ul>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "  <h2>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.orgName : stack1), depth0))
    + " Events</h2>\n  <ul class=\""
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "-event-list\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.events : depth0), {"name":"each","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </ul>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "      <li class=\""
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "-event\">\n        <a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "/"
    + escapeExpression(((helper = (helper = helpers.urlId || (depth0 != null ? depth0.urlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"urlId","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.startDate : depth0)) != null ? stack1.iso : stack1), depth0))
    + "\n        "
    + escapeExpression(((helper = (helper = helpers.startTime || (depth0 != null ? depth0.startTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"startTime","hash":{},"data":data}) : helper)))
    + "-"
    + escapeExpression(((helper = (helper = helpers.endTime || (depth0 != null ? depth0.endTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"endTime","hash":{},"data":data}) : helper)))
    + "\n      </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.loggedIn : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
(function() {
  'use strict';

  function initializeMap(userLocation, queryResults) {
    var mapOptions = {
      zoom:9,
      center: userLocation
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    _.each(queryResults.models, function(result) {
      var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+
        '<a href="#/orgs/'+
        result.attributes.orgUrlId+'/'+result.attributes.urlId+'">'+
        result.attributes.name + '</a></h1>'+
        '<div id="bodyContent">'+
        '<p>'+ result.attributes.startDate + result.attributes.startTime +'</p>'+
        '<p>'+ result.attributes.venue.fullAddress +'</p>'+
        '</div>'+
        '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      var position = {
        lat: result.attributes.point._latitude,
        lng: result.attributes.point._longitude
        };
      var marker = new google.maps.Marker({
        map: map,
        position: position
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
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

  function addDays(dateObj, numDays) {
   dateObj.setDate(dateObj.getDate() + numDays);
   return dateObj;
  }

  DanceCard.locDateSearchQuery = function(distance, time){
    distance = distance || 25;
    time = time || 7;
    var dateLimit = addDays(new Date(), time);
    var deferred = new $.Deferred();
    var query = new Parse.Query(DanceCard.Models.Event);
    query.greaterThanOrEqualTo('startDate', new Date());
    query.lessThanOrEqualTo('startDate', dateLimit);
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var userLocation = new Parse.GeoPoint({latitude: lat, longitude: lng});
      query.withinMiles('point', userLocation, distance);
      var collection = query.collection();
      collection.fetch()
      .then(function() {
        deferred.resolve(collection);
      });
    });
    return deferred.promise();
  };

})();















//

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
          DanceCard.router.navigate('', {trigger: true});
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
      DanceCard.locDateSearchQuery(25, 10)
      .done(function(collection) {
        DanceCard.renderSearchMap(collection);
      });
    },
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
        recurringCollection.fetch()
        .then(function() {
          _.each(recurringCollection.models, function(event) {
            new DanceCard.Views.RecurringEventListItem({
              $container: $('.recurring-event-list'),
              model: event
            });
          });
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
      //render the recurringe event
      this.$el.html(this.template(this.model.toJSON()));
      //render the children of the recurring event
      var collection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.model.get('orgUrlId'),
        parentEvent: this.model.get('urlId')
      });
      collection.fetch()
      .then(function() {
        new DanceCard.Views.OnetimeEventList({
          $container: self.$el,
          collection: collection
        });
      });
    },
    events: {
      'click a' : 'toggleChildren'
    },
    toggleChildren: function(e) {
      e.preventDefault();
      if (this.$el.children('ul').css('height') === '0px') {
        this.$el.children('ul').css('height', 'auto');
      }
      else {
        this.$el.children('ul').css('height', 0);
      }
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

DanceCard.Views.EventPartial = DanceCard.Views.Base.extend({
  tagName: 'article',
  className: 'org-event',
  template: DanceCard.templates.orgs.org._event,
  render: function() {
    this.$el.html(this.template(this.model));
  }
});

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
      'keyup .event-zipcode-input' : 'getLocation',
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
    getLocation: function() {
      var self = this;
      var address = $('.event-address-input').val();
      var zipcode = $('.event-zipcode-input').val();
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address + ',' + zipcode}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK && address && zipcode.length === 5) {
          $('.submit-event').removeAttr('disabled');
          var lat = results[0].geometry.location.k;
          var lng = results[0].geometry.location.B;
          var point = new Parse.GeoPoint({latitude: lat, longitude: lng});
          self.model.set('point', point);
          self.model.set('venue', {
            addressParts: results[0].address_components,
            fullAddress: results[0].formatted_address,
          });
        }
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
    createRecurringEvent: function() {
      var self = this;
      var name = $('.event-name-input').val();
      var type = $('.event-type-input').val();
      var startTime = $('.event-start-time-input').val();
      var endTime = $('.event-end-time-input').val();
      var venueName = $('.venue-name-input').val();
      var price = $('.price-input').val();
      var beginner = $('.beginner').prop('checked');
      var workshopIncl = $('.workshop-incl').prop('checked');
      var notes = $('.notes-input').val();
      var idName = name.replace(/[^\w\d\s]/g, '');
      var id = idName.split(' ').join('_') + '_recurring_' + this.model.get('weeklyRpt');
      this.model.set({
        urlId: id,
        name: name,
        type: type,
        startTime: startTime,
        endTime: endTime,
        price: price,
        beginnerFrdly: beginner,
        workshopIncl: workshopIncl,
        notes: notes
      });
      this.model.set('venue.name', venueName);
      this.model.save();
      this.setStartDate(this.model)
      .done(function(model, startDate) {
        model.set('startDate', startDate);
        self.buildRecurringEvents(model);
        DanceCard.router.navigate("#/orgs/" + self.model.get('orgUrlId'), {trigger: true});
      });
    },

    buildRecurringEvents: function(model){
      var date = model.get('startDate');
      var firstDate = new Date(model.get('startDate'));
      var arrayOfDates = [firstDate];
      _.times(51, function(n) {
        arrayOfDates.push(date.setDate(date.getDate() + 7));
      });
      arrayOfDates = _.map(arrayOfDates, function(date){
        return new Date(date);
      });
      if (model.get('recurMonthly')) {
        var week = model.get('monthlyRpt');
        if (week === 'first') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            if (date.getDate() <= 7 && date.getDay() + date.getDate() <= 13) {
              return date;
            }
          });
        } else if (week === 'second') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            if (date.getDate() >= 8 && date.getDate() <= 14 && date.getDay() + date.getDate() <= 20) {
              return date;
            }
          });
        } else if (week === 'third') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            if (date.getDate() >= 15 && date.getDate() <= 21 && date.getDay() + date.getDate() <= 27) {
              return date;
            }
          });
        } else if (week === 'fourth') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            if (date.getDate() >= 22 && date.getDate() <= 28 && date.getDay() + date.getDate() <= 34) {
              return date;
            }
          });
        } else if (week === 'last') {
          arrayOfDates = _.filter(arrayOfDates, function(date) {
            var month = date.getMonth();
            date.setDate(date.getDate() + 7);
            if (month !== date.getMonth()) {
              return true;
            }
          });
        }
      }
      _.each(arrayOfDates, function(date) {
        var newEvent = new DanceCard.Models.Event(model);
        var idName = model.get('name').replace(/[^\w\d\s]/g, '');
        var dateString = date.toDateString().split(' ').join('_');
        var id = idName.split(' ').join('_') + '_' + dateString;
        newEvent.set({
          startDate: date,
          endDate: date,
          recurring: false,
          parentEvent: model,
          parentEventUrlId: model.get('urlId'),
          urlId: id
        });
        newEvent.save();
      });
    },

    setStartDate: function(recurEventModel) {
      var deferred = new $.Deferred();
      var startDate = new Date(),
          recurDay = +recurEventModel.get('weeklyRpt'),
          diff;
      if (startDate.getDay() === recurDay) {
        deferred.resolve(recurEventModel, startDate);
      } else {
        if (recurDay - startDate.getDay() > 0) {
          diff = recurDay - startDate.getDay();
          startDate.setDate(startDate.getDate() + diff);
          deferred.resolve(recurEventModel, startDate);
        } else {
          diff = 7 + (recurDay - startDate.getDay());
          startDate.setDate(startDate.getDate() + diff);
          deferred.resolve(recurEventModel, startDate);
        }
      }
      return deferred.promise();
    },

    createOnetimeEvent: function() {
      var name = $('.event-name-input').val();
      var type = $('.event-type-input').val();
      var startDate,
          endDate,
          regLimit,
          genderBal;
      startDate = new Date($('.event-start-date-input').val());
      var dateString = startDate.toDateString().split(' ').join('_');
      var startTime = $('.event-start-time-input').val();
      var endTime = $('.event-end-time-input').val();
      if (this.model.get('multiDay')) {
        endDate = new Date($('.event-end-date-input').val());
      } else {
        endDate = startDate;
      }
      var venueName = $('.venue-name-input').val();
      var bandName = $('.band-name-input').val();
      var musicians = $('.musicians-input').val();
      var caller = $('.caller-input').val();
      var price = $('.price-input').val();
      var beginner = $('.beginner').prop('checked');
      var workshopIncl = $('.workshop-incl').prop('checked');
      var preRegReq = $('.pre-reg-req-input').prop('checked');
      if (preRegReq) {
        regLimit = $('.reg-limit-input').val();
        genderBal = $('.gender-bal-input').prop('checked');
      }
      var notes = $('.notes-input').val();
      var idName = name.replace(/[^\w\d\s]/g, '');
      var id = idName.split(' ').join('_') + '_' + dateString;
      this.model.set({
        urlId: id,
        name: name,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        bandName: bandName,
        musicians: musicians,
        caller: caller,
        price: price,
        beginnerFrdly: beginner,
        workshopIncl: workshopIncl,
        preRegReq: preRegReq,
        notes: notes
      });
      this.model.set('venue.name', venueName);
      if (preRegReq) {
        this.model.set('regInfo', {
          regLimit: regLimit,
          genderBal: genderBal
        });
      }
      this.model.save();
      DanceCard.router.navigate("#/orgs/" + this.model.get('orgUrlId'), {trigger: true});
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
      this.query = new Parse.Query('Event')
        .ascending('startDate')
        .equalTo('orgUrlId', this.orgUrlId)
        .equalTo('recurring', false)
        .equalTo('parentEventUrlId', this.parentEvent)
        .greaterThanOrEqualTo('startDate', yesterday)
        .limit(10);
    },
      model: DanceCard.Models.Event,
  });

})();
