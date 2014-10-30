this["DanceCard"] = this["DanceCard"] || {};
this["DanceCard"]["templates"] = this["DanceCard"]["templates"] || {};
this["DanceCard"]["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "index template\n<div id=\"map-canvas\"></div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["nav"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "  <div class=\"left-nav\">\n    <a href=\"#/orgs/org\" class=\"manage\">manage your events</a>\n    <a href=\"#/orgs/org/create\" class=\"create\">add an event</a>\n  </div>\n  <div class=\"right-nav\">\n    <a href=\"#/logout\" class=\"logout\">logout</a>\n  </div>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "  <div class=\"right-nav\">\n    <a href=\"#/login\" class=\"login\">login</a>\n    <a href=\"#/register\" class=\"signup\">register</a>\n  </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.Parse : depth0)) != null ? stack1.User : stack1)) != null ? stack1.current : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "orgs template\n";
  },"useData":true});
this["DanceCard"]["templates"]["signup"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Sign Up</h2>\n<label name=\"orgName\">Organization Name:</label>\n  <input name=\"orgName\" type=\"text\" class=\"orgName-input\" placeholder=\"Organization Name\">\n<label name=\"email\">Contact Email:</label>\n  <input name=\"email\" type=\"email\" class=\"email-input\" placeholder=\"email\">\n<label name=\"password\">Password:</label>\n  <input type=\"password\" class=\"password-input\" placeholder=\"password\">\n  <input type=\"password\" class=\"verify-password\" placeholder=\"verify password\">\n<input class=\"submit\" type=\"submit\" value=\"create account\" disabled>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"] = this["DanceCard"]["templates"]["orgs"] || {};
this["DanceCard"]["templates"]["orgs"]["org"] = this["DanceCard"]["templates"]["orgs"]["org"] || {};
this["DanceCard"]["templates"]["orgs"]["org"]["createEvent"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<label name=\"name\">Event Name</label>\n  <input name=\"name\" class=\"event-name-input\" type=\"text\">\n<label name=\"start-date\">Start date</label>\n  <input name=\"start-date\" class=\"event-start-date-input\" type=\"date\">\n<label name=\"start-time\">Start time</label>\n    <input name=\"start-time\" class=\"event-start-time-input\" type=\"time\">\n<label name=\"address\">Venue Address</label>\n  <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\">\n<label name=\"zipcode\">Venue Zipcode</label>\n  <input name=\"zipcode\" class=\"event-zipcode-input\"type=\"text\" placeholder=\"venue zipcode\">\n<input type=\"submit\" value=\"create your event\" disabled>\n";
  },"useData":true});