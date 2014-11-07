(function() {
  'use strict';

  DanceCard.Views.MarkerPartial = DanceCard.Views.Base.extend({
    render: function() {
      var self = this,
          position = new google.maps.LatLng(this.model.get('point')._latitude, this.model.get('point')._longitude),
          color = this.setColor(this.model),
          image= "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color;
      this.options.bounds.push(position);
      this.marker = new google.maps.Marker({
        map: this.options.map,
        position: position,
        icon: image
      });
      this.setTemplateData()
      .done(function() {
        self.infowindow = new google.maps.InfoWindow({
          content: DanceCard.templates._infoWindow(self.templateData)
        });
        google.maps.event.addListener(self.marker, 'click', function() {
          self.infowindow.open(self.options.map, self.marker);
        });
        self.options.bounds.push(position);
      });
    },

    setTemplateData: function() {
      var self = this,
          def = new $.Deferred();
      this.templateData = {
        loggedIn: !!DanceCard.session.get('user'),
        event: this.model.toJSON(),
        dancer: DanceCard.session.get('dancer')
      };
      if (this.model.get('orgUrlId') === DanceCard.session.get('user').urlId) {
        this.templateData.owner = true;
        this.templateData.eventOrg = DanceCard.session.get('user');
        def.resolve();
      } else {
        new Parse.Query('User').get(this.model.get('org').id, {
          success: function(org) {
            self.templateData.eventOrg = org.toJSON();
            if (self.templateData.dancer) {
              var relation = Parse.User.current().relation('attending'),
                  query = new Parse.Query('Event');
              relation.query().find()
              .then(function(events){
                self.templateData.attending = events;
                def.resolve();
              });
            } else {
              def.resolve();
            }
          }
        });
      }
      return def.promise();
    },

    setColor: function(model) {
      var iconColors = {
        a: ['contra dance', '00A79D'],
        b: ['caller workshop', '21409A'],
        c: ['dance weekend', '61D515'],
        d: ['square dance', '00ACEF'],
        e: ['waltz workshop', '9079DB'],
        f: ['waltz', 'F36523'],
        g: ['contra workshop', 'FFDE17'],
        h: ['advanced contra dance', 'FF0A81']
      },
      color = _.filter(iconColors, function(color) {
        if (model.get('type') === color[0]){
          return color;
        }
      })[0][1];
      return color;
    }

  });

})();
