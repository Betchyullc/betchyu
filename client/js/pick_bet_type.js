Template.pick_bet_type.events({
  'click .bet-type-option': function(e){
    Session.set('bet type', $(e.target).data('type'));
    Session.set('step',1);
  }
});
