Template.my_home.helpers({
  onStep: function(step_int){
    if (Session.get('step') == undefined)
      Session.set('step', 1);
    return Session.get('step') == step_int;
  },
  view: function(page_name){
    return Session.get('view') == page_name;
  }
});
