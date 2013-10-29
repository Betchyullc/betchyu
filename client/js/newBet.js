Template.newBet.started = function(){
  return Session.get('step') != undefined;
};
Template.newBet.onStep = function(step_int){
  if (Session.get('step') == undefined)
    Session.set('step', 1);
  return Session.get('step') == step_int;
};

Template.newBet.events({
  'click #nextStep': function(){
    if (window.location.pathname != '/bet/new'){ Meteor.shared.handleAddFriends(); return; }

    var step = Session.get('step');
    var goal = Session.get('goal');
    var days = Session.get('days');
    var product = Session.get('product');
    var friends = Session.get('selected friends');
    var allowed_to_proceed = false;

    if (step == 1){
      if (goal != undefined
         && days != undefined)
        allowed_to_proceed = true;
    } else if (step == 2) {
      if (product != undefined)
        allowed_to_proceed = true;
    } else { // step == 3
      if ( friends != undefined){
        var betId = Bets.insert({
          placer: Meteor.userId(),
          goal: {
            value: goal,
            type: Session.get('bet type')
          },
          days: days,
          product: product,
          friends: friends,
          createdAt: Date()
        }, function(err, res){
          // error handling
        });
        _.each(friends, function(e, i){
          var bro = Meteor.users.findOne({"services.facebook.id":e.id});
          if (bro != undefined){ // the user is already on betchyu
            Invites.insert({
              bet: betId,
              inviter: Meteor.user()._id,
              invitee: bro._id,
              accepted: false,
              declined: false
            });
          } else { // gotta ask them through Facebook to join betchyu
            Invites.insert({
              bet: betId,
              inviter: Meteor.user()._id,
              invitee: e.id,
              accepted: false,
              declined: false,
              uncreated: true
            });
          }
        });
        allowed_to_proceed = true;
        // clear all of the Challenge-specific Session data.
        Session.set('goal', undefined);
        Session.set('days', undefined);
        Session.set('product', undefined);
        Session.set('selected friends', undefined);
      }else{
        allowed_to_proceed = false;
      }
    }

    if (allowed_to_proceed)
      Session.set('step', (step + 1));
    if (Session.get('step') == 4){
      Session.set('bet', betId);
      window.location.pathname = "/bet/"+betId;
    }
  }
});
