Meteor.shared= {
  fbPicURL: function(_id){
    var fbObj;
    if (_id == true){
      fbObj = Meteor.user().services.facebook;
      return "https://graph.facebook.com/"+ fbObj.username +"/picture?access_token="+ fbObj.accessToken;
    } else {
      fbObj = Meteor.users.findOne(_id).services.facebook;
      return "https://graph.facebook.com/"+ fbObj.username +"/picture";
    }
  },
  getName: function(_id){
    return Meteor.users.findOne(_id).profile.name;
  },
  showModal: function(modalId){
    if (modalId.indexOf('#') == -1){
      $('#'+modalId).slideToggle();
    }
    else{
      $(modalId).slideToggle();
    }
  },
  logPageView: function(page_name){
    clearInterval(Session.get('time spent id'));
    var id = Stats.insert({
      type: "view",
      page: page_name,
      user: Meteor.userId(),
      start: Date(),
      spent: 0
    });
    Session.set('time spent id', setInterval(function(){
      Stats.update(id, {$inc: {spent: 5}});
    },5000));
  }
};
