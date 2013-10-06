Template.dashboard.fbPicURL = Meteor.shared.fbPicURL;
Template.dashboard.noChallenges = function(){
  return Bets.find({placer: Meteor.userId()}).count() == 0;
};
Template.dashboard.amountOffered = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: false}).count();
};
