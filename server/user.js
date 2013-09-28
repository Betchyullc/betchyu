Accounts.onCreateUser(function(opt, user){
  // makes the invites to non-users into active invites.
  Invites.update({
    uncreated:true,
    invitee: user.services.facebook.id
  },{
    $set: {
      uncreated:false,
      invitee: user._id
    }
  });

  user.profile = opt.profile;

  return user;
});
