Template.toolbar.view = function(viewName){
  return Session.get('view') == viewName;
};
Template.toolbar.fbPicURL = Meteor.shared.fbPicURL;
