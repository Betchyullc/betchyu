Router.configure({
  layout: 'layout'
});
var authController = function(){
  if (Meteor.user() != null)
    this.render();
  else
    this.render('landing', {});
};
Router.map(function(){
  this.route('dashboard', {path: '/'}, authController);
  this.route('info');
  this.route('myBets');
  this.route('friendsBets');
  this.route('newBet', {path: '/bet/new'}, function(){
    Session.set('step', undefined);
    this.render();
  });
});
