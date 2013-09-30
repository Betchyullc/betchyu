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
  return Meteor.users.findOne({"services.facebook.id":fbid}) == undefined;
};
Template.viewBet.formatted_owners_bet = function(){
  var bet_obj = Bets.findOne(Session.get('bet'));
  var owner_name = Meteor.users.findOne(bet_obj.placer).profile.name;
  if (owner_name == Meteor.user().profile.name)
    return "My Bet";
  return owner_name + "'s Bet";
};
Template.viewBet.days_left = function(bet_obj){
  var start_date = new Date(bet_obj.createdAt);
  var end_date = new Date();
  end_date.setDate(start_date.getDate() + bet_obj.days);
  var current_date = new Date();
  return parseInt((end_date - current_date)/1000/60/60/24);
};
Template.viewBet.accepted = function(betId){
  return Invites.find({bet: betId, accepted: true, declined:false});
};
Template.viewBet.getName = function(userId){
  return Meteor.users.findOne(userId).profile.name;
};
