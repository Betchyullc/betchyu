Template.dashboard.need_nothing = function(){
  return !(Template.dashboard.need_personal_info() 
         || Template.dashboard.need_bet_update());
};
Template.dashboard.fbPicURL = Meteor.shared.fbPicURL;
Template.dashboard.hasPendingInvites = function(){
  return Template.dashboard.amountOffered() > 0;
};
Template.dashboard.amountOffered = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: false}).count();
};
Template.dashboard.need_personal_info = function(){
  return Meteor.user().profile.details == undefined;
};
Template.dashboard.need_bet_update = function(){
  var bets = Bets.find({
    placer: Meteor.userId(),
    winner: undefined,
    $or: [
      { update: undefined},
      { "update.updatedAt": {$lt: (new Date().getTime()) - (1000*60*60*24)}}
    ]
  });
  return bets.count() > 0;
};
Template.dashboard.bet_to_update = function(){
  return Bets.findOne({
    placer: Meteor.userId(),
    winner: undefined,
    update: undefined
  });
};
Template.dashboard.days_left = Meteor.shared.days_left;
Template.dashboard.bet_name = Meteor.shared.bet_name;
Template.dashboard.bet_progress = function(bet){
  switch(bet.goal.type){
    case "calories":
      return "<p>How many calories have you eaten so far?</p>"+
             "<input type='text' class='dash-input'/>"; 
    case "workout":
      return "<p>How many workouts have you done so far?</p>"+
             "<input type='text' class='dash-input'/>"; 
    case "run":
      return "<p>How many miles have you run so far?</p>"+
             "<input type='text' class='dash-input'/>"; 
    case "lbs":
    default:
      return "<p>How many pounds have you lost so far?</p>"+
             "<input type='text' class='dash-input'/>"; 
  }
};


Template.dashboard.created = function(){ Meteor.shared.logPageView("dashboard");};

Template.dashboard.events({
  'click #updatePersonalInfo': function(){
    var height = $('#heightInfo').val();
    var weight = $('#weightInfo').val();
    var age = $('#ageInfo').val();

    // do some validation.
    Meteor.users.update(Meteor.userId(), {
      $set: { "profile.details": {
        height: height,
        weight: weight,
        age: age
      } }
    });
  },
  'click #updateBetInfo': function(){
    var done_so_far = $('.dash-input').val();
    var betId = $('.block-content').data('_id');

    Bets.update(betId, {$set:{
      update: {
        updatedAt: new Date().getTime(),
        done_so_far: done_so_far
      }
    }});
  }
});

Template.dashboard.rendered = function(){
  if (Template.dashboard.need_nothing()){
    $('.dash-update-hook').delay(1500).slideUp(function(){
      $('.dash-news-hook').animate({
        height: '75%'
      }, 1500);
    });
  }
}
