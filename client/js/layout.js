Template.layout.events({
  'click #nextStep': function(){
    if (Session.get('step') == undefined)
      Session.set('step', 1);
    Session.set('step', (Session.get('step') + 1));
  }
});
