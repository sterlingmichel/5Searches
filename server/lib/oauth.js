Meteor.startup(function () {
  // retrieve application execute directory
  var basepath = path.resolve('.');

  // load the google configuration
  var settings = Meteor.npmRequire(basepath + '/../../../../../private/oauth.json');

  if (ServiceConfiguration.configurations.find({service: 'google'}).fetch().length === 0) {
    console.log("Going to add the configuration for Google...");
    ServiceConfiguration.configurations.insert({
      service: "google",
      clientId: settings.google.client_id,
      secret: settings.google.client_secret,
      domain: settings.google.javascript_origins[0],
      loginStyle: 'popup'
    });
  }

  if (ServiceConfiguration.configurations.find({service: 'facebook'}).fetch().length === 0) {
    console.log("Going to add the configuration for Facebook...");
    ServiceConfiguration.configurations.insert({
      service: 'facebook',
      appId: settings.facebook.appId,
      secret: settings.facebook.secret
    });
  }

  if (ServiceConfiguration.configurations.find({service: 'twitter'}).fetch().length === 0) {
    console.log("Going to add the configuration for Twitter...");
    ServiceConfiguration.configurations.insert({
      service: 'twitter',
      consumerKey: settings.twitter.appId,
      secret: settings.twitter.secret
    });
  }
  
  if (ServiceConfiguration.configurations.find({service: 'vimeo'}).fetch().length === 0) {
    console.log("Going to add the configuration for Vimeo...");
    ServiceConfiguration.configurations.insert({
      service: 'vimeo',
      appId: settings.vimeo.appId,
      secret: settings.vimeo.secret
    });
  }
  
  if (ServiceConfiguration.configurations.find({service: 'yahoo'}).fetch().length === 0) {
    console.log("Going to add the configuration for Yahoo...");
    ServiceConfiguration.configurations.insert({
      service: 'yahoo',
      appId: settings.yahoo.appId,
      secret: settings.yahoo.secret
    });
  }
  
});