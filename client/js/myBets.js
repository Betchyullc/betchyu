Template.myBets.bets = function() {
  return Bets.find({placer: Meteor.userId()});
};
Template.myBets.invites = function(betId){
  return Invites.find({bet:betId, uncreated:{$not: true}});
};
Template.myBets.getName = Meteor.shared.getName;
Template.myBets.created = function(){ Meteor.shared.logPageView("myBets");};
