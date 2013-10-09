Meteor.methods({
  'makeCustomer':function(user, card){
    var braintree = Meteor.require('braintree');
    var gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: "vfhpwqw9g896qnzh",
      publicKey: "p8s4g5cpczwqj3gp",
      privateKey: "97f4b0a67bf1974bea764beccd95f8f4"
    });

    var customerRequest = {
      firstName: user.firstName,
      lastName: user.lastName,
      creditCard: {
        number: 123,
        cvv: 123,
        expirationMonth: 00,
        expirationYear:  00,
        billingAddress: {
          postalCode: 77546
        }
      }
    };

    var customer = Meteor.sync(function(done){
      gateway.customer.create(customerRequest, function (err, result) {
        done(err, result);
      });
    });

    return customer;
  }
});
