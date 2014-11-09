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
    var owner = Parse.User.current().get('urlId') === window.location.hash.split('/')[2];

    var templateData = {
      model: this.toJSON(),
      owner: owner
    };
    return templateData;
  }
});
