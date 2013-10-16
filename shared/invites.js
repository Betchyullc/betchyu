Invites = new Meteor.Collection("invites");
/*
  {
    _id: "hash",
    accepted: boolean,
    bet: "betId hash",
    declined: boolean,
    invitee: "userId hash",
    inviter: "userId hash"
  }
*/
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
