/*Meteor.startup(function(){
  _.each(Bets.find().fetch(), function(e){
    Bets.remove(e._id);
  });
  _.each(Invites.find().fetch(), function(e){
    Invites.remove(e._id);
  });
});*/
Meteor.methods({
  declineOtherInvites: function(invId){
    var inv = Invites.findOne(invId);
    
    Invites.update({
      _id: {$ne: invId},
      bet: inv.bet
    },{
      $set: {declined: true}
    }, {
      multi: true
    });
  }
});
