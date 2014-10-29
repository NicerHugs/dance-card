this["DanceCard"] = this["DanceCard"] || {};
this["DanceCard"]["templates"] = this["DanceCard"]["templates"] || {};
this["DanceCard"]["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "index template\n<div id=\"map-canvas\"></div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "orgs template\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"] = this["DanceCard"]["templates"]["orgs"] || {};
this["DanceCard"]["templates"]["orgs"]["org"] = this["DanceCard"]["templates"]["orgs"]["org"] || {};
this["DanceCard"]["templates"]["orgs"]["org"]["createEvent"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<input class=\"event-address-input\" type=\"text\" placeholder=\"venue address\">\n<input class=\"event-zipcode-input\"type=\"text\" placeholder=\"venue zipcode\">\n<input type=\"submit\" value=\"create your event\">\n";
  },"useData":true});