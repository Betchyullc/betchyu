Template.dashboard.fbPicURL = Meteor.shared.fbPicURL;
Template.dashboard.noChallenges = function(){
  return Bets.find({placer: Meteor.userId()}).count() == 0;
};
Template.dashboard.amountOffered = function(){
  return Invites.find({invitee: Meteor.userId(), declined:false, accepted: false}).count();
};
Template.dashboard.rendered = function(){
  $('.notif').each(function(index, item){
    if($(item).data('notifamt') != 0){
      $(item).children().remove();
      $(item).append('<span class="amount-notification">'+$(item).data("notifamt")+'</span>');
      var pos = {
        position: "absolute",
        top: $(item).position().top - ($(item).children().height()/2),
        left: $(item).position().left - ($(item).children().width()/2)
      };
      $(item).children().css(pos);
    }
  });
};
Template.dashboard.created = function(){ Meteor.shared.logPageView("dashboard");};
