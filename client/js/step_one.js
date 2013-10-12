Template.step_one.goal= function(){
  if (Session.get('goal') == undefined) return '';
  return Session.get('goal');
};
Template.step_one.days = function(){
  if(Session.get('days') ==undefined) return '';
  return Session.get('days') + " days";
};
Template.step_one.heading_message = function(){
  var type = Session.get('bet type');
  switch(type){
    case 'lbs':
      return "Pounds to Lose";
    case "calories":
      return "Maximum Daily Calories";
    case "workout":
      return "Total Workouts";
    case "run":
    default:
      return "Miles to Run per Day";
  }
};
Template.step_one.type = function(type){
  return Session.get('bet type') == type;
};


Template.step_one.rendered = function(){
  var g = Session.get('goal');

  // goal setting ui
  var minimum, maximum;
  var type = Session.get('bet type');
  switch(type){
    case 'lbs':
      minimum = 0;
      maximum = 30;
      break;
    case "calories":
      minimum = 500;
      maximum = 3000;
      break;
    case "workout":
      minimum = 1;
      maximum = 30;
      break;
    case "run":
    default:
      minimum = 0;
      maximum = 10;
      break;
  }
  $('#goal').slider({
    min: minimum,
    max: maximum,
    value: (g == undefined) ? (minimum) : (g),
    slide: function(e, ui){
      Session.set('goal', ui.value);
    }
  });
  
  //timeFrame setting ui
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
Template.step_one.created = function(){ Meteor.shared.logPageView("step_one");};
