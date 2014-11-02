DanceCard.Models.Event = Parse.Object.extend({
  className: 'Event',

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
    options = {
      weeklyRpt: $('.weekly-option-input').val(),
      weeklyRptName: $('.weekly-option-input :selected').text(),
      recurMonthly: recurMonthly,
      monthlyRpt: $('.monthly-option-input').val(),
      endDate: new Date($('.event-end-date-input').val())
    };
    this.set(options);
    //if anything other than end date changed, delete all children, and build all new children.
    //if only end date changed, just add new children
    return this.save();
  },
  saveInfo: function() {
    console.log('saving info');
  },
  saveVenue: function() {
    console.log('saving venue');
  }
});
