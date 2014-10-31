(function() {

  DanceCard.Views.OrgManage = DanceCard.Views.Base.extend({
    className: 'org-manage',
    template: DanceCard.templates.orgs.org.manage,
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
    },
  });

})();
