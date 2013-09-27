Template.step_one.helpers({
  goal: function(){
    if (Session.get('goal') == undefined) return '';
    return Session.get('goal') + " lbs";
  },
  days: function(){
    if(Session.get('days') ==undefined) return '';
    return Session.get('days') + " days";
  }
});
Template.step_one.rendered = function(){
  var g = Session.get('goal');
  $('#weightLoss').slider({
    min: 0,
    max: 30,
    value: (g == undefined) ? (0) : (g),
    slide: function(e, ui){
      Session.set('goal', ui.value);
    }
  });
  var d = Session.get('days');
  $('#timeFrame').slider({
    min: 0,
    max: 30,
    value: (d == undefined) ? (0) : (d),
    slide: function(e, ui){
      Session.set('days', ui.value);
    }
  });
};
