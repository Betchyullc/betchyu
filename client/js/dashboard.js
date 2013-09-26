Template.dashboard.noChallenges = function(){
  return Bets.find({placer: Meteor.userId()}).count() == 0;
};
Template.dashboard.invites = function(){
  return []; // need to actually model this.
};
Template.dashboard.showInvites = function(){
  return Session.get('dash-showInvites');
};
Template.dashboard.bets = function(){
  return Bets.find({friend: Meteor.user().profile.name});
};
Template.dashboard.showBets = function(){
  return Session.get('dash-showBets');
};
Template.dashboard.events({
  'click #showBets': function(){
    var show = Session.get('dash-showBets');
    if(show)
      Session.set('dash-showBets',false);
    else
      Session.set('dash-showBets',true);
  },
  'click #showInvites': function(){
    var show = Session.get('dash-showInvites');
    if(show)
      Session.set('dash-showInvites', false);
    else
      Session.set('dash-showInvites', true);
  }
});
