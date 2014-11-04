(function(){
  'use strict';

  Handlebars.registerHelper('select', function(value, options) {
    var val = '"' + value.split(' ').join('-') + '"',
        re = new RegExp(val, 'g'),
       newStr = options.fn(this).replace(re, val + ' selected');
    return newStr;
  });

})();
