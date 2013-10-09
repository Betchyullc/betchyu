Template.layout.events({
  'click #nextStep': function(){
    var goal = Session.get('goal');
    var days = Session.get('days');
    var product = Session.get('product');
    var friends = Session.get('selected friends');

    if (Session.get('step') == undefined)
      Session.set('step', 1);
    var step = Session.get('step');
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
          goal: goal,
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
      Session.set('view', 'bet');
    }
  },
  'click #showMenu': function(){
    Meteor.shared.showModal('#mainMenuModal');
  },
  'click #allGoals': function(){
    $('.modal').slideUp(function(){
      Session.set('view', "goals");
    });
  },
  'click #showAcceptedBets': function(){
    $('.modal').slideUp(function(){
      Session.set('view','acceptedBets');
    });
  },
  'click #showOfferedBets': function(){
    $('.modal').slideUp(function(){
      Session.set('view', 'offeredBets');
    });
  },
  'click #newGoal': function(){
    $('.modal').slideUp(function(){
      Session.set('view', "new goal");
      Session.set('step', 1);
    });
  },
  'click #signout': function(){
    $('.modal').slideUp(function(){
      Meteor.logout();
    });
  },
  'click #dashboard': function(){
    $('.modal').slideUp(function(){
      Session.set('view', 'dashboard');
    });
  },
  'click .viewBet': function(e){
    Session.set('bet', $(e.target).data("bet"));
    Session.set('view', 'bet');
  },
  'click #declineBet': function(){
    var invId = Invites.findOne({
      bet: this._id,
      inviter: this.placer,
      invitee: Meteor.userId()
    })._id;
    Invites.update(invId, {
      $set: {accepted: false, declined: true}
    });
  },
  'click #acceptBet': function(){
    var invId = Invites.findOne({
      bet: this._id,
      inviter: this.placer,
      invitee: Meteor.userId()
    })._id;
    Invites.update(invId, {
      $set: {accepted: true, declined: false}
    });
  },
  'click .inviteToBetchyu': function(e){
    Meteor.shared.makeFB();
    FB.ui({
      method: 'feed',
      link: window.location.origin,
      to: $(e.target).data('fbid'),
      name: 'Betchyu',
      caption: Meteor.user().profile.name + ' wants you to join Betchyu!'
    });
  }
});
