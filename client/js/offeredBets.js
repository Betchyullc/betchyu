Template.offeredBets.invites = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: false});
};
Template.offeredBets.fbPicURL = Meteor.shared.fbPicURL;
Template.offeredBets.getName = Meteor.shared.getName;
Template.offeredBets.created = function(){ Meteor.shared.logPageView("offeredBets");};
