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
        var lat = results[0].geometry.location.k,
            lng = results[0].geometry.location.B,
            point = new Parse.GeoPoint({latitude: lat, longitude: lng}),
            location = {
                        addressParts: results[0].address_components,
                        fullAddress: results[0].formatted_address,
                        };
            console.log(results);
            deferred.resolve({point: point, location: location});
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
        query.get(id, {success: function(event){
          event.destroy({success: function(){
          }, error: function(error) {
            console.log('error', error);
          }});
        }});
      });
      return collection;
    }

  };

})();
