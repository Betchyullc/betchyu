Template.step_two.helpers({
  selected: function(name){
    if (name == Session.get('product'))
      return  'product-pick';
    return '';
  }
});
Template.step_two.events({
  'click li': function(e){
    var product = $(e.target).text();
    Session.set('product', product);
  }
});
