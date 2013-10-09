Stats = new Meteor.Collection("stats");

Stats.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  }
});
