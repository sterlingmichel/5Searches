'use strict';

Applications.allow({
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


/* Help create async */
Meteor.methods({
  
});

/* Push content to client */
Meteor.publish("applications", function (appids) {
  return Applications.find({
    $or: [
      {$and: [{_id: {$in: appids}}]},
      {$and: [{_id: {$nin: appids}}]}
    ], status: true
  });
});

