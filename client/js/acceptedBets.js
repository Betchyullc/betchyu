Template.acceptedBets.bets = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: true});
};
Template.acceptedBets.fbPicURL = Meteor.shared.fbPicURL;
Template.acceptedBets.getName = Meteor.shared.getName;
Template.acceptedBets.created = function(){ Meteor.shared.logPageView("acceptedBets");};
