Template.friendsBets.lostBet = function(betId){
  var bet = Bets.findOne(betId);
  return bet.winner == "placer";
};
Template.friendsBets.wonBet = function(betId){
  var bet = Bets.findOne(betId);
  return bet.winner == "friends";
};
Template.friendsBets.acceptedBets = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: true});
};
Template.friendsBets.offeredBets = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: false});
};
Template.friendsBets.fbPicURL = Meteor.shared.fbPicURL;
Template.friendsBets.getName = Meteor.shared.getName;
Template.friendsBets.bet_name = function(invite_obj){
  return Meteor.shared.bet_name(Bets.findOne(invite_obj.bet));
};
Template.friendsBets.days_left = function(invite){
  return Meteor.shared.days_left(Bets.findOne(invite.bet));
};
Template.friendsBets.pendingBets = function(){
  return Template.friendsBets.offeredBets().count() > 0;
};

Template.friendsBets.events({
  'click .acceptBet': function(e){
    var invId = $(e.target).data('invite');

    Invites.update(invId, {
      $set: {
        accepted: true,
        declined: false
      }
    });

    // Prevents other users from also accepting on this bet.
    // a design desision to make payouts easier.
    Meteor.call('declineOtherInvites', invId);
  },
  'click .declineBet': function(e){
    var invId = $(e.target).data('invite');

    Invites.update(invId, {
      $set: {
        accepted: false,
        declined: true
      }
    });
  }
});

Template.friendsBets.created = function(){ Meteor.shared.logPageView("friends Bets");};
