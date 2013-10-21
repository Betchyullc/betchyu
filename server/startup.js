Meteor.startup(function(){
  console.log(process.env.ROOT_URL);
  if (process.env.ROOT_URL == "http://www.betchyu.com"){ // we aren't on developpment
    // first, remove configuration entry in case service is already configured
    /*Accounts.loginServiceConfiguration.remove({
      service: "facebook"
    });*/
    Accounts.loginServiceConfiguration.insert({
      service: "facebook",
      appId: "178891345633576",
      secret: "dac634e282438dcdfa58f30b3a62aa4a"
    });
  } else if(process.env.ROOT_URL == "http://localhost:3000/"){
    // first, remove configuration entry in case service is already configured
    Accounts.loginServiceConfiguration.remove({
      service: "facebook"
    });
    Accounts.loginServiceConfiguration.insert({
      service: "facebook",
      appId: "754096961273788",
      secret: "2ab02861b58012daafb560422520c10f"
    });
    
  } else if (process.env.ROOT_URL != "http://localhost:3000/"){ // we aren't on developpment
    // first, remove configuration entry in case service is already configured
    Accounts.loginServiceConfiguration.remove({
      service: "facebook"
    });
    Accounts.loginServiceConfiguration.insert({
      service: "facebook",
      appId: "560902563947188",
      secret: "aa5f57edd23b14f9fcccde9574c5d12f"
    });
  }
});
