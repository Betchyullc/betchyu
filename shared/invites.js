Invites = new Meteor.Collection("invites");
Invites.allow({
  insert: function(userId, invite){
    return userId
           ;
  }
});
