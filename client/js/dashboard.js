Template.dashboard.fbPicURL = Meteor.shared.fbPicURL;
Template.dashboard.noChallenges = function(){
  return Bets.find({placer: Meteor.userId()}).count() == 0;
};
