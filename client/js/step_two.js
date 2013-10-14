/*
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
};*/
Template.step_two.selected = function(){
  return Session.get('product') != undefined;
};
Template.step_two.isSelected = function(thing){
  if ( Session.get('product') != undefined
       && Session.get('product').product == thing ) {
    return "product-pick";
  }
  return "";
};

// EVENTS
Template.step_two.events({
  /*'change .stake-amount': function(e){
    var tar = $(e.target);
    var val = tar.val();
    var prod = tar.data('product');
    Session.set('product', {
      product: prod,
      value: val
    });
  }*/
  'click li': function(e){
    var tar = $(e.target);
    var val = tar.text();
    Session.set('product', {
      product: val,
      value: 10
    });
  },
  'change #stake': function(e){
    var val = $('#stake').val();
    var prod = Session.get('product').product;
    Session.set('product', {
      product: prod,
      value: val
    });
  },
  'click #stake': function(e){
    e.stopPropagation();
  }
});
Template.step_two.created = function(){ Meteor.shared.logPageView("step_two");};
