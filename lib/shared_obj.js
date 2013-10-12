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
  },
  handleAddFriends: function(){
    var betId = Session.get('bet');
    var bet_obj = Bets.findOne(betId);
    var friends = Session.get('selected friends');

    
    _.each(friends, function(e, i){
      if(_.contains(_.pluck(bet_obj.friends, 'id'), e.id))
        return;
      var bro = Meteor.users.findOne({"services.facebook.id":e.id});
      if (bro != undefined){ // the user is already on betchyu
        Invites.insert({
          bet: betId,
          inviter: Meteor.user()._id,
          invitee: bro._id,
          accepted: false,
          declined: false
        });
      } else { // gotta ask them through Facebook to join betchyu
        Invites.insert({
          bet: betId,
          inviter: Meteor.user()._id,
          invitee: e.id,
          accepted: false,
          declined: false,
          uncreated: true
        });
      }

      bet_obj.friends.push(e);
    });
    
    Bets.update(betId, {$set:{friends: bet_obj.friends}});

    Session.set('view', 'bet');
  },
  bet_name: function(bet){
    switch(bet.goal.type){
      case "calories":
        return bet.goal.value+" calories per day for "+bet.days+" days";
      case "workout":
        return bet.goal.value+" workouts in "+bet.days+" days";
      case "run":
        return bet.goal.value+" miles per day for "+bet.days+" days";
      case "lbs":
      default:
        return bet.goal.value+" lbs in "+bet.days+" days"; 
    }
  },
  days_left: function(bet_obj){
    var start_date = new Date(bet_obj.createdAt);
    var end_date = new Date();
    end_date.setDate(start_date.getDate() + bet_obj.days);
    var current_date = new Date();
    return parseInt((end_date - current_date)/1000/60/60/24);
  }
};
