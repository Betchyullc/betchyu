Template.myBets.bets = function() {
  return Bets.find({placer: Meteor.userId()});
};
Template.myBets.invites = function(betId){
  return Invites.find({bet:betId, uncreated:{$not: true}});
};
Template.myBets.bet_name = function(bet){
  switch(bet.goal.type){
    case "calories":
      return bet.goal.value+" calories per day for "+bet.days+" days";
    case "workout":
      return bet.goal.value+" workouts per day for "+bet.days+" days";
    case "run":
      return bet.goal.value+" miles per day for "+bet.days+" days";
    case "lbs":
    default:
      return bet.goal.value+" lbs in "+bet.days+" days"; 
  }
};
Template.myBets.getName = Meteor.shared.getName;
Template.myBets.created = function(){ Meteor.shared.logPageView("myBets");};
