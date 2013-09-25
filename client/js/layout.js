Template.layout.events({
  'click #nextStep': function(){
    if (Session.get('step') == undefined)
      Session.set('step', 1);
    var step = Session.get('step');
    var allowed_to_proceed = false;
    if (step == 1){
      if (Session.get('goal') != undefined
         && Session.get('days') != undefined)
        allowed_to_proceed = true;
    } else if (step == 2) {
      if (Session.get('product') != undefined)
        allowed_to_proceed = true;
    } else { // step == 3
      if (Session.get('friend') != undefined){
        Bets.insert({
          placer: Meteor.userId(),
          goal: Session.get('goal'),
          days: Session.get('days'),
          product: Session.get('product'),
          friend: Session.get('friend')
        }, function(err, res){
          // error handling
        });
        allowed_to_proceed = true;
      }else{
        allowed_to_proceed = false;
      }
    }

    if (allowed_to_proceed)
      Session.set('step', (step + 1));
  },
  'click #allGoals': function(){
    Session.set('view', "goals");
  },
  'click #newGoal': function(){
    Session.set('view', "new goal");
    Session.set('step', 1);
  },
  'click #signout': function(){
    Meteor.logout();
  },
  'click #dashboard': function(){
    Session.set('view', 'dashboard');
  }
});
