Template.viewBet.isAccepted = function(){
  var bet_obj = Bets.findOne(Session.get('bet'));
  var invs = Invites.find({bet: bet_obj._id}); // all the invites for this bet.
  var invite = _.find(invs.fetch(), function(e){
    return e.invitee == Meteor.userId();
  });
  if (invite == undefined) return true;
  return invite.accepted;
};
Template.viewBet.bet = function(){
  return Bets.find(Session.get('bet'));
};
Template.viewBet.needToInvite = function(fbid){
  if (Meteor.userId() != Bets.findOne(Session.get('bet')).placer)
    return false;
  return Meteor.users.findOne({"services.facebook.id":fbid}) == undefined;
};
Template.viewBet.formatted_owners_bet = function(){
  var bet_obj = Bets.findOne(Session.get('bet'));
  var owner_name = Meteor.users.findOne(bet_obj.placer).profile.name;
  if (owner_name == Meteor.user().profile.name)
    return "My Goal";
  return owner_name + "'s Bet";
};
Template.viewBet.days_left = Meteor.shared.days_left;
Template.viewBet.accepted = function(betId){
  return Invites.find({bet: betId, accepted: true, declined:false});
};
Template.viewBet.getName = function(userId){
  return Meteor.users.findOne(userId).profile.name;
};
Template.viewBet.isFinished = function(){
  return _.isString(Bets.findOne(Session.get('bet')).winner);
};
Template.viewBet.resultOfBet = function(){
  var win = '<span style="color:green">You Won This Bet!</span>',
      lose = '<span style="color:red">You Lost This Bet...</span>',
      bet = Bets.findOne(Session.get('bet'));
  if (bet.placer == Meteor.userId()){
    if(bet.winner == 'placer')
      return win;
    return lose;
  }else{
    if(bet.winner != 'placer')
      return lose;
    return win;
  }
};
Template.viewBet.isOwner = function(){
  return Bets.findOne(Session.get('bet')).placer == Meteor.userId();
};
Template.viewBet.the_bet = function(){
  var bet = Bets.findOne(Session.get('bet'));
  switch(bet.goal.type){
    case "calories":
      return "Eat only "+bet.goal.value+" calories per day for "+bet.days+" days";
    case "workout":
      return "Workout "+bet.goal.value+" times in "+bet.days+" days";
    case "run":
      return "Run "+bet.goal.value+" miles per day for "+bet.days+" days";
    case "lbs":
    default:
      return "Lose "+bet.goal.value+" lbs in "+bet.days+" days"; 
  }
};

Template.viewBet.created = function(){ Meteor.shared.logPageView("viewBet");};

Template.viewBet.events({
  'click #addPeopleToBet': function(){
    Session.set('view', 'add friends to bet');
  },
  'click #winBet':function(){
    Bets.update(Session.get('bet'), {
      $set: { winner: 'placer' }
    });
  },
  'click #loseBet':function(){
    Bets.update(Session.get('bet'), {
      $set: { winner: 'friends' }
    });
  }
});
