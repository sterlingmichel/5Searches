
Meteor.methods({
  
});


/* Help Push extra fields */
Meteor.startup(function () {
  Meteor.publish("users", function () {
    //_id: this.userId
    var data = Meteor.users.find({}, {fields: {
        'services.google.name': 1,
        'services.twitter.name': 1,
        'services.facebook.name': 1,
        'services.google.picture': 1,
        'services.twitter.picture': 1,
        'services.facebook.picture': 1,
        'services.google.email': 1,
        'services.twitter.email': 1,
        'services.facebook.email': 1,
        'services.google.expiresAt': 1,
        'services.facebook.expiresAt': 1,
        'services.twitter.expiresAt': 1
      }});

    return data;
  });
});