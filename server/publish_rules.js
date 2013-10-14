// fields to publish, split between semantic groups
var autopublishFields = {
  loggedInUser: ['profile', 'username', 'emails', 'services.facebook'],
  otherUsers: [
    'profile.name', 'username',
    'services.facebook.id', 'services.facebook.username', 'services.facebook.gender', 'services.facebook.name'
  ]
};

// ['profile', 'username'] -> {profile: 1, username: 1}
var toFieldSelector = function(fields) {
  return _.object(_.map(fields, function(field) {
    return [field, 1];
  }));
};

// Publish the user's data if he's logged in.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.users.find(
      {_id: this.userId},
      {fields: toFieldSelector(autopublishFields.loggedInUser)});
  } else {
    return null;
  }
});

// Publish the allowed data for all other users, if the user is logged in.
Meteor.publish(null, function () {
  var selector;
  if (this.userId)
    return Meteor.users.find(
      {_id: {$ne: this.userId}},
      {fields: toFieldSelector(autopublishFields.otherUsers)});
  else
    return null;
});


//////////
// Bets //
//////////

// Contingent on login, publish all the Bets that are relevant to the user
Meteor.publish(null, function(){
  if (this.userId){
    var usr = Meteor.users.findOne(this.userId);
    return Bets.find({
      $or: [
        {placer: this.userId},  //the user placed the bet
        {friends: { $elemMatch:{ id: usr.services.facebook.id} }}  // or he was challenged in it.
      ]
    });
  } else {
    return null;
  }
});


/////////////
// Invites //
/////////////

// Contingent on login, publish all the Invites that are relevant to the user
Meteor.publish(null, function(){
  if (this.userId){
    return Invites.find({
      $or: [
        {inviter: this.userId},  //the user placed the bet
        {invitee: this.userId}  // or he was challenged in it.
      ]
    });
  } else {
    return null;
  }
});
