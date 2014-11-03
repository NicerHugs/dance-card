DanceCard.Models.Event = Parse.Object.extend({
  className: 'Event',

  createChildren: function(parent, startDate, endDate) {
    var week = parent.get('monthlyRpt'),
        dates = DanceCard.Utility.buildWeeklyDateArray(startDate, endDate);
    console.log(week);
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

  setRecurStartDate: function() {
    var startDate = new Date(),
        recurDay = +this.get('weeklyRpt'),
        diff;
    if (startDate.getDay() === recurDay) {
      return startDate;
    } else {
      if (recurDay - startDate.getDay() > 0) {
        diff = recurDay - startDate.getDay();
        startDate.setDate(startDate.getDate() + diff);
        return startDate;
      } else {
        diff = 7 + (recurDay - startDate.getDay());
        startDate.setDate(startDate.getDate() + diff);
        return startDate;
      }
    }
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
    var endDate = new Date(moment($('.event-end-date-input').val()).format()),
        oldAttrs = {
                      weeklyRpt: this.get('weeklyRpt'),
                      weeklyRptName: this.get('weeklyRptName'),
                      recurMonthly: this.get('recurMonthly'),
                      monthlyRpt: this.get('monthlyRpt'),
                    },
        recurMonthly;
    if ($('.chooseRpt:checked').val() === "true") {
      recurMonthly = true;
    } else {
      recurMonthly = false;
    }
    this.set(attrs);
    this.set('endDate', endDate);
    if (_.isEqual(oldAttrs, attrs)) {
      // just add new children to the list of child dates
    } else {
      // if anything other than end date changed, delete all children, and build all new children.
    }
    return this.save();
  },

  saveInfo: function() {
    console.log('saving info');
  },

  saveVenue: function() {
    console.log('saving venue');
  }
});
