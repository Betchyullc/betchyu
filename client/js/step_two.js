Template.step_two.credit_card = function(){
  return 'in progress';
};
Template.step_two.win_amt = function(){
  return Session.get('product').value;
};
Template.step_two.lose_amt = function(){
  return (Session.get('product').value * 1.1).toFixed(2);
};
Template.step_two.selected = function(){
  return Session.get('product') != undefined;
};

// EVENTS
Template.step_two.events({
  'change .stake-amount': function(e){
    var tar = $(e.target);
    var val = tar.val();
    var prod = tar.data('product');
    Session.set('product', {
      product: prod,
      value: val
    });

  }
});
