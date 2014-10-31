(function() {

  DanceCard.Views.OrgIndex = DanceCard.Views.Base.extend({
    className: 'org-index',
    template: DanceCard.templates.orgs.org.index,
    render: function() {
      if (Parse.User.current().get('urlId') === this.model.get('urlId')){
        //render logged in user version
        new DanceCard.Views.OrgManage({
          $container: this.$el,
          model: this.model
        });
      } else {
        //render non-logged in view
        this.$el.html(this.template(this.model.toJSON()));
      }

    },
  });

})();
