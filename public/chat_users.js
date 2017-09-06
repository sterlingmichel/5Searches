
ChatUsers.allow({
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

var securityKey = function () {
  return (new Date()).getTime().toString() + (Math.floor(Math.random() * 1000000000)).toString();
};

//Meteor.setInterval(function () {
//  var now = (new Date()).getTime();
//  var date = (new Date());
//  date.setSeconds(date.getSeconds() + 10);
//
//  Users.remove({last_seen: {$lt: (now - 60 * 1000)}});
//}, 1000);

Meteor.methods({
  keepalive: function (chat_id, secret) {
    var now = (new Date()).getTime();

    if (ChatUsers.findOne({_id: chat_id, secret: secret})) {
      ChatUsers.update(user_id, {$set: {last_seen: now}});
    }
  },
  add_chat_user: function (user_id) {

    var now = (new Date()).getTime();
    var chat, chat_id = null;

    // Create a unique secret key
    var secret = securityKey();

    if (chat = chat = ChatUsers.findOne({user_id: user_id})) {
      chat_id = chat._id;
      secret = chat.secret;
    } else {
      chat_id = ChatUsers.insert({user_id: user_id, last_seen: now, secret: secret});
    }

    //console.warn("user_id:", user_id, " chat_id:", chat_id);
    return {chat_id: chat_id, secret: secret};
  }
});

Meteor.publish("chatusers", function () {
  var data = ChatUsers.find({user_id: {$ne: this.userId}}, {fields: {secret: false}, limit: 5000});

  console.warn(this.userId, data.fetch().length);
  return data;
});
