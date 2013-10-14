// fields to publish, split between semantic groups
var autopublishFields = {
  loggedInUser: ['profile', 'username', 'emails', 'services.facebook'],
  otherUsers: [
    'profile.name', 'username', 'services.facebook.id', 'services.facebook.username', 'services.facebook.gender'
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
