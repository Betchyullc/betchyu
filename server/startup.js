Meteor.startup(function(){
  console.log(process.env.ROOT_URL);
  if (process.env.ROOT_URL !="http://localhost:3000"){ // we aren't on developpment
    // first, remove configuration entry in case service is already configured
    /*Accounts.loginServiceConfiguration.remove({
      service: "facebook"
    });*/
    Accounts.loginServiceConfiguration.insert({
      service: "facebook",
      appId: "178891345633576",
      secret: "dac634e282438dcdfa58f30b3a62aa4a"
    });
  }
});
