DanceCard.Models.Session = new Parse.Object.extend({
  className: "Session",
  initialize: function(){
    var self = this;
    if (Parse.User.current()) {
      this.set('user', Parse.User.current().toJSON());
      if (!this.get('user').organizer) {
        this.set('dancer', true);
      }
    } else {
      this.set('user', Parse.User.current());
    }
  }
});
