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
  }
});
