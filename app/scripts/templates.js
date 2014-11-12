this["DanceCard"] = this["DanceCard"] || {};
this["DanceCard"]["templates"] = this["DanceCard"]["templates"] || {};
this["DanceCard"]["templates"]["_eventList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "    1 event found.\n";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    "
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + " events found.\n";
},"5":function(depth0,helpers,partials,data) {
  return "    Please try again.\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<h3>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.one : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"unless","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</h3>\n";
},"useData":true});
this["DanceCard"]["templates"]["_eventListItem"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "    <a href=\"#\" class=\"delete-event\">cancel this event</a>\n";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.attending : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"4":function(depth0,helpers,partials,data) {
  return "      <a href=\"#\" class=\"unrsvp\">cancel your RSVP</a>\n";
  },"6":function(depth0,helpers,partials,data) {
  return "      <a href=\"#\" class=\"rsvp\">RSVP</a>\n";
  },"8":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"10":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startTime : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "  <h5><a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.orgUrlId : stack1), depth0))
    + "/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.objectId : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a></h5>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.owner : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  ";
  stack1 = ((helper = (helper = helpers.dateDisplay || (depth0 != null ? depth0.dateDisplay : depth0)) != null ? helper : helperMissing),(options={"name":"dateDisplay","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateDisplay) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += " ";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  <div class=\"type\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.type : stack1), depth0))
    + "</div>\n";
},"useData":true});
this["DanceCard"]["templates"]["_infoWindow"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startDate : stack1)) != null ? stack1.iso : stack1), depth0));
  },"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startTime : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div id=\"content\">\n  <div id=\"siteNotice\">\n  </div>\n    <h1 id=\"firstHeading\" class=\"firstHeading\">\n    <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.orgUrlId : stack1), depth0))
    + "/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.objectId : stack1), depth0))
    + "\">\n    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a></h1>\n  <div id=\"bodyContent\">\n    <p>\n      ";
  stack1 = ((helper = (helper = helpers.dateDisplay || (depth0 != null ? depth0.dateDisplay : depth0)) != null ? helper : helperMissing),(options={"name":"dateDisplay","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateDisplay) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n    </p>\n    <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "</p>\n    <a href=\""
    + escapeExpression(((helper = (helper = helpers.mapUrl || (depth0 != null ? depth0.mapUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"mapUrl","hash":{},"data":data}) : helper)))
    + "\">get directions</a>\n  </div>\n</div>\n";
},"useData":true});
this["DanceCard"]["templates"]["_loginRequired"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"login-req-notif\">\n  <p>You must be logged in to use this feature</p>\n  <a href=\"#/login\" class=\"visit-login\">log in</a>\n  <a href=\"#/register\" class=\"visit-register\">register</a>\n  <a href=\"#\" class=\"cancel\">cancel</a>\n</div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["calendar"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class='clear "
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-calendar'>\n  <div class='view'>\n    <div class='head'>\n      <div class='title'>\n        <span class='m'></span>\n        <span class='y'></span>\n      </div>\n    </div>\n    <div class='row th'>\n      <div class='C'>M</div>\n      <div class='C'>T</div>\n      <div class='C'>W</div>\n      <div class='C'>T</div>\n      <div class='C'>F</div>\n      <div class='C'>S</div>\n      <div class='C'>S</div>\n    </div>\n    <div class='dayArea'>\n    </div>\n    <div class='row nav'>\n      <i class='btn prev prev-year fa fa-fast-backward'></i>\n      <i class='btn prev prev-month fa fa-play fa-flip-horizontal'></i>\n      <i class='btn next next-month fa fa-play'></i>\n      <i class='btn next next-year fa fa-fast-forward'></i>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
this["DanceCard"]["templates"]["dancer"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "Your";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "'s";
},"5":function(depth0,helpers,partials,data) {
  return "you are";
  },"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + " is";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n<h2>";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.owner : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " dance card</h2>\n<h3>Dances ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.owner : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " attending: </h3>\n<ul class='dancer-attending'>\n</ul>\n";
},"useData":true});
this["DanceCard"]["templates"]["forgotPassword"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<form class=\"reset-password\">\n  <a href=\"#\" class=\"close-modal\">\n    <span class=\"fa-stack\">\n      <i class=\"fa fa-times fa-stack-1x\" ></i>\n      <i class=\"fa fa-circle-o fa-stack-2x\"></i>\n    </span>\n  </a>\n  <h3>Reset your password</h3>\n  <label name=\"email\">Email</label>\n    <input type=\"email\" name=\"email\" class=\"email-reset-password\">\n  <input type=\"submit\" class=\"send-reset-request\">\n</form>\n";
  },"useData":true});
this["DanceCard"]["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"search-box\">\n  <form class=\"index-search\">\n    <input class=\"search-location\" type=\"text\" placeholder=\"pick a location\">\n    <div class='form-input date-selector'>\n      <i class='fa fa-calendar-o'></i>\n      <input type='text' id='index-start' class=\"start-date-input\" value='Start date' />\n    </div>\n    <div class='form-input date-selector'>\n      <i class='fa fa-calendar-o'></i>\n      <input type='text' id='index-end' class=\"end-date-input\" value='End date' />\n    </div>\n    <select class=\"search-type\">\n      <option value=\"all\">all</option>\n      <option value=\"contra-dance\">Contra Dance</option>\n      <option value=\"advanced-contra-dance\">Advanced Contra Dance</option>\n      <option value=\"contra-workshop\">Contra Workshop</option>\n      <option value=\"waltz\">Waltz Dance</option>\n      <option value=\"waltz-workshop\">Waltz Workshop</option>\n      <option value=\"square-dance\">Square Dance</option>\n      <option value=\"dance-weekend\">Dance Weekend</option>\n      <option value=\"caller-workshop\">Caller Workshop</option>\n    </select>\n    <input class=\"search-submit\" type=\"submit\" value=\"find dances\">\n</form>\n</div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["login"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<form class=\"login-form\">\n  <a href=\"#\" class=\"close-modal\">\n    <span class=\"fa-stack\">\n      <i class=\"fa fa-times fa-stack-1x\" ></i>\n      <i class=\"fa fa-circle-o fa-stack-2x\"></i>\n    </span>\n  </a>\n  <h2>Log In</h2>\n  <label name=\"email\">Email:</label>\n    <input name=\"email\" type=\"text\" class=\"email-input\" placeholder=\"email\">\n  <label name=\"password\">Password:</label>\n    <input name=\"password\" type=\"password\" class=\"password-input\" placeholder=\"password\">\n  <input class=\"login\" type=\"submit\" value=\"login\">\n  <a href=\"#\" class=\"forgot-password\">forgot password?</a>\n</form>\n";
  },"useData":true});
this["DanceCard"]["templates"]["nav"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <div class=\"left-nav\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.organizer : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        <a href=\"#/search\" class=\"search-link\"><i class=\"fa fa-search\">search events</i></a>\n        <a href=\"#/dancers/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "\"><i class=\"fa\">my dance card</i></a>\n      </div>\n  </div>\n  <div class=\"right-nav\">\n    <a href=\"#/settings\"><i class=\"fa fa-cog\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "</i></a>\n    <a href=\"#\" class=\"logout\"><i class=\"fa\">logout</i></a>\n  </div>\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "\" class=\"manage\"><i class=\"fa\">manage events</i></a>\n        <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "/create-event\" class=\"create\"><i class=\"fa fa-plus\">add event</i></a>\n";
},"4":function(depth0,helpers,partials,data) {
  return "  <div class=\"left-nav\">\n    <a href=\"#/search\" class=\"home-link\"><i class=\"fa fa-search\">search events</i></a>\n  </div>\n  <div class=\"right-nav\">\n    <a href=\"#/login\" class=\"login\"><i class=\"fa\">login</i></a>\n    <a href=\"#/register\" class=\"signup\"><i class=\"fa\">sign up</i></a>\n  </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.user : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(4, data),"data":data});
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
  return "<form class=\"register-form\">\n  <a href=\"#\" class=\"close-modal\">\n    <span class=\"fa-stack\">\n      <i class=\"fa fa-times fa-stack-1x\" ></i>\n      <i class=\"fa fa-circle-o fa-stack-2x\"></i>\n    </span>\n  </a>\n  <h2>Register</h2>\n\n  <label name=\"name\">Name:</label>\n    <input name=\"name\" type=\"text\" class=\"name-input\" placeholder=\"Username\">\n  <label name=\"email\">Email:</label>\n    <input name=\"email\" type=\"email\" class=\"email-input\" placeholder=\"email\">\n  <label class=\"organizer-label\" name=\"organizer\"><span>Are you a dance organizer?</span>\n    <label>yes</label>\n      <input name=\"organizer\" class=\"organizer-input\" type=\"radio\" value=\"true\">\n    <label >no</label>\n      <input name=\"organizer\" class=\"organizer-input\" type=\"radio\" value=\"false\">\n  </label>\n  <label name=\"password\">Password:</label>\n    <input type=\"password\" class=\"password-input\" placeholder=\"password\">\n    <input type=\"password\" class=\"verify-password\" placeholder=\"verify password\">\n  <input class=\"submit-register\" type=\"submit\" value=\"create account\" disabled>\n</form>\n";
  },"useData":true});
this["DanceCard"]["templates"]["search"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"startDate","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.endDate || (depth0 != null ? depth0.endDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"endDate","hash":{},"data":data}) : helper)));
  },"5":function(depth0,helpers,partials,data) {
  return "        <option value=\"all\">all</option>\n        <option value=\"contra-dance\">Contra Dance</option>\n        <option value=\"advanced-contra-dance\">Advanced Contra Dance</option>\n        <option value=\"contra-workshop\">Contra Workshop</option>\n        <option value=\"waltz\">Waltz Dance</option>\n        <option value=\"waltz-workshop\">Waltz Workshop</option>\n        <option value=\"square-dance\">Square Dance</option>\n        <option value=\"dance-weekend\">Dance Weekend</option>\n        <option value=\"caller-workshop\">Caller Workshop</option>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div class=\"search-right\">\n  <form class=\"search-box\">\n    <section class=\"pri-label\"><span>Location</span>\n      <label class=\"sec-label\">City</label>\n        <input class=\"search-location\" type=\"text\" placeholder=\"location\" value ="
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + ">\n      <label class=\"sec-label\">Distance</label>\n        <input class=\"search-distance\" type=\"text\" placeholder=\"within miles\" value="
    + escapeExpression(((helper = (helper = helpers.distance || (depth0 != null ? depth0.distance : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"distance","hash":{},"data":data}) : helper)))
    + ">\n    </section>\n    <section class=\"pri-label\"><span>Dates</span>\n      <label class=\"sec-label\">Start</label>\n        <input class=\"search-start-date\" type=\"date\" value=";
  stack1 = ((helper = (helper = helpers.dateForm || (depth0 != null ? depth0.dateForm : depth0)) != null ? helper : helperMissing),(options={"name":"dateForm","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateForm) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n      <label class=\"sec-label\">End</label>\n        <input class=\"search-end-date\"type=\"date\" value=";
  stack1 = ((helper = (helper = helpers.dateForm || (depth0 != null ? depth0.dateForm : depth0)) != null ? helper : helperMissing),(options={"name":"dateForm","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateForm) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n    </section>\n    <section class=\"pri-label\"><span>Dance type</span>\n      <select class=\"search-type\">\n";
  stack1 = ((helpers.select || (depth0 && depth0.select) || helperMissing).call(depth0, (depth0 != null ? depth0.type : depth0), {"name":"select","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </section>\n    <input class=\"search-submit\" type=\"submit\" value=\"Search\">\n</form>\n</div>\n";
},"useData":true});
this["DanceCard"]["templates"]["settings"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.createdAt || (depth0 != null ? depth0.createdAt : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"createdAt","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  return "checked";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "  <h4>Emails you send</h4>\n    <h5>Cancel Notifications</h5>\n      <input type=\"checkbox\" class=\"org-delete-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.orgCancelNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n      <p>Send email notification to event attendees if I cancel the event</p>\n    <h5>Change Notifications</h5>\n      <input type=\"checkbox\" class=\"org-change-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.orgChangeNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n      <p>Send email notification to event attendees if I make changes to the event</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<h2>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n<p>member since ";
  stack1 = ((helper = (helper = helpers.dateDisplay || (depth0 != null ? depth0.dateDisplay : depth0)) != null ? helper : helperMissing),(options={"name":"dateDisplay","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateDisplay) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "</p>\n\n<form class=\"password-change\">\n  <h3>Update Password</h3>\n  <label name=\"new-password\">New password</label>\n    <input class=\"new-password\" type=\"password\" placeholder=\"new password\">\n  <label name=\"ver-password\">Verify new password</label>\n    <input class=\"verify-password\" type=\"password\" placeholder=\"verify new password\">\n  <label name=\"old-password\">Old password</label>\n    <input class=\"old-password\" type=\"password\" placeholder=\"old password\">\n  <input type=\"submit\" name=\"change-password\" value=\"update\" class=\"change-password\">\n</form>\n\n<form class=\"email-settings\">\n  <h3>Email settings</h3>\n  <label>Current email:</label>\n  "
    + escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"email","hash":{},"data":data}) : helper)))
    + "\n  <label name=\"email\">Update your email address:</label>\n    <input type=\"email\" class=\"new-email\" placeholder=\"new email\"></a>\n    <input type=\"submit\" value=\"update\" class=\"change-email\">\n\n  <h4>Emails you receive</h4>\n  <h5>Cancel Notifications</h5>\n    <input type=\"checkbox\" class=\"delete-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.cancelNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n    <p>Receive email notification when an event I plan to attend is cancelled</p>\n  <h5>Change Notifications</h5>\n    <input type=\"checkbox\" class=\"change-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.changeNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n    <p>Allow email notification when an event I plan to attend is changed by the event organizer</p>\n  <h5>Special Notifications</h5>\n    <input type=\"checkbox\" class=\"custom-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.customNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n    <p>Allow other emails from the event organzier for events I plan to attend</p>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.organizer : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</form>\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"] = this["DanceCard"]["templates"]["orgs"] || {};
this["DanceCard"]["templates"]["orgs"]["org"] = this["DanceCard"]["templates"]["orgs"]["org"] || {};
this["DanceCard"]["templates"]["orgs"]["org"]["_eventHeader"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "  <div class=\"event-header-editing\">\n\n    <h2><input value=\""
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
    + "\" name=\"end-time\" class=\"event-end-time-input\" type=\"time\"></p>\n\n\n    <span><a href=\"#\" class=\"save-event-header\">save changes</a></span>\n    <span><a href=\"#\" class=\"edit-event-header\">cancel</a></span>\n  </div>\n";
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
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "  <div class=\"event-header-viewing\">\n    <h2>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h2>\n    <span><a href=\"#\" class=\"edit-event-header\">edit</a></span>\n      <p>Type: "
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
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <div class=\"event-info-editing\">\n    <h3>Event Info</h3>\n    <label name=\"event-price\">Price</label>\n      <input type=\"text\" class=\"price-input\" name=\"event-price\" placeholder=\"price\" value="
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
    + "</textarea>\n    <span><a href=\"#\" class=\"save-event-info\">save changes</a></span>\n    <span><a href=\"#\" class=\"edit-event-info\">cancel</a></span>\n  </div>\n";
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
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <div class=\"event-info-viewing\">\n    <h3>Event Info</h3>\n    <span><a href=\"#\" class=\"edit-event-info\">edit</a></span>\n    <p>Cost: $"
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
  var stack1, helper, options, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing, buffer = "  <div class=\"event-recur-editing\">\n    <h3>Event Schedule</h3>\n    <p>\n      This event occurs once a\n      <input class=\"chooseRpt\" name=\"chooseRpt\" type=\"radio\" value=\"true\" ";
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
  return buffer + "></p>\n    <span><a href=\"#\" class=\"save-event-recur\">save changes</a></span>\n    <span><a href=\"#\" class=\"edit-event-recur\">cancel</a></span>\n  </div>\n\n";
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
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "  <div class=\"event-recur-viewing\">\n    <h3>Event Schedule</h3>\n    <span><a href=\"#\" class=\"edit-event-recur\">edit</a></span>\n    </p>This event repeats every "
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
this["DanceCard"]["templates"]["orgs"]["org"]["_onetimeForm"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<label name=\"name\">Event Name</label>\n  <input name=\"name\" class=\"event-name-input\" type=\"text\">\n\n<label name=\"event-type\">Event Type</label>\n  <select class=\"event-type-input\" name=\"event-type\">\n    <option value=\"contra-dance\" selected>Contra Dance</option>\n    <option value=\"advanced-contra-dance\">Advanced Contra Dance</option>\n    <option value=\"contra-workshop\">Contra Workshop</option>\n    <option value=\"waltz\">Waltz Dance</option>\n    <option value=\"waltz-workshop\">Waltz Workshop</option>\n    <option value=\"square-dance\">Square Dance</option>\n    <option value=\"dance-weekend\">Dance Weekend</option>\n    <option value=\"caller-workshop\">Caller Workshop</option>\n  </select>\n\n  <label name=\"start-date\">Start date</label>\n    <input name=\"start-date\" class=\"event-start-date-input\" type=\"date\">\n\n<label name=\"start-time\">Start time</label>\n  <input name=\"start-time\" class=\"event-start-time-input\" type=\"time\">\n\n  <label name=\"multi-day\">Multi-day Event</label>\n    <input name=\"multi-day\"class=\"multi-day-input\" type=\"checkbox\">\n    <div class=\"multi-day\">\n    </div>\n\n<label name=\"end-time\">End time</label>\n  <input name=\"end-time\" class=\"event-end-time-input\" type=\"time\">\n\n<label name=\"venue-name\">Venue Name</label>\n  <input name=\"venue-name\" class=\"venue-name-input\" type=\"text\" placeholder=\"venue name\">\n<label name=\"address\">Venue Address</label>\n  <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\">\n\n<label name=\"band-name\">Band Name</label>\n  <input type=\"text\" class=\"band-name-input\" name=\"band-name\" placeholder=\"band name\">\n<label name=\"musicians\">Musicians</label>\n  <textarea name=\"musicians\" class=\"musicians-input\" rows=\"8\" cols=\"10\" placeholder=\"musicians\"></textarea>\n\n<label name=\"caller\">Caller</label>\n  <input type=\"text\" class=\"caller-input\" name=\"caller\" placeholder=\"caller\">\n\n<label name=\"event-price\">Price</label>\n  <input type=\"text\" class=\"price-input\" name=\"event-price\" placeholder=\"price\">\n\n<label name=\"beginner-friendly\">Beginner Friendly</label>\n  <input type=\"checkbox\" class=\"beginner\" name=\"beginner-friendly\">\n\n<label name=\"workshop-included\">Workshop Included</label>\n  <input type=\"checkbox\" class=\"workshop-incl\" name=\"workshop-included\">\n\n  <label name=\"pre-reg-req\">Pre-registration required</label>\n    <input type=\"checkbox\" name=\"pre-reg-req\" class=\"pre-reg-req-input\">\n    <div class=\"reg-req\">\n    </div>\n\n<label name=\"notes\">Notes</label>\n<textarea name=\"note\" class=\"notes-input\" placeholder=\"notes\"></textarea>\n\n<input type=\"submit\" class=\"submit-event\" value=\"create your event\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_onetimeList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    You have no one time events.\n    <a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.urlId || (depth0 != null ? depth0.urlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"urlId","hash":{},"data":data}) : helper)))
    + "/create-event\">Click here to add a new event</a>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " has no upcoming events.\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<li>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.owner : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</li>\n";
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
    + "\">manage</a>\n    <a href=\"#\" class=\"delete-recur\">cancel all events</a>\n  </h4>\n";
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
this["DanceCard"]["templates"]["orgs"]["org"]["_recurringForm"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"recurInfo\">\n  <p>\n    Your event will run for one year by default.\n  </p>\n  <p>\n    You can set bands, callers, musicians, and other special info for each event in this series after the series is created. Need to cancel an event in this series? You can do that all from the \"manage my events\" page.\n  </p>\n</div>\n\n<label name=\"name\">Event Name</label>\n  <input name=\"name\" class=\"event-name-input\" type=\"text\">\n\n<label name=\"event-type\">Event Type</label>\n  <select class=\"event-type-input\" name=\"event-type\">\n    <option value=\"contra-dance\" selected>Contra Dance</option>\n    <option value=\"advanced-contra-dance\">Advanced Contra Dance</option>\n    <option value=\"contra-workshop\">Contra Workshop</option>\n    <option value=\"waltz\">Waltz Dance</option>\n    <option value=\"waltz-workshop\">Waltz Workshop</option>\n    <option value=\"square-dance\">Square Dance</option>\n    <option value=\"dance-weekend\">Dance Weekend</option>\n    <option value=\"caller-workshop\">Caller Workshop</option>\n  </select>\n\n<label name=\"start-time\">Start time</label>\n  <input name=\"start-time\" class=\"event-start-time-input\" type=\"time\">\n\n<label name=\"end-time\">End time</label>\n  <input name=\"end-time\" class=\"event-end-time-input\" type=\"time\">\n\n<label name=\"venue-name\">Venue Name</label>\n  <input name=\"venue-name\" class=\"venue-name-input\" type=\"text\" placeholder=\"venue name\">\n<label name=\"address\">Venue Address</label>\n  <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\">\n\n<label name=\"event-price\">Price</label>\n  <input type=\"text\" class=\"price-input\" name=\"event-price\" placeholder=\"price\">\n\n<label name=\"beginner-friendly\">Beginner Friendly</label>\n  <input type=\"checkbox\" class=\"beginner\" name=\"beginner-friendly\">\n\n<label name=\"workshop-included\">Workshop Included</label>\n  <input type=\"checkbox\" class=\"workshop-incl\" name=\"workshop-included\">\n\n<label name=\"notes\">Notes</label>\n<textarea name=\"note\" class=\"notes-input\" placeholder=\"notes\"></textarea>\n\n<input type=\"submit\" class=\"submit-event\" value=\"create your event\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_regReq"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<label name=\"reg-limit\">Registration Limit</label>\n  <input name=\"reg-limit\" class=\"reg-limit-input\" type=\"number\">\n<label name=\"gender-bal\">Lead/Follow Balanced</label>\n  <input type=\"checkbox\" class=\"gender-bal-input\" name=\"gender-bal\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_saveWarning"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"save-warning\">\n  These changes will also occur on all instances of this recurring event.\n  Previously made changes to any instance of this event may be overwritten.\n  Are you sure you want to continue?\n  <input type=\"button\" class=\"continue-save\" value=\"continue\">\n  <a href='#' class=\"cancel-save\">cancel</a>\n</div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_venueInfo"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <divclass=\"venue-info-editing\">\n      <h3>Venue Info</h3>\n      <label name=\"venue-name\">Venue Name</label>\n        <input name=\"venue-name\" class=\"venue-name-input\" type=\"text\" placeholder=\"venue name\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.name : stack1), depth0))
    + "\">\n      <label name=\"address\">Venue Address</label>\n        <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "\">\n      <span><a href=\"#\" class=\"save-venue-info\">save changes</a></span>\n      <span><a href=\"#\" class=\"edit-venue-info\">cancel</a></span>\n    </div>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <div class=\"venue-info-viewing\">\n    <h3>Venue Info</h3>\n    <span><a href=\"#\" class=\"edit-venue-info\">edit</a></span>\n    <h4>\n      "
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
  return "";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseWkMo"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<span>on</span> \n<div class=\"choose-monthly-rpt\">\n</div>\n<select class=\"weekly-option-input\">\n  <option value=\"1\">Monday</option>\n  <option value=\"2\">Tuesday</option>\n  <option value=\"3\">Wednesday</option>\n  <option value=\"4\">Thursday</option>\n  <option value=\"5\">Friday</option>\n  <option value=\"6\">Saturday</option>\n  <option value=\"0\">Sunday</option>\n</select>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseWkRpt"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["createEvent"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["email"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<form>\n  <label name=\"subject\">Subject</label>\n  <input name=\"subject\" class=\"email-subject\" type=\"textbox\" placeholder=\"subject\">\n  <label name=\"body\">Body</label>\n  <textarea name=\"body\" class=\"email-body\" rows=\"8\" cols=\"40\"></textarea>\n  <input class=\"send-email\" type=\"submit\" value=\"Send Email\">\n  <a href=\"#\" class=\"cancel-email\">cancel</a>\n</form>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["event"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "<span>sorry, you don't have permission to manage this event</span>\n\n";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div class=\"event-header-viewing\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.attending : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  <h2>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h2>\n  <p>\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.weeklyRptName : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " from\n    ";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(17, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "-";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  </p>\n  <p>by <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.eventOrg : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.eventOrg : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a></p>\n</div>\n\n<div class=\"event-info-viewing\">\n  <h3>Event Info</h3>\n  <p>Cost: $"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.price : stack1), depth0))
    + "</p>\n  <p>\n    Band: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.band : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  </p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  <p>\n    Caller: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  </p>\n  <p>\n    This "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.type : stack1), depth0))
    + " is\n    ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.beginnerFrdly : stack1), {"name":"unless","hash":{},"fn":this.program(29, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    beginner friendly\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.workshopIncl : stack1), {"name":"if","hash":{},"fn":this.program(31, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  </p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), {"name":"if","hash":{},"fn":this.program(33, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n\n<div class=\"venue-info-viewing\">\n  <h3>Venue Info</h3>\n  <h4>\n    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.name : stack1), depth0))
    + "\n  </h4>\n  <p>\n    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "\n  </p>\n</div>\n\n";
},"4":function(depth0,helpers,partials,data) {
  return "    You are attending this event <a href=\"#\" class=\"unrsvp\">cancel your RSVP</a>\n";
  },"6":function(depth0,helpers,partials,data) {
  return "    <a href=\"#\" class=\"rsvp\">RSVP</a>\n";
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
  return "    <p>\n      Musicians: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), depth0))
    + "\n    </p>\n";
},"27":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), depth0));
  },"29":function(depth0,helpers,partials,data) {
  return " NOT ";
  },"31":function(depth0,helpers,partials,data) {
  return " and includes a workshop.";
  },"33":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <p>\n      Organizer notes: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), depth0))
    + "\n    </p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["eventManage"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.orgUrlId : stack1), depth0))
    + "/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.objectId : stack1), depth0))
    + "/email\">Email attendees</a>\n";
},"3":function(depth0,helpers,partials,data) {
  return "  <div class=\"event-recur\">\n  </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  <span><a href=\"#\" class=\"delete-event\">cancel this event</a></span>\n\n<div class=\"event-header\">\n</div>\n\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n<div class=\"event-info\">\n</div>\n\n<div class=\"venue-info\">\n</div>\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h2>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " Events</h2>\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["manage"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<h2>Hi, "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.name : stack1), depth0))
    + "!</h2>\n<p>Below is a list of your events. Click on any event name to view, add or change the event's info</p>\n<h3>Your Recurring Events</h3>\n<ul class=\"recurring-event-list\">\n</ul>\n<h3>Your One Time Events</h3>\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["newEvent"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return " checked";
  },"3":function(depth0,helpers,partials,data) {
  return " checked ";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"chooseRecur\">\n  <span>This event occurs</span>\n  <label>once</label>\n    <input class=\"chooseNoRpt\" name=\"chooseRpt\" type=\"radio\">\n  <label>once a</label>\n    <input class=\"chooseRpt\" name=\"chooseRpt\" type=\"radio\" value=\"true\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurMonthly : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "><label name=\"chooseRpt\">month</label>\n    <input class=\"chooseRpt\" name=\"chooseRpt\" type=\"radio\" value=\"false\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurMonthly : stack1), {"name":"unless","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "><label name=\"chooseRpt\">week</label>\n</div>\n\n<div class=\"chooseWkMoRpt\">\n</div>\n\n<div class=\"event-form\">\n</div>\n";
},"useData":true});