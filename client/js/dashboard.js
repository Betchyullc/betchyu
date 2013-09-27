Template.dashboard.getName = function(_id){
  return Meteor.users.findOne(_id).profile.name;
};
Template.dashboard.fbPicURL = function(_id){
  var fbObj;
  if (_id == true){
    fbObj = Meteor.user().services.facebook;
    return "https://graph.facebook.com/"+ fbObj.username +"/picture?access_token="+ fbObj.accessToken;
  } else {
    fbObj = Meteor.users.findOne(_id).services.facebook;
    return "https://graph.facebook.com/"+ fbObj.username +"/picture";
  }
    
};
Template.dashboard.noChallenges = function(){
  return Bets.find({placer: Meteor.userId()}).count() == 0;
};
Template.dashboard.invites = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: false});
};
Template.dashboard.showInvites = function(){
  return Session.get('dash-showInvites');
};
Template.dashboard.bets = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: true});
};
Template.dashboard.showBets = function(){
  return Session.get('dash-showBets');
};
Template.dashboard.events({
  'click #showBets': function(){
    var show = Session.get('dash-showBets');
    if(show)
      Session.set('dash-showBets',false);
    else
      Session.set('dash-showBets',true);
  },
  'click #showInvites': function(){
    var show = Session.get('dash-showInvites');
    if(show)
      Session.set('dash-showInvites', false);
    else
      Session.set('dash-showInvites', true);
  }
});
