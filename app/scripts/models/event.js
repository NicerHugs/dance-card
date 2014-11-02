DanceCard.Models.Event = Parse.Object.extend({
  className: 'Event',
  saveHeader: function() {
    var name = $('.event-name-input').val();
    var type = $('.event-type-input').val();
    var recurMonthly = $('.chooseRpt:checked').val() || undefined;
    var monthlyRpt = $('.monthly-option-input').val() || undefined;
    var weeklyRpt = $('.weekly-option-input').val() || undefined;
    var weeklyRptName = $('.weekly-option-input :selected').text() || undefined;
    var startTime = $('.event-start-time-input').val();
    var endTime = $('.event-end-time-input').val();
    var startDate = $('.event-start-date-input').val();
    this.set({
      name: name,
      type: type,
      recurMonthly: recurMonthly,
      weeklyRpt: weeklyRpt,
      weeklyRptName: weeklyRptName,
      startTime: startTime,
      endTime: endTime
    });
    if (startDate) {
      this.set('startDate', startDate);
    }
    console.log('saving header', this);
  },
  saveRecur: function() {
    console.log('saving schedule');
  },
  saveInfo: function() {
    console.log('saving info');
  },
  saveVenue: function() {
    console.log('saving venue');
  }
});
