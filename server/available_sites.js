'use strict';

AvailableSites.allow({
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

Meteor.methods({
  'getCategoryList' : function() {
    var data = AvailableSites.find();
    //console.warn(data.fetch());
    
    return data.fetch();
  }
});

Meteor.publish("availablesites", function () {
  //var msg = ChatMessages.find({to_user_id: this.userId}, {limit: 1024});
  var sites = AvailableSites.find({});


  return sites;
});
