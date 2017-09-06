
/* Retrict the client options */
InstallApps.allow({
  insert: function (userId) {
    return false;
  },
  update: function (userId) {
    return false;
  },
  remove: function (userId) {
    return false;
  }
});

/* Help Expose  Special Methods */
Meteor.methods({
  'updateInstallApp': function (userId, appId, action) {
    console.warn(userId, appId, action);
    switch (action) {
      case 'install':
        InstallApps.insert({user_id: userId, app_id: appId, createdAt: new Date()});
        break;
      case 'uninstall':
      default:
        InstallApps.remove({user_id: userId, app_id: appId});
        break;
    }

    return InstallApps.find({user_id: userId}).count();
  }
});

/* Push content to client */
Meteor.publish("installapps", function (userId) {
  //return InstallApps.find({user_id: userId});
    return InstallApps.find({},  {limit: 1024});
});
