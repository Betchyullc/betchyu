//Boolean helpers
Template.viewBet.isOwnerAndOpenBet = function(bet){
  return Invites.find({
    bet: bet._id,
    accepted: true
  }).count() == 0
  && Template.viewBet.isOwner();
};
Template.viewBet.isAccepted = function(){
  var bet_obj = this;
  var invs = Invites.find({bet: bet_obj._id}); // all the invites for this bet.
  var invite = _.find(invs.fetch(), function(e){
    return e.invitee == Meteor.userId();
  });
  if (invite == undefined) return true;
  return invite.accepted;
};
Template.viewBet.need_bet_update = function(){
  if (Session.get('force update on') == true) { return true; }
  var bet = this;

  if (bet.update){
    var timestamp = ((new Date().getTime())-(1000*60*60*24)); // 1 day
    return bet.update.updatedAt < timestamp;
  } else {
    return true;
  }
};
Template.viewBet.needToInvite = function(fbid){
  return Meteor.users.findOne({"services.facebook.id":fbid}) == undefined;
};
Template.viewBet.accepted = function(betId){
  return Invites.find({bet: betId, accepted: true, declined:false});
};
Template.viewBet.isFinished = function(){
  return _.isString(this.winner);
};
Template.viewBet.isOwner = function(){
  return this.placer == Meteor.userId();
};

// object/string returning helpers
Template.viewBet.days_left = Meteor.shared.days_left;
Template.viewBet.getName = function(userId){
  return Meteor.users.findOne(userId).profile.name;
};
Template.viewBet.resultOfBet = function(){
  var win = '<p class="bet-win-text">You Win!</p>',
      lose = '<p class="bet-lose-text">You Lose</p>',
      bet = this;
  if (bet.placer == Meteor.userId()){
    if(bet.winner == 'placer')
      return win;
    return lose;
  }else{
    if(bet.winner == 'placer')
      return lose;
    return win;
  }
};
Template.viewBet.betTitle = function(){
  var bet = this;
  switch(bet.goal.type){
    case "calories":
      return "Eat only "+bet.goal.value+" calories per day for "+bet.days+" days";
    case "workout":
      return "Workout "+bet.goal.value+" times in "+bet.days+" days";
    case "run":
      return "Run "+bet.goal.value+" miles in "+bet.days+" days";
    case "lbs":
    default:
      return "Lose "+bet.goal.value+" lbs in "+bet.days+" days"; 
  }
};
var makeInputHTML = function(bet){
  var now = new Date();
  var then = new Date(bet.createdAt);
  var days_passed = Math.ceil( (now - then)/1000/60/60/24);
  var inputHTML = "";
  var headHTML = "<div class='update-day-container'>";
  for (var i = 0; (i < days_passed && i < bet.days); i++){
    now.setDate(then.getDate()+i);
    if( bet.update  && bet.update.done_each_day[i]){
      inputHTML += headHTML+ 
                    "<strong>"+now.toDateString()+"</strong>"+
                    "<input title='"+now.toDateString()+"' type='text' class='dash-input' value='"+bet.update.done_each_day[i]+"'/>"+
                  "</div>";
    } else{
      inputHTML += headHTML +
                     "<strong>"+now.toDateString()+"</strong>"+
                     "<input title='"+now.toDateString()+"' type='text' class='dash-input'/>"+
                   "</div>";
    }
  }
  return inputHTML;
}
Template.viewBet.bet_progress = function(bet){
  var inputHTML = makeInputHTML(bet);
  inputHTML ="<div class='dash-goal-days'>"+
               inputHTML+
             "</div>";
  switch(bet.goal.type){
    case "calories":
      return "<p>How many calories have you eaten each day?</p>"+
             inputHTML;
    case "workout":
      return "<p>How many workouts have you done each day?</p>"+
               inputHTML;
    case "run":
      return "<p>How many miles have you run each day?</p>"+
               inputHTML;
    case "lbs":
    default:
      return "<p>How many pounds have you lost each day?</p>"+
               inputHTML;
  }
};
Template.viewBet.days_from_bet = function(bet){
  var now = new Date();
  var start = new Date(bet.createdAt);
  var elem;
  switch(bet.goal.type){
    case "calories":
      elem = " Calories Eaten";
      break;
    case "workout":
      elem = " workouts done";
      break;
    case "run":
      elem = " miles run";
      break;
    case "lbs":
    default:
      elem = " lbs lost";
      break;
  }
  var returnHTML = "<ul>";
  _.each(bet.update.done_each_day, function(e, i, l){
    var thisDay = new Date(start.getTime() + (i*24*60*60*1000));
    returnHTML += "<li><strong>"+thisDay.toDateString()+":</strong>"+e+elem+"</li>";
  });
  returnHTML += "</ul>";

  return returnHTML;
};

Template.viewBet.created = function(){ Meteor.shared.logPageView("viewBet");};

var winTheBet = function(){
  Bets.update(Session.get('bet'), {
    $set: { winner: 'placer' }
  });
};
var loseTheBet = function(){
  Bets.update(Session.get('bet'), {
    $set: { winner: 'friends' }
  });
};

Template.viewBet.events({
  'click #addPeopleToBet': function(){
    Session.set('view', 'add friends to bet');
  },
  'click #updateBetInfo': function(){
    var betId = $('.block-content').data('_id');
    var updates = [];
    var valid = true;
    $('.dash-input').each(function(i, e){
      var update = $(this).val().trim();
      if(!isNaN(update)){
        updates.push(update);
      } else {
        valid = false;
      }
    });
    
    if (valid){
      Session.set('force update on', false);
      Bets.update(betId, {$set:{
        update: {
          updatedAt: new Date().getTime(),
          done_each_day: updates
        }
      }});

      // determine if they finished the bet
      var bet = Bets.findOne(betId);
      var bet_total = 0;
      _.each(updates, function(e, i, l){
        bet_total += e;
      });
      var now = new Date().getTime();
      var then = new Date(bet.createdAt).getTime();
      if ((now - (bet.days*24*60*60*1000)) > then) {
        switch(bet.goal.type){
          case "calories":
            if ((bet.goal.value * bet.days) >= bet_total)
              winTheBet();
            else
              loseTheBet();
            break;
          case "workout":
            if (bet.goal.value <= bet_total)
              winTheBet();
            else
              loseTheBet();
            break;
          case "run":
            if (bet.goal.value <= bet_total)
              winTheBet();
            else
              loseTheBet();
            break;
          case "lbs":
          default:
            if (bet.goal.value <= bet_total)
              winTheBet();
            else
              loseTheBet();
            break;
        }
      }
    }
  },
  'click .redo-update': function(e){
    var forceOn = Session.get('force update on');
    if (forceOn){
      $('.dash-update-hook').slideUp(600);
      Session.set('force update on', false);
    } else {
      $('.dash-update-hook').slideDown(600);
      Session.set('force update on', true);
    }
  }
});
Template.viewBet.rendered = function(){
  if (!Template.viewBet.need_bet_update()){
    $('.dash-update-hook').delay(1500).slideUp( 600);
  }
}
