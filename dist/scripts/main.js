(function(){
  'use strict';

  Handlebars.registerHelper('select', function(value, options) {
    if (value) {
      var val = '"' + value.split(' ').join('-') + '"',
          re = new RegExp(val, 'g'),
         newStr = options.fn(this).replace(re, val + ' selected');
      return newStr;
    } else {
      return options.fn(this);
    }
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
          success: function(model){
            model.destroy({success: function(model){
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

  //thanks to Sasha (http://codepen.io/Boshnik/) for this lovely calendar date picker

  DanceCard.Forms = {};

  DanceCard.Forms.monthNames = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  };

  DanceCard.Forms.monthNums = _.invert(DanceCard.Forms.MonthNames);

  DanceCard.Forms.Cal = function(id, label) {
    var self = this;

    this.date = {};
    this.markup = {};
    this.date.today = new Date();
    this.date.today = new Date(this.date.today.getUTCFullYear(),this.date.today.getUTCMonth(),this.date.today.getUTCDate());
    this.date.browse = new Date();
    this.markup.row = "row";
    this.markup.cell = "cell";
    this.markup.inactive = "g";
    this.markup.currentMonth = "mn";
    this.markup.slctd = "slctd";
    this.markup.today = "today";
    this.markup.dayArea = "dayArea";
    this.elementTag = id + '-calendar';
    this.targetInput = '#' + id;
    this.init = false;
    this.buildDOM();
    this.selectDate(this.date.today.getFullYear(),this.date.today.getMonth(),this.date.today.getDate());
    this.constructDayArea(null, id);
    this.updateInput(label,'','');

    $(document).ready(function(){
      $(document).click(function(event){
        var el = $('.' + self.elementTag + ' .view'),
            eco = el.offset();
        if(event.pageX<eco.left || event.pageX>eco.left+el.width() || event.pageY<eco.top || event.pageY>eco.top+el.height()) {
          if(!self.init) self.hide(300);
        }
      });
      $('.'+self.elementTag).on('click','.next-month',function(){
        self.setMonthNext();
      });
      $('.'+self.elementTag).on('click','.prev-month',function(){
        self.setMonthPrev();
      });
      $('.'+self.elementTag).on('click','.next-year',function(){
        self.setYearNext();
      });
      $('.'+self.elementTag).on('click','.prev-year',function(){
        self.setYearPrev();
      });

      $('.'+self.elementTag).on('click','.jump-to-next-month',function(){
        self.setMonthNext();
      });
      $('.'+self.elementTag).on('click','.jump-to-previous-month',function(){
        self.setMonthPrev();
      });

      $('.'+self.elementTag).on('click','.'+self.markup.currentMonth,function(){
        var d = self.selectDate(self.date.browse.getUTCFullYear(),self.date.browse.getUTCMonth(),$(this).html());
        self.hide(300);
      });

      $('.'+self.elementTag).on('click','.title',function(){
        self.date.browse = new Date(self.date.today.getTime());
        self.constructDayArea(false);
      });

      $('#' + id).focus(function(e){
        if(e) e.stopPropagation();
        self.show(300);
        $(this).blur();
      });

    });

  };

  DanceCard.Forms.Cal.prototype.wd = function(wd) {
    if(wd===0) return 7;
    return wd;
  };

  DanceCard.Forms.Cal.prototype.buildDOM = function() {
    var html = DanceCard.templates.calendar({id: this.targetInput.slice(1)});
    $(html).insertBefore(this.targetInput);
    $(this.targetInput).css('cursor','pointer');
    this.hide(100);
  };

  DanceCard.Forms.Cal.prototype.constructDayArea = function(flipDirection) {
    var newViewContent = "",
        wd = this.wd(this.date.browse.getUTCDay()),
        d = this.date.browse.getUTCDate(),
        m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear(),
        monthBgnDate = new Date(y,m,1),
        monthBgn = monthBgnDate.getTime(),
        monthEndDate = new Date(this.getMonthNext().getTime()-1000*60*60*24),
        monthEnd = monthEndDate.getTime(),
        monthBgnWd = this.wd(monthBgnDate.getUTCDay()),
        itrBgn = monthBgnDate.getTime()-(monthBgnWd-1)*1000*60*60*24,
        i = 1,
        n = 0,
        dayItr = itrBgn;
    newViewContent += "<div class='"+this.markup.row+"'>\n";
    while(n<42) {
      var cls = new Array("C",this.markup.cell);
      if(dayItr<=monthBgn) cls.push(this.markup.inactive,"jump-to-previous-month");
      else if(dayItr>=monthEnd+1000*60*60*36) cls.push(this.markup.inactive,"jump-to-next-month");
      else cls.push(this.markup.currentMonth);
      if(dayItr==this.date.slctd.getTime()+1000*60*60*24) cls.push(this.markup.slctd);
      if(dayItr==this.date.today.getTime()+1000*60*60*24) cls.push(this.markup.today);

      var date = new Date(dayItr);
      newViewContent += "<div class='"+cls.join(" ")+"'>"+date.getUTCDate()+"</div>\n";
      i += 1;
      if(i>7) {
        i = 1;
        newViewContent += "</div>\n<div class='"+this.markup.row+"'>\n";
      }
      n += 1;
      dayItr = dayItr+1000*60*60*24;
    }
    newViewContent += "</div>\n";


    this.changePage(newViewContent,flipDirection);
    $('.'+this.elementTag+' .title .m').html(DanceCard.Forms.monthNames[m]);
    $('.'+this.elementTag+' .title .y').html(y);
    return newViewContent;
  };

  DanceCard.Forms.Cal.prototype.changePage = function(newPageContent,flipDirection) {
    var multiplier = -1,
        mark = "-";
    if(flipDirection) {
      multiplier = 1;
      mark = "+";
    }

    var oldPage = $('.'+this.elementTag+' .'+this.markup.dayArea+' .mArea'),
        newPage = $("<div class='mArea'></div>").html(newPageContent);
    $('.'+this.elementTag+' .'+this.markup.dayArea).append(newPage);
    oldPage.remove();
  };

  DanceCard.Forms.Cal.prototype.selectDate = function(y,m,d) {
    this.date.slctd = new Date(y,m,d);
    this.updateInput(y,m,d);
    this.constructDayArea(false);
    return this.date.slctd;
  };

  DanceCard.Forms.Cal.prototype.updateInput = function(y,m,d) {
    if(m==='') m = '';
    else m = DanceCard.Forms.monthNames[m];
    $(this.targetInput).val(m+" "+d+" "+y);
  };

  DanceCard.Forms.Cal.prototype.getMonthNext = function() {
    var m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear();
    if(m+1>11) return new Date(y+1,0);
    else return new Date(y,m+1);
  };

  DanceCard.Forms.Cal.prototype.getMonthPrev = function() {
    var m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear();
    if(m-1<0) return new Date(y-1,11);
    else return new Date(y,m-1);
  };

  DanceCard.Forms.Cal.prototype.setMonthNext = function() {
    var m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear();
    if(m+1>11) {
      this.date.browse.setUTCFullYear(y+1);
      this.date.browse.setUTCMonth(0);
    } else {
      this.date.browse.setUTCMonth(m+1);
    }
    this.constructDayArea(false);
  };

  DanceCard.Forms.Cal.prototype.setMonthPrev = function() {
    var m = this.date.browse.getUTCMonth(),
        y = this.date.browse.getUTCFullYear();
    if(m-1<0) {
      this.date.browse.setUTCFullYear(y-1);
      this.date.browse.setUTCMonth(11);
    } else {
      this.date.browse.setUTCMonth(m-1);
    }
    this.constructDayArea(true);
  };

  DanceCard.Forms.Cal.prototype.setYearNext = function() {
    var y = this.date.browse.getUTCFullYear();
    this.date.browse.setUTCFullYear(y+1);
    this.constructDayArea(false);
  };

  DanceCard.Forms.Cal.prototype.setYearPrev = function() {
    var y = this.date.browse.getUTCFullYear();
    this.date.browse.setUTCFullYear(y-1);
    this.constructDayArea(true);
  };

  DanceCard.Forms.Cal.prototype.hide = function(duration) {
    $('.'+this.elementTag+' .view').parent().hide(duration);
  };

  DanceCard.Forms.Cal.prototype.show = function(duration) {
    var t = this;
    t.init = true;
    $('.'+this.elementTag+' .view').parent().show(duration,function(){
      t.init = false;
    });
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

    loginV: {},
    registerV: {},

    index: function() {
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren = [];
      $('.container').addClass('index-view');
      this.mainChildren.push(new DanceCard.Views.Index({
        $container: $('main')
      }));
    },

    search: function() {
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren = [];
      $('.container').removeClass('index-view');
      this.mainChildren.push(new DanceCard.Views.Search({
        $container: $('main')
      }));
    },

    searchResults: function(searchTerms) {
      var searchViews = this.mainChildren.filter(function(child) {
        return child instanceof DanceCard.Views.Search;
      });
      if (!searchViews.length) {
        _.invoke(this.mainChildren, 'remove');
        this.mainChildren = [];
        $('.container').removeClass('index-view');
        this.mainChildren.push(new DanceCard.Views.Search({
          $container: $('main'),
          searchTerms: searchTerms
        }));
      }
    },

    login: function() {
      if (_.contains(this.mainChildren, this.registerV)) {
        this.registerV.remove();
        this.mainChildren = _.without(this.mainChildren, this.registerV);
      }
      this.loginV = new DanceCard.Views.Login({
        $container: $('main')
      });
      this.mainChildren.push(this.loginV);
    },

    register: function() {
      if (_.contains(this.mainChildren, this.loginV)) {
        this.loginV.remove();
        this.mainChildren = _.without(this.mainChildren, this.loginV);
      }
      this.registerV = new DanceCard.Views.Register({
        $container: $('main'),
        model: new DanceCard.Models.User()
      });
      this.mainChildren.push(this.registerV);
    },

    settings: function() {
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren = [];
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
      this.mainChildren = [];
      $('.container').removeClass('index-view');
      this.mainChildren.push(new DanceCard.Views.NotFound({
        $container: $('main')
      }));
    },

    org: function(org) {
      var self = this;
      _.invoke(this.mainChildren, 'remove');
      this.mainChildren = [];
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
      this.mainChildren = [];
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
      this.mainChildren = [];
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
        } else {
          self.mainChildren.push(new DanceCard.Views.Event({
            $container: $('main'),
            model: evt
          }));
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
      this.mainChildren = [];
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
      this.mainChildren = [];
      $('.container').removeClass('index-view');
      this.mainChildren.push(new DanceCard.Views.NotFound({
        $container: $('main'),
      }));
    }

  });

})();

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
  var stack1, buffer = "<h3 class=\"search-result-count\">\n";
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
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "  <h3>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n  <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.orgUrlId : stack1), depth0))
    + "/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.objectId : stack1), depth0))
    + "\">View details</a>\n";
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
  return "My";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "'s";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<h2>";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.owner : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " dance card</h2>\n<div class=\"content\">\n  <ul class='dancer-attending'>\n  </ul>\n</div>\n";
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
    + "</i></a>\n    <a href=\"#\" class=\"logout\"><i class=\"fa fa-sign-out\">logout</i></a>\n  </div>\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "\" class=\"manage\"><i class=\"fa fa-pencil-square-o\">manage events</i></a>\n        <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "/create-event\" class=\"create\"><i class=\"fa fa-plus\">add event</i></a>\n";
},"4":function(depth0,helpers,partials,data) {
  return "  <div class=\"left-nav\">\n    <a href=\"#/search\" class=\"home-link\"><i class=\"fa fa-search\">search events</i></a>\n  </div>\n  <div class=\"right-nav\">\n    <a href=\"#/login\" class=\"login\"><i class=\"fa fa-sign-in\">login</i></a>\n    <a href=\"#/register\" class=\"signup\"><i class=\"fa\">sign up</i></a>\n  </div>\n";
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
  var stack1, buffer = "  <h4>Emails you send</h4>\n  <div class=\"send-not\">\n      <input type=\"checkbox\" class=\"org-delete-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.orgCancelNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n      <h5>Cancel Notifications</h5>\n        <p>Send email notification to event attendees if I cancel the event</p>\n      <input type=\"checkbox\" class=\"org-change-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.orgChangeNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n      <h5>Change Notifications</h5>\n        <p>Send email notification to event attendees if I make changes to the event</p>\n    </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<h2>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n\n<p class=\"member-data\">member since ";
  stack1 = ((helper = (helper = helpers.dateDisplay || (depth0 != null ? depth0.dateDisplay : depth0)) != null ? helper : helperMissing),(options={"name":"dateDisplay","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateDisplay) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "</p>\n<div class=\"content\">\n<form class=\"change-account\">\n  <h3>Update Account</h3>\n  <section class=\"password-section\">\n    <label name=\"new-password\">New password</label>\n      <input class=\"new-password\" type=\"password\" placeholder=\"new password\">\n    <label name=\"ver-password\">Verify new password</label>\n      <input class=\"verify-password\" type=\"password\" placeholder=\"verify new password\">\n    <label name=\"old-password\">Old password</label>\n      <input class=\"old-password\" type=\"password\" placeholder=\"old password\">\n    <input type=\"submit\" name=\"change-password\" value=\"update\" class=\"change-password\">\n  </section>\n  <section class=\"email-section\">\n    <label>Current email:</label>\n    <span>"
    + escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"email","hash":{},"data":data}) : helper)))
    + "</span>\n    <label name=\"email\">New email:</label>\n      <input type=\"email\" class=\"new-email\" placeholder=\"new email\"></a>\n      <input type=\"submit\" value=\"update\" class=\"change-email\">\n  </section>\n</form>\n\n<form class=\"email-settings\">\n  <h3>Email settings</h3>\n  <h4>Emails you receive</h4>\n  <div class=\"receive-not\">\n    <input type=\"checkbox\" class=\"delete-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.cancelNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n    <h5>Cancel Notifications</h5>\n      <p>Receive email notification when an event I plan to attend is cancelled</p>\n    <input type=\"checkbox\" class=\"change-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.changeNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n    <h5>Change Notifications</h5>\n      <p>Allow email notification when an event I plan to attend is changed by the event organizer</p>\n    <input type=\"checkbox\" class=\"custom-msg\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.customNotify : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n    <h5>Special Notifications</h5>\n      <p>Allow other emails from the event organzier for events I plan to attend</p>\n  </div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.organizer : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</form>\n</div>\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"] = this["DanceCard"]["templates"]["orgs"] || {};
this["DanceCard"]["templates"]["orgs"]["org"] = this["DanceCard"]["templates"]["orgs"]["org"] || {};
this["DanceCard"]["templates"]["orgs"]["org"]["_eventHeader"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "  <div class=\"event-header-editing\">\n\n    <h3><input value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "\"name=\"name\" class=\"event-name-input\" type=\"text\"></h3>\n\n    <p><label name=\"event-type\">Event Type</label>\n      <select class=\"event-type-input\" name=\"event-type\">\n";
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
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "  <div class=\"event-header-viewing\">\n    <h3>Basic Info</h3>\n    <span><a href=\"#\" class=\"edit-event-header\">edit</a></span>\n      <p>Type: "
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
  return "<section class=\"basic-info\">\n  <section class=\"basic\">\n    <h3>Basic Info</h3>\n\n    <label name=\"name\">Event Name</label>\n      <input name=\"name\" class=\"event-name-input\" type=\"text\" placeholder=\"Event Name\">\n\n    <label name=\"event-type\">Event Type</label>\n      <select class=\"event-type-input\" name=\"event-type\">\n        <option value=\"contra-dance\" selected>Contra Dance</option>\n        <option value=\"advanced-contra-dance\">Advanced Contra Dance</option>\n        <option value=\"contra-workshop\">Contra Workshop</option>\n        <option value=\"waltz\">Waltz Dance</option>\n        <option value=\"waltz-workshop\">Waltz Workshop</option>\n        <option value=\"square-dance\">Square Dance</option>\n        <option value=\"dance-weekend\">Dance Weekend</option>\n        <option value=\"caller-workshop\">Caller Workshop</option>\n      </select>\n\n    <label name=\"event-price\">Price</label>\n      <input type=\"text\" class=\"price-input\" name=\"event-price\" placeholder=\"price\">\n\n    <div class=\"time\">\n      <label name=\"start-time\">Start time</label>\n      <input name=\"start-time\" class=\"event-start-time-input\" type=\"time\">\n    </div>\n\n    <div class=\"time\">\n      <label name=\"end-time\">End time</label>\n        <input name=\"end-time\" class=\"event-end-time-input\" type=\"time\">\n    </div>\n\n  </section>\n\n  <section class=\"extras\">\n    <input type=\"checkbox\" class=\"beginner\" name=\"beginner-friendly\">\n    <label class =\"check\" name=\"beginner-friendly\">Beginner Friendly</label>\n\n    <input type=\"checkbox\" class=\"workshop-incl\" name=\"workshop-included\">\n    <label class=\"check\" name=\"workshop-included\">Workshop Included</label>\n\n    <input type=\"checkbox\" name=\"pre-reg-req\" class=\"pre-reg-req-input\">\n    <label class=\"check\" name=\"pre-reg-req\">Pre-registration required</label>\n      <div class=\"reg-req\">\n      </div>\n\n    <input name=\"multi-day\"class=\"multi-day-input\" type=\"checkbox\">\n    <label class=\"check\" name=\"multi-day\">Multi-day Event</label>\n      <div class=\"multi-day\">\n      </div>\n  </section>\n\n</section>\n\n<section class=\"venue-info\">\n  <h3>Venue Info</h3>\n\n  <label name=\"venue-name\">Venue Name</label>\n    <input name=\"venue-name\" class=\"venue-name-input\" type=\"text\" placeholder=\"venue name\">\n  <label name=\"address\">Venue Address</label>\n    <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\">\n</section>\n\n\n<section class=\"performers\">\n  <h3>Performers</h3>\n\n  <label name=\"band-name\">Band Name</label>\n    <input type=\"text\" class=\"band-name-input\" name=\"band-name\" placeholder=\"band name\">\n  <label name=\"musicians\">Musicians</label>\n    <textarea name=\"musicians\" class=\"musicians-input\" rows=\"8\" cols=\"10\" placeholder=\"musicians\"></textarea>\n\n  <label name=\"caller\">Caller</label>\n    <input type=\"text\" class=\"caller-input\" name=\"caller\" placeholder=\"caller\">\n</section>\n\n<section class=\"notes\">\n  <h3 class=\"notes-header\">Notes</h3>\n  <textarea name=\"note\" class=\"notes-input\" placeholder=\"notes\"></textarea>\n</section>\n\n\n<input type=\"submit\" class=\"submit-event\" value=\"create your event\">\n";
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
  return "  <h3>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n  occurs every "
    + escapeExpression(((helper = (helper = helpers.monthlyRpt || (depth0 != null ? depth0.monthlyRpt : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"monthlyRpt","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.weeklyRptName || (depth0 != null ? depth0.weeklyRptName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weeklyRptName","hash":{},"data":data}) : helper)))
    + "\n  <a href=\"#/orgs/"
    + escapeExpression(((helper = (helper = helpers.orgUrlId || (depth0 != null ? depth0.orgUrlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"orgUrlId","hash":{},"data":data}) : helper)))
    + "/"
    + escapeExpression(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"objectId","hash":{},"data":data}) : helper)))
    + "\">manage</a>\n  <a href=\"#\" class=\"delete-recur\">cancel all events</a>\n  <div class=\"sub-events\"></div>\n  <a href=\"#\" class=\"toggle-sub-events show\"><i class=\"fa fa-sort-asc\">Show sub-events</i></a>\n  <a href=\"#\" class=\"toggle-sub-events hide hidden\"><i class=\"fa fa-sort-desc\">Hide sub-events</i></a>\n";
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
  return "<div class=\"recurInfo\">\n  <p>\n    Your event will run for one year by default.\n  </p>\n  <p>\n    You can set bands, callers, musicians, and other special info for each event in this series after the series is created. Need to cancel an event in this series? You can do that all from the \"manage events\" page.\n  </p>\n</div>\n\n\n<section class=\"basic\">\n  <h3>Basic Info</h3>\n  <label name=\"name\">Event Name</label>\n    <input name=\"name\" class=\"event-name-input\" type=\"text\">\n\n  <label name=\"event-type\">Event Type</label>\n    <select class=\"event-type-input\" name=\"event-type\">\n      <option value=\"contra-dance\" selected>Contra Dance</option>\n      <option value=\"advanced-contra-dance\">Advanced Contra Dance</option>\n      <option value=\"contra-workshop\">Contra Workshop</option>\n      <option value=\"waltz\">Waltz Dance</option>\n      <option value=\"waltz-workshop\">Waltz Workshop</option>\n      <option value=\"square-dance\">Square Dance</option>\n      <option value=\"dance-weekend\">Dance Weekend</option>\n      <option value=\"caller-workshop\">Caller Workshop</option>\n    </select>\n\n  <label name=\"start-time\">Start time</label>\n    <input name=\"start-time\" class=\"event-start-time-input\" type=\"time\">\n\n  <label name=\"end-time\">End time</label>\n    <input name=\"end-time\" class=\"event-end-time-input\" type=\"time\">\n\n\n  <label name=\"event-price\">Price</label>\n  <input type=\"text\" class=\"price-input\" name=\"event-price\" placeholder=\"price\">\n\n\n  <label class=\"check\"name=\"beginner-friendly\">Beginner Friendly</label>\n    <input type=\"checkbox\" class=\"beginner\" name=\"beginner-friendly\">\n\n  <label class=\"check\" name=\"workshop-included\">Workshop Included</label>\n    <input type=\"checkbox\" class=\"workshop-incl\" name=\"workshop-included\">\n</section>\n\n\n\n\n\n\n\n<section class=\"venue-info\">\n  <h3>Venue Info</h3>\n\n\n<label name=\"venue-name\">Venue Name</label>\n  <input name=\"venue-name\" class=\"venue-name-input\" type=\"text\" placeholder=\"venue name\">\n<label name=\"address\">Venue Address</label>\n  <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\">\n</section>\n\n<section class=\"extras\">\n<h3 name=\"notes\">Notes</h3>\n<textarea name=\"note\" class=\"notes-input\" placeholder=\"notes\"></textarea>\n</section>\n\n\n\n\n<input type=\"submit\" class=\"submit-event\" value=\"create your event\">\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_regReq"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "  <input name=\"reg-limit\" class=\"reg-limit-input\" type=\"number\">\n  <label name=\"reg-limit\">Registration Limit</label>\n\n<label class=\"check\" name=\"gender-bal\">Lead/Follow Balanced</label>\n  <input type=\"checkbox\" class=\"gender-bal-input\" name=\"gender-bal\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_saveWarning"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"save-warning\">\n  These changes will also occur on all instances of this recurring event.\n  Previously made changes to any instance of this event may be overwritten.\n  Are you sure you want to continue?\n  <input type=\"button\" class=\"continue-save\" value=\"continue\">\n  <a href='#' class=\"cancel-save\">cancel</a>\n</div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["_venueInfo"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <div class=\"venue-info-editing\">\n      <h3>Venue Info</h3>\n      <label name=\"venue-name\">Venue Name</label>\n        <input name=\"venue-name\" class=\"venue-name-input\" type=\"text\" placeholder=\"venue name\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.name : stack1), depth0))
    + "\">\n      <label name=\"address\">Venue Address</label>\n        <input name=\"address\" class=\"event-address-input\" type=\"text\" placeholder=\"venue address\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "\">\n      <span><a href=\"#\" class=\"save-venue-info\">save changes</a></span>\n      <span><a href=\"#\" class=\"edit-venue-info\">cancel</a></span>\n\n    </div>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <div class=\"venue-info-viewing\">\n    <h3>Venue Info</h3>\n    <span><a href=\"#\" class=\"edit-venue-info\">edit</a></span>\n    <h4>\n      "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.name : stack1), depth0))
    + "\n    </h4>\n    <p>\n      "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "\n    </p>\n    <div class=\"map-container\"></div>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.edit : depth0)) != null ? stack1.venueInfo : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseDate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h3>on:</h3>\n\n<label name='start-date'></label>\n<input class=\"event-start-date-input\" type=\"date\">\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseMoRpt"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<select name=\"monthlyRpt\" class=\"monthly-option-input\">\n  <option value=\"first\">the first</option>\n  <option value=\"second\">the second</option>\n  <option value=\"third\">the third</option>\n  <option value=\"fourth\">the fourth</option>\n  <option value=\"last\">the last</option>\n</select>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseWkMo"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h3>on:</h3>\n<div class=\"choose-monthly-rpt\">\n</div>\n<div class=\"choose-weekly-rpt\">\n  <select class=\"weekly-option-input\">\n    <option value=\"1\">Monday</option>\n    <option value=\"2\">Tuesday</option>\n    <option value=\"3\">Wednesday</option>\n    <option value=\"4\">Thursday</option>\n    <option value=\"5\">Friday</option>\n    <option value=\"6\">Saturday</option>\n    <option value=\"0\">Sunday</option>\n  </select>\n</div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["chooseWkRpt"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["createEvent"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["email"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-view\">\n  <form class=\"email\">\n    <a href=\"#\" class=\"close-modal\">\n      <span class=\"fa-stack\">\n        <i class=\"fa fa-times fa-stack-1x\" ></i>\n        <i class=\"fa fa-circle-o fa-stack-2x\"></i>\n      </span>\n    </a>\n    <label name=\"subject\">Subject</label>\n    <input name=\"subject\" class=\"email-subject\" type=\"textbox\" placeholder=\"subject\">\n    <label name=\"body\">Body</label>\n    <textarea name=\"body\" class=\"email-body\" rows=\"8\" cols=\"40\"></textarea>\n    <input class=\"send-email\" type=\"submit\" value=\"Send Email\">\n    <a href=\"#\" class=\"cancel-email\">cancel</a>\n  </form>\n</div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["event"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "<span>sorry, you don't have permission to manage this event</span>\n\n";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<h2>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h2>\n<div class=\"content\">\n  <div class=\"event-header-viewing\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.attending : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <p>\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = ((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(options={"name":"dateShort","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dateShort) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.multiDay : stack1), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.weeklyRptName : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " from\n      ";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(17, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "-";
  stack1 = ((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helperMissing),(options={"name":"time","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.time) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    </p>\n    <p>by <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.eventOrg : depth0)) != null ? stack1.urlId : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.eventOrg : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a></p>\n  </div>\n\n  <div class=\"event-info-viewing\">\n    <h3>Event Info</h3>\n    <p>Cost: $"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.price : stack1), depth0))
    + "</p>\n    <p>\n      Band: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.band : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    </p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <p>\n      Caller: ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    </p>\n    <p>\n      This "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.type : stack1), depth0))
    + " is\n      ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.beginnerFrdly : stack1), {"name":"unless","hash":{},"fn":this.program(29, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      beginner friendly\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.workshopIncl : stack1), {"name":"if","hash":{},"fn":this.program(31, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    </p>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), {"name":"if","hash":{},"fn":this.program(33, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n\n  <div class=\"venue-info-viewing\">\n    <h3>Venue Info</h3>\n    <h4>\n      "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.name : stack1), depth0))
    + "\n    </h4>\n    <p>\n      "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.venue : stack1)) != null ? stack1.fullAddress : stack1), depth0))
    + "\n    </p>\n  </div>\n</div>\n";
},"4":function(depth0,helpers,partials,data) {
  return "      You are attending this event <a href=\"#\" class=\"unrsvp\">cancel your RSVP</a>\n";
  },"6":function(depth0,helpers,partials,data) {
  return "      <a href=\"#\" class=\"rsvp\">RSVP</a>\n";
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
  return "      <p>\n        Musicians: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.musicians : stack1), depth0))
    + "\n      </p>\n";
},"27":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.caller : stack1), depth0));
  },"29":function(depth0,helpers,partials,data) {
  return " NOT ";
  },"31":function(depth0,helpers,partials,data) {
  return " and includes a workshop.";
  },"33":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "      <p>\n        Organizer notes: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.notes : stack1), depth0))
    + "\n      </p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["eventManage"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <a href=\"#/orgs/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.orgUrlId : stack1), depth0))
    + "/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.objectId : stack1), depth0))
    + "/email\">Email attendees</a>\n";
},"3":function(depth0,helpers,partials,data) {
  return "    <div class=\"event-recur\">\n    </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<h2 class=\"event-name\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h2>\n\n<div class=\"content\">\n";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <span><a href=\"#\" class=\"delete-event\">cancel this event</a></span>\n\n  <div class=\"event-header\">\n  </div>\n\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.recurring : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  <div class=\"event-info\">\n  </div>\n\n  <div class=\"venue-info\">\n  </div>\n</div>\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h2>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " Events</h2>\n<div class=\"content\"></div>\n";
},"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["manage"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>My Events</h2>\n<div class=\"content\">\n  <h3>Recurring Events</h3>\n  <ul class=\"recurring-event-list\">\n  </ul>\n  <h3>One Time Events</h3>\n</div>\n";
  },"useData":true});
this["DanceCard"]["templates"]["orgs"]["org"]["newEvent"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>New Event</h2>\n<form>\n  <div class=\"choose-recur\">\n    <h3>This event occurs:</h3>\n    <label name=\"chooseRpt\"><input class=\"chooseNoRpt\" name=\"chooseRpt\" type=\"radio\">once</label>\n    <label name=\"chooseRpt\"><input class=\"chooseRpt\" name=\"chooseRpt\" type=\"radio\" value=\"true\" >once every month</label>\n    <label name=\"chooseRpt\"><input class=\"chooseRpt\" name=\"chooseRpt\" type=\"radio\" value=\"false\" >once every week</label>\n  </div>\n\n  <div class=\"choose-dates\">\n  </div>\n\n  <div class=\"event-form\">\n  </div>\n</form>\n";
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
  'use strict';

  DanceCard.Views.Footer = DanceCard.Views.Base.extend({
    tagName: 'footer',
  });
})();

(function() {
  'use strict';

  DanceCard.Views.Header = DanceCard.Views.Base.extend({
    tagName: 'header',
    render: function() {
      this.$el.append('<h1><a href="#">Dance Card</a></h1>');
      this.$el.append('<span class="tag-line">Do you want to dance?</span>');
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
      DanceCard.router.navigate('/', {trigger: true});
    }

  });

})();

(function() {
  'use strict';

  DanceCard.Views.Login = DanceCard.Views.Base.extend({
    className: 'modal-view',
    template: DanceCard.templates.login,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'click'                     : 'closeLogin',
      'click .login'              : 'login',
      'click .forgot-password'    : 'forgotPassword',
      'click .send-reset-request' : 'resetPassword',
      'click .close-modal'        : 'closeModal'
    },

    closeLogin: function(e) {
      if ($(e.target)[0] === this.$el[0]) {
        this.remove();
        DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, this);
        window.history.back();
      }
    },

    closeModal: function(e) {
      e.preventDefault();
      $('.reset-password').remove();
      this.remove();
      this.remove();
      DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, this);
      window.history.back();
    },

    resetPassword: function(e) {
      e.preventDefault();
      $('.invalid-form-warning').remove();
      var email = $('.email-reset-password').val();
      Parse.User.requestPasswordReset(email, {
        success: function() {
          $('.reset-password').append('<div class="success-msg"></div>');
          $('.success-msg').html('Please check your email to reset your password.');
          window.setTimeout(function(){
            $('.success-msg').remove();
            $('.reset-password').remove();
          }, 5000);
        },
        error: function() {
          if (arguments[0].code === 125) {
            $('.reset-password').append('<div class="invalid-form-warning invalid"></div>');
            $('.invalid-form-warning').html('please enter a valid email address');
          } else if (arguments[0].code === 205) {
            $('.reset-password').append('<div class="invalid-form-warning invalid"></div>');
            $('.invalid-form-warning').html('sorry, that email address was not found');
          }
        }
      });
    },

    forgotPassword: function(e) {
      e.preventDefault();
      this.$el.append(DanceCard.templates.forgotPassword());

    },

    login: function(e) {
      e.preventDefault();
      $('.invalid-form-warning').remove();
      var self = this;
      var email = this.$('.email-input').val();
      var password = this.$('.password-input').val();
      Parse.User.logIn(email, password, {
        success: function() {
          self.remove();
          DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, self);
          if ($('.logout-msg')) {
            $('.logout-msg').remove();
          }
          DanceCard.session.set('user', Parse.User.current().toJSON());
          if (DanceCard.router.routesHit > 1) {
            window.history.back();
          } else {
            DanceCard.router.navigate('search', {trigger: true});
          }
        }, error: function() {
          $('.login-form').append('<div class="invalid-form-warning invalid"></div>');
          $('.invalid-form-warning').html('<p>username or password was not found</p>');
        }
      });
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
  'use strict';

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
      new DanceCard.Forms.Cal('index-start', 'Start date');
      new DanceCard.Forms.Cal('index-end', 'End date');
    },
    events: {
      'click .search-submit' : 'searchResults',
    },

    searchResults: function(e) {
      e.preventDefault();
      var startDate,
          endDate;
      if ($('.start-date-input').val() !== '  Start date') {
        startDate = moment($('.start-date-input').val()).format();
      } else {
        startDate = new Date();
      }
       if ($('.end-date-input').val() !== '  End date') {
        endDate = moment($('.end-date-input').val()).format();
      } else {
        endDate = DanceCard.Utility.addDays(new Date(), 7);
      }
      var self = this,
          startDateS = startDate.toString().split(' ').join('-'),
          endDateS = endDate.toString().split(' ').join('-'),
          location = $('.search-location').val() || undefined,
          distance = $('.search-distance').val() || 50,
          type = $('.search-type :selected').val().split('-').join(' '),
          searchTerms = [location, distance, startDateS, endDateS, type].join('+'),
          collection;
      this.attrs = {
            startDate: new Date(startDate),
            endDate: DanceCard.Utility.addDays(new Date(endDate), 1),
            distance: distance,
            type: type};
      DanceCard.router.navigate('#/search?' + searchTerms, {trigger: true});
    }

  });

})();

(function() {
  'use strict';

  DanceCard.Views.Search = DanceCard.Views.Base.extend({
    className: 'search',
    template: DanceCard.templates.search,
    render: function() {
      if (this.options.searchTerms) {
        var searchTerms = this.options.searchTerms.split('+');
        this.attrs = {
          startDate: new Date(searchTerms[2]),
          endDate: new Date(searchTerms[3]),
          location: searchTerms[0],
          distance: +searchTerms[1],
          type: searchTerms[4]};
      }
      this.$el.html(this.template(this.attrs));
      this.searchResults();
    },
    events: {
      'click .search-submit' : 'searchResults',
      'click .cancel'        : 'removeAlert'
    },


    removeAlert: function(e) {
      e.preventDefault();
      $('.login-req-notif').remove();
    },

    searchResults: function(e) {
      if (e) e.preventDefault();
      var self = this,
          location = $('.search-location').val() || undefined,
          distance = $('.search-distance').val() || 50,
          type = $('.search-type :selected').val().split('-').join(' '),
          collection,
          searchTerms,
          startDate,
          endDate,
          startDateS,
          endDateS;
      if ($('.search-start-date').val()) {
        startDate = moment($('.search-start-date').val()).format();
      } else {
        startDate = new Date();
      } if ($('.search-end-date').val()) {
        endDate = moment($('.search-end-date').val()).format();
      } else {
        endDate = DanceCard.Utility.addDays(new Date(), 7);
      }
      startDateS = startDate.toString().split(' ').join('-');
      endDateS = endDate.toString().split(' ').join('-');
      this.attrs = {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            distance: distance,
            type: type
          };
      searchTerms = [location, distance, startDateS, endDateS, $('.search-type :selected').val()].join('+');
      DanceCard.router.navigate('#/search?' + searchTerms);
      if (location) {
        DanceCard.Utility.findLocation(location)
        .done(function(location) {
          self.attrs.location = location.point;
          collection = new DanceCard.Collections.SearchEventList(self.attrs);
          self.removeChildren();
          self.makeList(collection, location);
          self.makeMap(collection, location.point);
        });
      } else {
        $('#map-canvas').remove();
        this.$el.prepend('<div class="map-loading"><img class="spinner" src="images/spinner.gif"/></div>');
        navigator.geolocation.getCurrentPosition(_.bind(this.userLocSearchResults, this));
      }
    },

    userLocSearchResults: function(position) {
      $('.map-loading').remove();
      var lat = position.coords.latitude,
          lng = position.coords.longitude,
          point = new Parse.GeoPoint(lat, lng),
          collection,
          searchTerms;
      localStorage.setItem('danceCardLoc', JSON.stringify(position));
      this.attrs.location = point;
      collection = new DanceCard.Collections.SearchEventList(this.attrs);
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
        $container: $('.search-right'),
        collection: collection,
        searchResults: this.attrs,
        location: loc
      }));
    }
  });

})();

(function() {
  'use strict';

  DanceCard.Views.Nav = Parse.View.extend({
    initialize: function(options) {
      this.$container = options.$container;
      this.$container.append(this.el);
      this.render();
      this.model.on('change', this.render, this);
    },
    tagName: 'nav',
    template: DanceCard.templates.nav,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },

    events: {
      'click .logout' : 'logout'
    },

    logout: function(e) {
      e.preventDefault();
      Parse.User.logOut();
      DanceCard.session.set('user', Parse.User.current());
      DanceCard.router.navigate('', {trigger: true});
    }
  });

})();

(function() {
  'use strict';

  DanceCard.Views.Register = DanceCard.Views.Base.extend({
    className: 'modal-view',
    template: DanceCard.templates.register,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit'                 : 'register',
      'keyup .verify-password' : 'verifyPassword',
      'click'                  : 'closeRegister',
      'click .close-modal'     : 'closeModal'
    },

    closeModal: function(e) {
      e.preventDefault();
      this.remove();
      DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, this);
      window.history.back();
    },

    closeRegister: function(e) {
      if ($(e.target)[0] === this.$el[0]) {
        this.remove();
        DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, this);
        window.history.back();
      }
    },

    register: function(e) {
      e.preventDefault();
      var self = this,
          email = this.$('.email-input').val(),
          password = this.$('.password-input').val(),
          verPass = this.$('.verify-password').val(),
          name = this.$('.name-input').val(),
          urlId = name.replace(/[^\w\d\s]/g, '').split(' ').join('_'),
          attrs = {
            email: email,
            name: name,
            cancelNotify: true,
            changeNotify: true,
            customNotify: true,
            urlId: urlId
          };
      if ($('.organizer-input:checked').val() === "true") {
        attrs.organizer = true;
      } else {
        attrs.organizer = false;
      }
      if (this.validateUser(attrs, password)) {
        //check to see if the name already exists as a user
        new Parse.Query('User')
        .equalTo('name', name)
        .find({
          success: function(user) {
            if (user.length === 0) {
              Parse.User.signUp(email, password, attrs, {
                success: function() {
                  DanceCard.session.set('user', Parse.User.current().toJSON());
                    window.history.back();
                  self.remove();
                },
                error: function() {
                  if (arguments[1].code === 202) {
                    $('label[name="email"]').append('<div class="invalid-form-warning"></div>');
                    $('.invalid-form-warning').html('this email is already registered');
                    $('.email-input').addClass('invalid').focus();
                  } else {
                    self.$el.append('<div class="invalid-form-warning invalid"></div>');
                    $('.invalid-form-warning').html('something went wrong, please try again');
                  }
                }
              });
            } else {
              $('label[name="name"]').append('<div class="invalid-form-warning"></div>');
              $('.invalid-form-warning').html('username already exists');
              $('.name-input').addClass('invalid').focus();
            }
          }
        });
      }

    },

    validateUser: function(attrs, password) {
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      if (!attrs.name) {
        $('label[name="name"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('username is required');
        $('.name-input').addClass('invalid').focus();
        return false;
      } else if (!attrs.email) {
        $('label[name="email"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('email required');
        $('.email-input').addClass('invalid').focus();
        return false;
      } else if (attrs.organizer === undefined) {
        $('label[name="organzier"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('you must indicate if you are a dance organizer');
        $('.organizer-label').addClass('invalid').focus();
        return false;
      } else if (!password) {
        $('label[name="password"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('password required');
        $('.password-input').addClass('invalid').focus();
        return false;
      } else {
        return true;
      }
    },

    verifyPassword: function(e) {
      if ($('.password-input').val() !== $('.verify-password').val()) {
        $(e.target).addClass('invalid');
      } else {
        $(e.target).removeClass('invalid');
        $('.submit-register').removeAttr('disabled');
      }
    }
  });

})();

(function() {
  'use strict';

  DanceCard.Views.Settings = DanceCard.Views.Base.extend({

    className: 'settings',
    template: DanceCard.templates.settings,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },

    events: {
      'click .change-password' : 'changePassword',
      'click .change-email'    : 'changeEmail',
      'click .delete-msg'      : 'deleteMsgSettings',
      'click .change-msg'      : 'changeMsgSettings',
      'click .custom-msg'      : 'customMsgSettings',
      'click .org-delete-msg'  : 'orgDeleteMsgSettings',
      'click .org-change-msg'  : 'orgChangeMsgSettings'
    },

    validatePassword: function(attrs) {
      var def = new $.Deferred();
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      if (!attrs.newPassword) {
        $('label[name="new-password"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('new password is required');
        $('.new-password').addClass('invalid').focus();
        def.reject();
      } else if (attrs.newPassword !== attrs.verPassword) {
        $('label[name="ver-password"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('passwords do not match');
        $('.verify-password').addClass('invalid').focus();
      } else if (!attrs.oldPassword) {
        $('label[name="old-password"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('old password is required');
        $('.old-password').addClass('invalid').focus();
      } else {
        Parse.User.logIn(this.model.get('email'), attrs.oldPassword, {
          success: function() {
            def.resolve();
          },
          error: function(a) {
            $('label[name="old-password"]').append('<div class="invalid-form-warning"></div>');
            $('.invalid-form-warning').html('old password is invalid');
            $('.old-password').addClass('invalid').focus();
            def.reject();
          }
        });
      }
      return def.promise();
    },

    changePassword: function(e) {
      e.preventDefault();
      var self = this,
          newPassword = $('.new-password').val(),
          oldPassword = $('.old-password').val(),
          verPassword = $('.verify-password').val(),
          attrs = {
            newPassword: newPassword,
            oldPassword: oldPassword,
            verPassword: verPassword
          };
      this.validatePassword(attrs)
      .done(function(){
        self.model.setPassword(attrs.newPassword);
        self.model.save(null, {
          success: function() {
            $('.change-account')[0].reset();
            $('.password-section').append('<div class="password-success">Your password was successfully changed</div>');
            window.setTimeout(function(){
              $('.password-success').remove();
            }, 4000);
          },
          error: function() {
            $('.password-change').append('<div class="password-error">Something went wrong, please try again</div>');
            window.setTimeout(function(){
              $('.password-error').remove();
            }, 4000);
          }
        });
      });
    },

    changeEmail: function(e) {
      e.preventDefault();
      var self = this;
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      var email = $('.new-email').val();
      if (!email) {
        $('label[name="email"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('email is is required');
        $('.new-email').addClass('invalid').focus();
      } else if (email.indexOf('.') === -1 || email.indexOf('@') === -1) {
        $('label[name="email"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('please enter a valid email address');
        $('.new-email').addClass('invalid').focus();
      } else {
        this.model.setEmail(email);
        this.model.save(null, {
          success: function() {
            self.render();
            $('.email-section').append('<div class="email-success">Your email was successfully changed</div>');
            window.setTimeout(function(){
              $('.email-success').remove();
            }, 4000);
          },
          error: function() {
            if (arguments[1].code === 203) {
              $('label[name=email]').append('<div class="email-error">Sorry, that email is already registered with another user</div>');
              $('.new-email').focus();
              window.setTimeout(function(){
                $('.email-error').remove();
              }, 4000);
            } else {
              $('label[name=email]').append('<div class="email-error">Something went wrong, please try again</div>');
              window.setTimeout(function(){
                $('.email-error').remove();
              }, 4000);
            }
          }
        });
      }
    },

    deleteMsgSettings: function() {
      if (this.model.get('cancelNotify')) {
        this.model.set('cancelNotify', false);
      } else {
        this.model.set('cancelNotify', true);
      }
      this.model.save()
      .then(_.bind(this.render, this));
    },

    changeMsgSettings: function() {
      if (this.model.get('changeNotify')) {
        this.model.set('changeNotify', false);
      } else {
        this.model.set('changeNotify', true);
      }
      this.model.save()
      .then(_.bind(this.render, this));
    },

    customMsgSettings: function() {
      if (this.model.get('customNotify')) {
        this.model.set('customNotify', false);
      } else {
        this.model.set('customNotify', true);
      }
      this.model.save()
      .then(_.bind(this.render, this));
    },

    orgDeleteMsgSettings: function() {
      if (this.model.get('orgCancelNotify')) {
        this.model.set('orgCancelNotify', false);
      } else {
        this.model.set('orgCancelNotify', true);
      }
      this.model.save()
      .then(_.bind(this.render, this));
    },

    orgChangeMsgSettings: function() {
      if (this.model.get('orgChangeNotify')) {
        this.model.set('orgChangeNotify', false);
      } else {
        this.model.set('orgChangeNotify', true);
      }
      this.model.save()
      .then(_.bind(this.render, this));
    },

  });

})();

(function() {
  'use strict';

  DanceCard.Views.Orgs = DanceCard.Views.Base.extend({
    className: 'orgs',
    render: function() {
      new DanceCard.Views.OrgsIndex({
        $container: this.$el
      });
    },
  });

})();

(function(){
  'use strict';

  DanceCard.Views.Dancer = DanceCard.Views.Base.extend({

    className: 'dancer',
    template: DanceCard.templates.dancer,
    render: function() {
      this.templateData = this.model.setTemplateData();
      this.$el.html(this.template(this.templateData));
      this.getDances()
      .then(_.bind(this.renderChildren, this));
    },

    renderChildren: function(collection) {
      var self = this;
      if (collection.models.length > 0) {
        _.each(collection.models, function(model) {
          self.children.push(new DanceCard.Views.EventListItemPartial({
            $container: $('.dancer-attending'),
            model: model
          }));
        });
      } else {
        if (this.templateData.owner) {
          $('.content').append("<p>You have not RSVP'd to any events yet.</p>");
        } else {
          $('.content').append("<p>" + this.model.get('name') + " has not RSVP'd to any events yet.</p>");
        }
      }
    },

    getDances: function() {
      return new DanceCard.Collections.Attending({
        dancer: this.model
      }).fetch();
    }

  });

})();

(function() {
  'use strict';

  DanceCard.Views.Org = DanceCard.Views.Base.extend({
    className: 'org',
    template: DanceCard.templates.orgs.org.index,
    render: function() {
      var self = this,
          collection = new DanceCard.Collections.LoggedOutEventList({
            urlId: this.model.get('urlId')
          });
      this.$el.html(this.template(this.model.toJSON()));
      collection.fetch()
      .then(_.bind(this.renderChildren, this));
    },

    renderChildren: function(collection) {
      this.children.push(new DanceCard.Views.OnetimeEventList({
        $container: $('.content'),
        collection: collection,
        name: this.model.get('name'),
        owner: this.model.authenticated()
      }));
    }
  });

})();

(function() {

  DanceCard.Views.OrgManage = DanceCard.Views.Base.extend({
    className: 'org-manage',
    template: DanceCard.templates.orgs.org.manage,
    render: function() {
      var self = this;
      this.$el.html(this.template({
        model: this.model.toJSON(),
        owner: true,
        loggedIn: true
      }));

      //render a list of their recurring events, each as its own view
      var recurringCollection = new DanceCard.Collections.RecurringEventList({
        urlId: this.model.get('urlId')
      });
      recurringCollection.fetch()
      .then(_.bind(this.renderRecur, this));

      //render a list of their one time events, all in one view
      var onetimeCollection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.model.get('urlId')
      });
      onetimeCollection.fetch()
      .then(_.bind(this.renderOnetime, this));
    },

    renderOnetime: function(collection) {
      new DanceCard.Views.OnetimeEventList({
        $container: $('.content'),
        collection: collection,
        owner: true,
        urlId: this.model.get('urlId')
      });
    },

    renderRecur: function(collection) {
      var self = this;
      if (collection.models.length > 0) {
        _.each(collection.models, function(model) {
          new DanceCard.Views.RecurringEventListItem({
            $container: $('.recurring-event-list'),
            model: model
          });
        });
      } else {
        new DanceCard.Views.RecurringEventListItem({
          $container: $('.recurring-event-list'),
          model: {urlId: self.model.get('urlId')}
        });
      }
    }
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
      if (this.model.toJSON) {
        this.$el.html(this.template(this.model.toJSON()));
        var collection = new DanceCard.Collections.OnetimeEventList({
          orgUrlId: this.model.get('orgUrlId'),
          parentEvent: this.model
        });
        collection.fetch()
        .then(_.bind(this.renderChildren, this));
      } else {
        this.$el.html(this.template(this.model));
      }
    },

    events: {
      'click .toggle-sub-events' : 'toggleChildren',
      'click .delete-recur'     : 'deleteEvent'
    },

    renderChildren: function(collection) {
      this.children.push(new DanceCard.Views.OnetimeEventList({
        $container: this.$el.children('div'),
        collection: collection
      }));
    },

    toggleChildren: function(e) {
      e.preventDefault();
      if (this.$el.children('div').children('ul').css('height') === '1px') {
        this.$el.children('div').children('ul').css('height', 'auto');
        this.$el.children('.toggle-sub-events.show').addClass('hidden').siblings('.toggle-sub-events.hide').removeClass('hidden');
      } else {
        console.log($(e.target))
        this.$el.children('div').children('ul').css('height', 1);
        this.$el.children('.toggle-sub-events.hide').addClass('hidden').siblings('.toggle-sub-events.show').removeClass('hidden');
        // $(e.target).addClass('hidden').siblings('.toggle-sub-events').removeClass('hidden');
      }
    },
    deleteEvent: function(e) {
      e.preventDefault();
      var self = this,
          collection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: this.model.get('orgUrlId'),
        parentEvent: this.model,
        limit: 1000
      });
      collection.fetch()
      .then(function(){
        DanceCard.Utility.destroyAll(collection);
        self.model.destroy();
        self.remove();
      });
    }
  });

})();

(function(){
  'use strict';

  DanceCard.Views.OnetimeEventList = DanceCard.Views.Base.extend({
    tagName: 'ul',
    className: 'onetime-event',
    template: DanceCard.templates.orgs.org._onetimeList,
    render: function() {
      if (this.collection.models.length > 0) {
        this.renderChildren();
      } else {
        var owner = this.options.owner,
            name = this.options.name,
            urlId = this.options.urlId;
        this.$el.html(this.template({owner: owner, name: name, urlId: urlId}));
      }
    },

    renderChildren: function() {
      var self = this;
      _.each(this.collection.models, function(model) {
        self.children.push(new DanceCard.Views.EventListItemPartial({
          $container: self.$el,
          model: model
        }));
      });
    }
  });

})();

(function() {

  DanceCard.Views.CreateEvent = DanceCard.Views.Base.extend({
    tagName: 'div',
    className: 'new-event',
    template: DanceCard.templates.orgs.org.newEvent,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },
    events: {
      'click .chooseNoRpt'           : 'noRpt',
      'click .chooseRpt'             : 'rpt',
      'change .weekly-option-input'  : 'setWk',
      'change .monthly-option-input' : 'setMo',
      'keyup .event-address-input'   : 'getLocation',
      'click .submit-event'          : 'createEvent',
      'click .pre-reg-req-input'     : 'regReq',
      'click .multi-day-input'       : 'multiDay'
    },

    setMo: function() {
      this.model.set('monthlyRpt', $('.monthly-option-input :selected').val());
    },

    setWk: function() {
      this.model.set('weeklyRpt', $('.weekly-option-input :selected').val());
      this.model.set('weeklyRptName', $('.weekly-option-input :selected').text());
    },

    rpt: function() {
      this.model.set('recurring', true);
      $('.event-form').html(DanceCard.templates.orgs.org._recurringForm(this.model.toJSON()));
      $('.choose-dates').html(DanceCard.templates.orgs.org.chooseWkMo(this.model.toJSON()));
      if (this.startCal) {
        $('.date-selector').remove();
      }
      if ($('.chooseRpt:checked').val() === "true") {
        this.model.set('recurMonthly', true);
        this.model.set('weeklyRpt', 1);
        this.model.set('weeklyRptName', "Monday");
        $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(this.model.toJSON()));
      } else {
        this.model.set('recurMonthly', false);
        this.model.set('monthlyRpt', 'first');
        $('.choose-monthly-rpt').html('');
      }
    },

    noRpt: function(e) {
      this.model.set('recurring', false);
      this.model.set('recurMonthly', undefined);
      this.model.set('weeklyRpt', undefined);
      this.model.set('monthlyRpt', undefined);
      this.model.set('weeklyRptName', undefined);
      $('.choose-dates').html(DanceCard.templates.orgs.org.chooseDate(this.model.toJSON()));
      $('.event-form').html(DanceCard.templates.orgs.org._onetimeForm(this.model.toJSON()));
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
      console.log('validating event');
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
      console.log(endDate)
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
      var self = this;
      this.model.setTemplateData(this)
      .done(function() {
        self.$el.html(self.template(self.templateData));
        self.makeMap();
      });
    },

    events: {
      'click .rsvp'              : 'rsvp',
      'click .unrsvp'            : 'cancelRSVP',
      'click .cancel'            : 'removeAlert'
    },

    rsvp: function(e) {
      e.preventDefault();
      var self = this;
      this.model.rsvp()
      .done(function() {
        self.render();
      })
      .fail(function() {
        // what to do when something goes wrong
        if (arguments[0] === "user not loggedIn") {
          self.$el.append(DanceCard.templates._loginRequired());
          console.log('something went wrong', arguments);
        }
      });
    },

    removeAlert: function(e) {
      e.preventDefault();
      $('.login-req-notif').remove();
    },

    cancelRSVP: function(e) {
      e.preventDefault();
      var self = this;
      this.model.cancelRSVP()
      .done(function() {
        self.render();
      })
      .fail(function() {
        console.log('something went wrong', arguments);
      });
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

  });

})();

(function(){
  'use strict';

  DanceCard.Views.EventManage = DanceCard.Views.Base.extend({
    className: 'event-manage',
    template: DanceCard.templates.orgs.org.eventManage,
    render: function() {
      var self = this;
      this.model.setTemplateData(this)
      .then(function(){
        self.$el.html(self.template(self.templateData));

        $('.event-header').html(DanceCard.templates.orgs.org._eventHeader(self.templateData));
        if (self.model.get('recurring')) {
          $('.event-recur').html(DanceCard.templates.orgs.org._eventRecur(self.templateData));
        }
        $('.event-info').html(DanceCard.templates.orgs.org._eventInfo(self.templateData));
        $('.venue-info').html(DanceCard.templates.orgs.org._venueInfo(self.templateData));
        self.makeMap();
        if (self.model.get('recurMonthly')) {
          $('.choose-monthly-rpt').html(DanceCard.templates.orgs.org.chooseMoRpt(self.templateData));
        }
      });
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
        $container: $('.map-container'),
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
        error: function() {
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
        this.makeMap();
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
      $('.event-name').html(this.model.get('name'));
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
      this.makeMap();
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

  DanceCard.Views.Email = DanceCard.Views.Base.extend({
    tagName: 'composeEmail',
    template: DanceCard.templates.orgs.org.email,
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'click .send-email'   : 'sendEmail',
      'click .cancel-email' : 'cancelEmail',
      'click .close-modal'  : 'cancelEmail'
    },

    cancelEmail: function(e) {
      e.preventDefault();
      DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, self);
      this.remove();
      if (DanceCard.router.routesHit === 1) {
        DanceCard.router.navigate('#/orgs/org/' + this.model.id, {trigger: true});
      } else {
        window.history.back();
      }
    },

    sendEmail: function(e) {
      e.preventDefault();
      var self = this,
          body = $('.email-body').val(),
          subject = $('.email-subject').val();
      if (this.validateEmail(body, subject)) {
        Parse.Cloud.run('sendEmail', {
          event: this.model.toJSON(),
          body: body,
          subject: subject
        }, {
          success: function() {
            DanceCard.router.mainChildren = _.without(DanceCard.router.mainChildren, self);
            self.remove();
            if (DanceCard.router.routesHit === 1) {
              DanceCard.router.navigate('#/orgs/org/' + self.model.id, {trigger: true});
            } else {
              window.history.back();
            }
            $('main').prepend('<div class="email-success">Your message was successfully sent</div>');
            window.setTimeout(function(){
              $('.email-success').remove();
            }, 4000);
          }, error: function() {
            $('main').prepend('<div class="email-failure">Your message was not sent. Please try again</div>');
            window.setTimeout(function(){
              $('.email-failure').remove();
            }, 4000);
            console.log('error', arguments);}
        });
      }
    },

    validateEmail: function(body, subject) {
      $('.invalid-form-warning').remove();
      $('.invalid').removeClass('invalid');
      if (!subject) {
        $('label[name="subject"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('subject required');
        $('.email-subject').addClass('invalid').focus();
        return false;
      } else if (!body) {
        $('label[name="body"]').append('<div class="invalid-form-warning"></div>');
        $('.invalid-form-warning').html('body required');
        $('.email-body').addClass('invalid').focus();
      } else {
        return true;
      }
    }
  });

})();

(function() {
  'use strict';

  DanceCard.Views.MapPartial = DanceCard.Views.Base.extend({
    initialize: function(options) {
      this.options = options;
      this.$container = options.$container;
      this.$container.prepend(this.el);
      this.children = [];
      this.render();
    },
    id: 'map-canvas',
    render: function() {
      this.$el.html('<img class="spinner" src="../images/spinner.gif"/>');
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
        var mapUrl = self.getMapUrl(model);
        self.children.push(new DanceCard.Views.MarkerPartial({
          $container: self.$el,
          model: model,
          map: self.map,
          bounds: self.zoomArray,
          mapUrl: mapUrl
        }));
      });
    },

    getMapUrl: function(model) {
      var position = JSON.parse(localStorage.getItem('danceCardLoc')),
          start = position.coords.latitude + ',' + position.coords.longitude,
          end = model.get('venue').fullAddress.split(' ').join('+'),
          url = 'https://www.google.com/maps/dir/' + start + '/' +  end;
      return url;
    }

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
      this.options.bounds.push(position);
      this.marker = new google.maps.Marker({
        map: this.options.map,
        position: position,
        icon: image
      });
      this.setTemplateData()
      .done(function() {
        self.templateData.mapUrl = self.options.mapUrl;
        self.infowindow = new google.maps.InfoWindow({
          content: DanceCard.templates._infoWindow(self.templateData)
        });
        google.maps.event.addListener(self.marker, 'click', function() {
          self.infowindow.open(self.options.map, self.marker);
        });
        self.options.bounds.push(position);
      });
    },

    setTemplateData: function() {
      var self = this,
          def = new $.Deferred();
      this.templateData = {
        loggedIn: !!DanceCard.session.get('user'),
        event: this.model.toJSON(),
        dancer: DanceCard.session.get('dancer')
      };
      if (DanceCard.session.get('loggedIn') && DanceCard.session.get('user').urlId) {
        if (this.model.get('orgUrlId') === DanceCard.session.get('user').urlId) {
          this.templateData.owner = true;
          this.templateData.eventOrg = DanceCard.session.get('user');
          def.resolve();
        } else {
          new Parse.Query('User').get(this.model.get('org').id, {
            success: function(org) {
              self.templateData.eventOrg = org.toJSON();
              if (self.templateData.dancer) {
                var relation = Parse.User.current().relation('attending'),
                    query = new Parse.Query('Event');
                relation.query().find()
                .then(function(events){
                  self.templateData.attending = events;
                  def.resolve();
                });
              } else {
                def.resolve();
              }
            }
          });
        }
      } else {
        def.resolve();
      }
      return def.promise();
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
    tagName: 'ul',
    className: 'search-results-list',
    template: DanceCard.templates._eventList,
    render: function() {
      this.collection.fetch()
      .then(_.bind(this.renderChildren, this));
    },
    renderChildren: function(collection) {
      this.removeChildren();
      var self = this;
      this.$el.html(this.template({
        results: collection.models,
        one: collection.models.length === 1,
        count: collection.models.length,
      }));
      if (collection.models.length > 0) {
        _.each(collection.models, function(model){
          self.children.push(new DanceCard.Views.EventListItemPartial({
            $container: self.$el,
            model: model,
            parent: self
          }));
        });
      }
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
      var self = this;
      this.model.setTemplateData(this)
      .done(function() {
        self.$el.html(self.template(self.templateData));
      });
    },

    events: {
      'click .rsvp'         : 'rsvp',
      'click .unrsvp'       : 'cancelRSVP',
      'click .delete-event' : 'delete',
      'click .cancel'       : 'removeAlert'

    },

    delete: function(e) {
      e.preventDefault();
      var self = this;
      this.model.destroy({
        success: function(){
          self.remove();
          if (self.options.parent) self.options.parent.render();
        }
      });
    },

    removeAlert: function(e) {
      e.preventDefault();
      $('.login-req-notif').remove();
    },

    rsvp: function(e) {
      e.preventDefault();
      var self = this;
      this.model.rsvp()
      .done(function() {
        self.render();
      })
      .fail(function() {
        // what to do when something goes wrong
        if (arguments[0] === "user not loggedIn") {
          self.$el.append(DanceCard.templates._loginRequired());
          console.log('something went wrong', arguments);
        }
      });
    },

    cancelRSVP: function(e) {
      e.preventDefault();
      var self = this;
      this.model.cancelRSVP()
      .done(function() {
        if (window.location.hash === '#/dancers/' + Parse.User.current().get('urlId')) {
          self.remove();
        } else {
          self.render();
        }
      })
      .fail(function() {
        console.log('something went wrong', arguments);
      });
    },



  });

})();

(function() {
  'use strict';

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

  setTemplateData: function(view) {
    var self = this,
        def = new $.Deferred();
    view.templateData = {
      loggedIn: !!DanceCard.session.get('user'),
      event: this.toJSON(),
      edit: {}
    };
    if (view.templateData.loggedIn) {
      if (this.get('orgUrlId') === Parse.User.current().get('urlId')) {
        view.templateData.owner = true;
        view.templateData.eventOrg = Parse.User.current();
        def.resolve();
      } else {
        view.templateData.owner = false;
      }
    }
    new Parse.Query('User').get(this.get('org').id, {
      success: function(org) {
        view.templateData.eventOrg = org.toJSON();
        if (Parse.User.current()) {
          var relation = Parse.User.current().relation('attending'),
             query = new Parse.Query('Event');
         relation.query().find()
         .then(function(events){
           events = _.map(events, function(event) {
             return event.id;
           });
           view.templateData.attending = _.contains(events, self.id);
           def.resolve();
         });
        } else {
         def.resolve();
        }
      }, fail: function() {
        console.log('didnot get the org');
      }
    });
    return def.promise();
  },

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

  rsvp: function() {
    var def = new $.Deferred();
    if (Parse.User.current()) {
      var eRelation = this.relation('dancers');
      eRelation.add(Parse.User.current());
      this.save(null, {
        success: function(event){
          var uRelation = Parse.User.current().relation('attending');
          uRelation.add(event);
          Parse.User.current().save(null, {
            success: function(user) {
              def.resolve({event: event, user:user});
              },
            fail: function() {
              def.reject('save user failed');
              }
          });
        },
        fail: function() {
          def.reject('save event failed');
          }
      });
    } else {
      def.reject('user not loggedIn');
    }
    return def.promise();
  },

  cancelRSVP: function() {
    var self = this;
    var def = new $.Deferred(),
        eRelation = this.relation('dancers'),
        uRelation = Parse.User.current().relation('attending');
    eRelation.remove(Parse.User.current());
    uRelation.remove(this);
    this.save(null, {
      success: function() {
        Parse.User.current().save(null, {
          success: function() {
            self.save().then(def.resolve);
            // def.resolve();
          },
          fail: function() {
            def.reject('save user failed');
          }
        });
      },
      fail: function() {
        def.reject('save event failed');
      }
    });
    return def.promise();
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
    var self = this;
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

  setTemplateData: function() {
    var owner = Parse.User.current().get('urlId') === window.location.hash.split('/')[2],
        templateData = {
          user: this.toJSON(),
          owner: owner};
    return templateData;
  }
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

(function(){
  'use strict';

  DanceCard.Collections.Attending = Parse.Collection.extend({
    initialize: function(options){
      this.dancer = options.dancer;
      var relation = this.dancer.relation('attending');
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1);
      var query = new Parse.Query('Event')
        .ascending('startDate')
        .equalTo('orgUrlId', this.orgUrlId)
        .equalTo('recurring', false)
        .greaterThan('startDate', yesterday)
        .limit(10);
      this.query = relation.query();
    },
    model: DanceCard.Models.Event,

  });

})();
