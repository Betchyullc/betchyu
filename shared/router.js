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
  this.route('my_home', {path: '/'}, authController);
  this.route('info');
});
