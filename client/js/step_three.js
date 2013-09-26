Template.step_three.selected = function(name){
    if(Session.get('selected friends') == undefined) Session.set('selected friends', []);
  if (_.contains(Session.get('selected friends'), name))
    return  'product-pick';
  return '';
};
Template.step_three.friends = function(){
  if(Session.get('friends') == undefined){
    HTTP.get("https://graph.facebook.com/me/friends", {
      params: {
        access_token: Meteor.user().services.facebook.accessToken
      }
    }, function(err, res){
      Session.set('friends', res.data.data);
    });
    return [];
  } else {
    return Session.get('friends');
  }
};
Template.step_three.events({
  'click li': function(e){
    if(Session.get('selected friends') == undefined) Session.set('selected friends', []);
    var friend = $(e.target).text();
    console.log(friend);
    var curr_friends = Session.get('selected friends');
    if(!_.contains(curr_friends, friend)){
      curr_friends[curr_friends.length] = friend;
      Session.set('selected friends', curr_friends);
      console.log(curr_friends);
    }
  }
});
