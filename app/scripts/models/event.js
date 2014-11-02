DanceCard.Models.Event = Parse.Object.extend({
  className: 'Event',

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

  buildDateArray: function() {
    var date = new Date(this.get('startDate')),
        startDate = this.get('startDate'),
        endDate = this.get('endDate') || DanceCard.Utility.addYear(startDate),
        msBetween = endDate - startDate,
        weeks;
    // there are 86400000 milliseconds in a day
    days = msBetween/86400000;
    weeks = Math.floor(days/7);
    var arrayOfDates = [new Date(this.get('startDate'))];
    _.times(weeks-1, function(n) {
      arrayOfDates.push(new Date(date.setDate(date.getDate() + 7)));
    });
    if (this.get('recurMonthly')) {
      arrayOfDates = this.filterByWeekOfMonth(arrayOfDates);
    }
    return arrayOfDates;
  },

  filterByWeekOfMonth: function(dates) {
    var week = this.get('monthlyRpt');
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
        var month = date.getMonth();
        date.setDate(date.getDate() + 7);
        if (month !== date.getMonth()) {
          return date;
        }
      });
    }
    return dates;
  },

  saveHeader: function(orgUrlId, parentEvent, limit) {
    options = {
      name: $('.event-name-input').val(),
      type: $('.event-type-input').val(),
      startTime: $('.event-start-time-input').val(),
      endTime: $('.event-end-time-input').val()
    };
    dateOptions = {
      startDate: new Date($('.event-start-date-input').val()),
      endDate: new Date($('.event-end-date-input').val()),
      multiDay: $('.multi-day-input').prop('checked')
    };
    this.set(options);
    if (startDate) {
      this.set(dateOptions);
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
          event.set(options);
          if (startDate) {
            event.set(dateOptions);
          }
          event.save().then(function(event){console.log(event);});
        });
      });
    }
    return this.save();
  },

  saveRecur: function(orgUrlId, parentEvent, limit) {
    var recurMonthly;
    if ($('.chooseRpt:checked').val() === "true") {
      recurMonthly = true;
    } else {
      recurMonthly = false;
    }
    var endDate = new Date(moment($('.event-end-date-input').val()).format());
    var oldOptions = {
      weeklyRpt: this.get('weeklyRpt'),
      weeklyRptName: this.get('weeklyRptName'),
      recurMonthly: this.get('recurMonthly'),
      monthlyRpt: this.get('monthlyRpt'),
    };
    var options = {
      weeklyRpt: $('.weekly-option-input').val(),
      weeklyRptName: $('.weekly-option-input :selected').text(),
      recurMonthly: recurMonthly,
      monthlyRpt: $('.monthly-option-input').val(),
    };
    this.set(options);
    this.set('endDate', endDate);
    if (_.isEqual(oldOptions, options)) {
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
