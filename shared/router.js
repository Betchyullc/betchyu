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
});
