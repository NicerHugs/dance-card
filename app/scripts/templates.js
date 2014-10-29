this["DanceCard"] = this["DanceCard"] || {};
this["DanceCard"]["templates"] = this["DanceCard"]["templates"] || {};
this["DanceCard"]["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "index template\n<div id=\"map-canvas\"></div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["nav"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});
this["DanceCard"]["templates"]["orgs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "orgs template\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"] = this["DanceCard"]["templates"]["orgs"] || {};
this["DanceCard"]["templates"]["orgs"]["org"] = this["DanceCard"]["templates"]["orgs"]["org"] || {};
this["DanceCard"]["templates"]["orgs"]["org"]["createEvent"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<label name=\"name\">Event Name</label>\n  <input name=\"name\" class=\"event-name-input\" type=\"text\">\n<label name=\"start-date\">Start date</label>\n  <input name=\"start-date\" class=\"event-start-date-input\" type=\"date\">\n<label name=\"start-time\">Start time</label>\n    <input name=\"start-time\" class=\"event-start-time-input\" type=\"time\">\n<label name=\"address\">Venue Address</label>\n  <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\">\n<label name=\"zipcode\">Venue Zipcode</label>\n  <input name=\"zipcode\" class=\"event-zipcode-input\"type=\"text\" placeholder=\"venue zipcode\">\n<input type=\"submit\" value=\"create your event\" disabled>\n";
  },"useData":true});