/* Load the future */
Future = Meteor.npmRequire('fibers/future');

/* Load the user path */
path = Meteor.npmRequire('path');
  
/* Load the Apps Collection */
Applications = new Mongo.Collection('applications');

/* Load the Install Apps Collection */
InstallApps = new Mongo.Collection('install_apps');

/* Load all the chat User */
ChatMessages = new Mongo.Collection('chat_messages');

/* Load all the Available Sites */
AvailableSites = new Mongo.Collection('available_sites');


