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
