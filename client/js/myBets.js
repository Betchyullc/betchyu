Template.myBets.acceptedBets = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: true});
};
Template.myBets.offeredBets = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: false});
};
Template.myBets.fbPicURL = Meteor.shared.fbPicURL;
Template.myBets.getName = Meteor.shared.getName;
Template.myBets.bet_name = function(invite_obj){
  return Meteor.shared.bet_name(Bets.findOne(invite_obj.bet));
};
Template.myBets.days_left = function(invite){
  return Meteor.shared.days_left(Bets.findOne(invite.bet));
};
Template.myBets.pendingBets = function(){
  return Template.myBets.offeredBets().count() > 0;
};

Template.myBets.events({
  'click .acceptBet': function(e){
    var invId = $(e.target).data('invite');

    Invites.update(invId, {
      $set: {
        accepted: true,
        declined: false
      }
    });
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

Template.myBets.created = function(){ Meteor.shared.logPageView("myBets");};
