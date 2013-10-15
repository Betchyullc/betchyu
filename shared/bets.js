Bets = new Meteor.Collection("bets");
/*
  {
    _id: "hash",
    createdAt: "timestamp",
    days: number,
    friends: [
      {
        id: "facebook id",
        name: "Joe Smith"
      }, {} ...
    ],
    goal: {
      type: "code",
      value: number
    },
    placer: "userId hash",
    product: {
      product: "a thing",
      value: number
    }
  }
*/
Bets.allow({
  insert: function(userId, bet){
    return userId 
           && bet.placer == userId
         //  && isNaN(bet.goal)
           && !isNaN(bet.days)
           && bet.product != undefined 
           && isNaN(bet.product)
           && bet.friends != undefined
           && Array.isArray(bet.friends)
           ;
  },
  update: function(uid, origDoc, fields, mod){
    // should only allow updating 'winner' 
    return true;
  }
});
