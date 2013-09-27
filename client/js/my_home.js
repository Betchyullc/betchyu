Template.my_home.helpers({
  onStep: function(step_int){
    if (Session.get('step') == undefined)
      Session.set('step', 1);
    return Session.get('step') == step_int;
  },
  view: function(page_name){
    return Session.get('view') == page_name;
  },
  bets: function(){
    return Bets.find({placer: Meteor.userId()});
  },
  invites: function(betId){
    return Invites.find({bet:betId});
  },
  getName: function(userId){
    return Meteor.users.findOne(userId).profile.name;
  }
});
