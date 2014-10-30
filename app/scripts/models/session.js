DanceCard.Models.Session = new Parse.Object.extend({
  className: "Session",
  initialize: function(){
    this.set('user', Parse.User.current());
  }
});
