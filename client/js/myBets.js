Template.myBets.wonBet = function(bet){
  return bet.winner == "placer";
};
Template.myBets.activeBet = function(bet){
  if( Meteor.shared.days_left(bet) == "ZERO" && bet.winner)
    return false;
  return true;
};
Template.myBets.bets = function() {
  return Bets.find({placer: Meteor.userId()});
};
Template.myBets.invites = function(betId){
  return Invites.find({bet:betId, uncreated:{$not: true}});
};
Template.myBets.bet_name = Meteor.shared.bet_name;
Template.myBets.days_left = Meteor.shared.days_left;
Template.myBets.created = function(){ Meteor.shared.logPageView("myBets");};
