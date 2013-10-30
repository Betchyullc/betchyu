Template.layout.events({
  'click .close-main-block': function(e){
    var $t = $(e.currentTarget);
    var $p = $t.parent();
    var height = $p.height();
    if(height != 10){
      $p.css("overflow", "hidden").animate({
        height: "10px"
      });
    }
  },
  'click .main-block': function(e){
    var $t = $(e.currentTarget);
    var height = $t.height();
    if(height == 10){
      $t.attr("style", "");
    }
  },
  'click #showMenu': function(){
    Meteor.shared.showModal('#mainMenuModal');
  },
  'click .menu-body a': function(e){
    e.preventDefault();
    $('.modal').slideUp();
  },
  'click .signout': function(){
    $('.modal').slideUp(function(){
      Meteor.logout();
    });
  },
  'click #declineBet': function(){
    var invId = Invites.findOne({
      bet: this._id,
      inviter: this.placer,
      invitee: Meteor.userId()
    })._id;
    Invites.update(invId, {
      $set: {accepted: false, declined: true}
    });
  },
  'click #acceptBet': function(){
    var invId = Invites.findOne({
      bet: this._id,
      inviter: this.placer,
      invitee: Meteor.userId()
    })._id;
    Invites.update(invId, {
      $set: {accepted: true, declined: false}
    });
  },
  'click .inviteToBetchyu': function(e){
    Meteor.shared.makeFB();
    FB.ui({
      method: 'feed',
      link: window.location.origin,
      to: $(e.target).data('fbid'),
      name: 'Betchyu',
      caption: Meteor.user().profile.name + ' wants you to join Betchyu!'
    });
  }
});
