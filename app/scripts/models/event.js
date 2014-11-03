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
      var newEvent = new DanceCard.Models.Event(parent),
          idName = parent.get('name').replace(/[^\w\d\s]/g, ''),
          dateString = date.toDateString().split(' ').join('_'),
          id = idName.split(' ').join('_') + '_' + dateString;
      newEvent.set({
        startDate: date,
        endDate: date,
        recurring: false,
        parentEvent: parent,
        parentEventUrlId: parent.get('urlId'),
        urlId: id
      });
      newEvent.save();
    });
  },

  saveHeader: function(orgUrlId, parentEvent, limit, attrs, dateAttrs) {
    this.set(attrs);
    if (dateAttrs.startDate) {
      this.set(dateAttrs);
    }
    if (this.get('recurring')) {
      var collection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: orgUrlId,
        parentEvent: parentEvent,
        limit: limit
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

  saveRecur: function(orgUrlId, parentEvent, limit, attrs) {
    var self = this,
        endDate = new Date(moment($('.event-end-date-input').val()).format()),
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
      orgUrlId: orgUrlId,
      parentEvent: parentEvent,
      limit: 1000
    });
    collection.fetch()
    .then(function(){
      if (_.isEqual(oldAttrs, attrs)) {
        // if only the end date changes, add new children until new endDate
        var maxDate = _.max(collection.models, function(model){
           return model.get('startDate');
        });
        startDate = new Date(maxDate.get('startDate'));
        startDate.setDate(startDate.getDate()+1);
        startDate = DanceCard.Utility.nextDateOfWeek(startDate, attrs.weeklyRpt);
        attrs.endDate = endDate;
        self.set(attrs);
        self.createChildren(self, startDate);
      } else {
        // if anything other than end date changed, delete all children, and build all new children.
        attrs.startDate = DanceCard.Utility.nextDateOfWeek(new Date(), day);
        attrs.endDate = endDate;
        self.set(attrs);
        // this is a crazy convoluted way to destroy all the children of this
        // model. try as i might i couldn't get any of parse's built in functions
        // to work for destroying the items in the collection and ultimately opted
        // to do it manually.
        var ids = _.map(collection.models, function(model){
          return model.id;
        });
        _.each(ids, function(id) {
          var query = new Parse.Query('Event');
          query.get(id, {success: function(event){
            event.destroy({success: function(){
              console.log('deleted', id);
            }, error: function(error) {
              console.log('error', error);
            }});
          }});
        });
        self.createChildren(self);
      }
    });
    return this.save();
  },

  saveInfo: function(orgUrlId, parentEvent, limit, attrs) {
    this.set(attrs);
    if (this.get('recurring')) {
      var collection = new DanceCard.Collections.OnetimeEventList({
        orgUrlId: orgUrlId,
        parentEvent: parentEvent,
        limit: limit
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

  saveVenue: function(attrs) {
    this.set('venue', attrs);
    console.log(this);
    return this.save();
  }
});
