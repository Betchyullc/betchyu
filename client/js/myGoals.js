Template.myGoals.activeBet = function(bet){
  if( Meteor.shared.days_left(bet) == "ZERO")
    return false;
  return true;
};
Template.myGoals.bets = function() {
  return Bets.find({placer: Meteor.userId()});
};
Template.myGoals.invites = function(betId){
  return Invites.find({bet:betId, uncreated:{$not: true}});
};
Template.myGoals.bet_name = Meteor.shared.bet_name;
Template.myGoals.days_left = Meteor.shared.days_left;
Template.myGoals.created = function(){ Meteor.shared.logPageView("myGoals");};
