Feedback = new Meteor.Collection("feedback");

Feedback.allow({
  insert: function(){
    return true;
  }
});
