Invites = new Meteor.Collection("invites");
Invites.allow({
  insert: function(userId, invite){
    return userId
           ;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
