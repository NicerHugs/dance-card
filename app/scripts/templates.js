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
    + escapeExpression(((helper = (helper = helpers.urlId || (depth0 != null ? depth0.urlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"urlId","hash":{},"data":data}) : helper)))
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
  return buffer + ">\n        </p>\n        <p><label name=\"multi-day\">Multi-day Event</label>\n          <input name=\"multi-day\"class=\"multi-day-input\" type=\"checkbox\"></p>\n          <div class=\"multi-day\">\n        </div>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <div class=\"event-header-viewing\">\n    <span><a href=\"#\" class=\"edit-event-header\">edit</a></span>\n    <h2>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h2>\n      <span><a href=\"#\" class=\"delete-event\">delete this event</a></span>\n      <p>Type: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.type : stack1), depth0))
    + "</p>\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"unless","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      <p>Start Time: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startTime : stack1), depth0))
    + "</p>\n      <p>End Time: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endTime : stack1), depth0))
    + "</p>\n  </div>\n";
},"8":function(depth0,helpers,partials,data) {
  return "<p>This is a multi-day event</p>";
  },"10":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "        <p>Start Date: ";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "</p>\n        <p>End Date: ";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.edit : depth0)) != null ? stack1.eventHeader : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(7, data),"data":data});
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
  return buffer + "    <label name=\"notes\">Notes</label>\n      <textarea name=\"note\" class=\"notes-input\" placeholder=\"notes\"></textarea>\n  </div>\n";
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
  var stack1, buffer = "\n  <div class=\"event-header\">\n  </div>\n\n";
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
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "    <div class=\"event-header\">\n      <h2>"
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
  buffer += " from\n        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startTime : stack1), depth0))
    + "-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.endTime : stack1), depth0))
    + "\n      </p>\n      <p>by <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.eventOrg : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.eventOrg : depth0)) != null ? stack1.orgName : stack1), depth0))
    + "</a></p>\n    </div>\n\n    <div class=\"event-info\">\n      <h3>Event Info</h3>\n      <p>Cost: $"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.price : stack1), depth0))
    + "</p>\n      <p>\n        Band: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.band : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      </p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <p>\n        Caller: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      </p>\n      <p>\n        This "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.type : stack1), depth0))
    + " is\n        ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.beginnerFrdly : stack1), {"name":"unless","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n        beginner friendly\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.workshopIncl : stack1), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      </p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), {"name":"if","hash":{},"fn":this.program(29, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n\n    <div class=\"venue-info\">\n      <h3>Venue Info</h3>\n      <h4>\n        "
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
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.band : stack1), depth0));
  },"19":function(depth0,helpers,partials,data) {
  return "TBA";
  },"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <p>\n          Musicians: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), depth0))
    + "\n        </p>\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), depth0));
  },"25":function(depth0,helpers,partials,data) {
  return " NOT ";
  },"27":function(depth0,helpers,partials,data) {
  return " and includes a workshop.";
  },"29":function(depth0,helpers,partials,data) {
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