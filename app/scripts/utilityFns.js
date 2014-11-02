(function(){
  'use strict';

  DanceCard.Utility = {};

  DanceCard.Utility.addYear = function(startDate) {
    var date = new Date(startDate);
    date.setFullYear(date.getFullYear() + 1);
    return date;
  };

})();
