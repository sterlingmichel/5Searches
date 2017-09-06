ChatMessages.allow({
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
  add_chat_msg: function (from_user_id, to_user_id, secret, msg) {
    ChatMessages.insert({from_user_id: from_user_id, to_user_id: to_user_id, message: msg, created_date: new Date()});
  },
  clear_chat: function (from_user_id, to_user_id) {
    ChatMessages.remove({$or: [
        {$and: [{from_user_id: from_user_id, to_user_id: to_user_id}]},
        {$and: [{from_user_id: to_user_id, to_user_id: from_user_id}]}
      ]});
  }
});

Meteor.publish("chatmessages", function () {
  //var msg = ChatMessages.find({to_user_id: this.userId}, {limit: 1024});
  var msg = ChatMessages.find({$or: [
        {$and: [{to_user_id: this.userId}]},
        {$and: [{from_user_id: this.userId}]}
      ]}, {limit: 1024});


  return msg;
});
