Template.landing.created = function(){Meteor.shared.logPageView("landing");};

Template.landing.newBet = function(){
  Meteor.call('getNewBets', function(err, res){
    Session.set('new bets', res);
  });
  return Session.get('new bets');
};
Template.landing.betString = function(){
  var type = this.goal.type;
  switch(type){
    case "run":
      return "run "+this.goal.value+" miles";
    case "calories":
      return "eat only "+this.goal.value+" calories";
    case "workout":
      return "workout "+this.goal.value+" times";
    case "lbs":
    default:
      return "lose "+this.goal.value+" lbs";
  }
};
