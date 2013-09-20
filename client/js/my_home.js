Template.my_home.helpers({
  onStep: function(step_int){
    if (Session.get('step') == undefined)
      Session.set('step', 1);
    return Session.get('step') == step_int;
  }
});
