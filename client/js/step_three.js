Template.step_three.helpers({
  selected: function(name){
    if (name == Session.get('friend'))
      return  'product-pick';
    return '';
  }
});
Template.step_three.events({
  'click li': function(e){
    var friend = $(e.target).text();
    Session.set('friend', friend);
  }
});
