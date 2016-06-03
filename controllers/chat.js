var validator = require('validator');
var randomstring = require('../lib/randomstring');

var config = require('../config/config.json');
var mailgun = require('mailgun-js')({apiKey: config.mailgun.api_key, domain: config.mailgun.domain})

var Chat = require('../models/chat');

module.exports = {
  createChat: function(emails, callback) {
    var users = [];

    // Validate email addresses
    if (!validateEmailAddresses(emails)) {
      callback('Error');
      return;
    }

    // Create users with tokens
    emails.map(function(email) {
      users.push(
        {
          email: email,
          token: randomstring.generate()
        }
      );
    });

    // Create new chat
    var newChat = new Chat({
      users: users
    });

    // Save chat
    newChat.save(function(err) {
      if (!err) {
        sendEmails(users);
      }
    });

    callback('OK');
  },

  getChatByUser: function(user, token, callback) {
    Chat.findOneAndUpdate({
      users: {
        $elemMatch: {
          email: user,
          token: token
        }
      }
    }, {
      '$set': {
        'users.$.last_active': Date.now()
      }
    }, function(err, chat) {
      callback(chat);
    });
  }
}

function validateEmailAddresses(emails) {
  var valid = true;

  emails.forEach(function(email) {
    if (!validator.isEmail(email)) valid = false;
  });

  return valid;
}

function sendEmails(users) {
  users.forEach(function(user) {
    var data = {
      from: 'Babblets <me@samples.mailgun.org>',
      to: user.email,
      subject: 'Link to your chat room',
      text: 'Hi!\n\nhttp://localhost:3000/chat/' + user.token + '/' + user.email
    };

    mailgun.messages().send(data, function(err, body) {
      console.log(err);
      console.log(body);
    });
  });
}
