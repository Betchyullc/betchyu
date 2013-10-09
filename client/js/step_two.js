Template.step_two.credit_card = function(){
  var c_i = Session.get('customer-info');
  if (c_i){
    return c_i;
  } else {
    var bt = Meteor.user().braintree;
    if (bt){
      Meteor.call('getCustomer', bt.id, function(e, r){
        if(e == null)
          Session.set('customer-info', r);
      });
      return 'loading...';
    } else {
      return 'you do not have a credit card listed';
    }
  }
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
