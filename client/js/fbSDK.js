Meteor.shared.makeFB = function(){
  var mapper = function (){
    var here = window.location.origin;
    switch(here){
      case "http://betchyu.meteor.com":
        return '560902563947188';
      case "http://www.betchyu.com":
        return '178891345633576';
      case "http://localhost:3000":
      default:
        return '754096961273788';
    }
  };
  if($('#fb-root *').length == 0){

    window.fbAsyncInit = function() {
      // init the FB JS SDK
      FB.init({
      appId      : mapper(),
      status     : true,                                 // Check Facebook Login status
      xfbml      : true                                  // Look for social plugins on the page
    });
    // Additional initialization code such as adding Event Listeners goes here
    };
    // Load the SDK asynchronously
    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
};
Template.fbSDK.created = Meteor.shared.makeFB;
