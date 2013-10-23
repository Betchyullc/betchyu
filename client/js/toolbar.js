Template.toolbar.view = function(viewName){
  return Session.get('view') == viewName;
};

Template.toolbar.events({
  'click .signin': function(){
    Meteor.loginWithFacebook();
  }
});
