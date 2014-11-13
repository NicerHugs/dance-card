DanceCard.Models.User = Parse.Object.extend({
  className: 'User',
  loggedIn: function() {
    if (DanceCard.session.get('user')){
      return true;
    } else {
      return false;
    }
  },

  setTemplateData: function() {
    var templateData = {
      user: this.toJSON(),
    };
    if (this.loggedIn()) {
      var owner = Parse.User.current().get('urlId') === window.location.hash.split('/')[2];
      templateData.owner = owner;
    }     
    return templateData;
  }
});
