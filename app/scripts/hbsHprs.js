(function(){
  'use strict';

  Handlebars.registerHelper('select', function(value, options) {
    var val = '"' + value.split(' ').join('-') + '"',
        re = new RegExp(val, 'g'),
       newStr = options.fn(this).replace(re, val + ' selected');
    return newStr;
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

})();
