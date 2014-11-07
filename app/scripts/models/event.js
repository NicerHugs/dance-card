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

  rsvp: function() {
    var def = new $.Deferred();
    if (Parse.User.current()) {
      var eRelation = this.relation('dancers');
      eRelation.add(Parse.User.current());
      this.save(null, {
        success:function(event){
          uRelation = Parse.User.current().relation('attending');
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
      def.reject('no user');
    }
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
