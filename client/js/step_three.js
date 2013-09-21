Template.step_three.helpers({
  selected: function(name){
    if (name == Session.get('friend'))
      return  'product-pick';
    return '';
  },
  friends: function(){
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
  }
});
Template.step_three.events({
  'click li': function(e){
    var friend = $(e.target).text();
    Session.set('friend', friend);
  }
});
