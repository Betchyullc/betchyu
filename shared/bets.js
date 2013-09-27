Bets = new Meteor.Collection("bets");
Bets.allow({
  insert: function(userId, bet){
    return userId 
           && bet.placer == userId
           && !isNaN(bet.goal)
           && !isNaN(bet.days)
           && bet.product != undefined 
           && isNaN(bet.product)
           && bet.friends != undefined
           && Array.isArray(bet.friends)
           ;
  }
});
