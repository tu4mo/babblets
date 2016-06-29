const Chat = require('../models/chat')
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN})
const randomstring = require('../lib/randomstring')
const validator = require('validator')

module.exports = {
  createChat: (emails, callback) => {
    let users = []

    // Validate email addresses
    if (!validateEmailAddresses(emails)) {
      callback('Error')
      return
    }

    // Create users with tokens
    emails.map((email) => {
      users.push(
        {
          email: email,
          token: randomstring.generate()
        }
      )
    })

    // Create new chat
    const newChat = new Chat({
      users: users
    })

    // Save chat
    newChat.save((err) => {
      if (!err) {
        sendEmails(users)
      }
    })

    callback('OK')
  },

  getChatByUser: (user, token, callback) => {
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
    }, (err, chat) => {
      callback(chat)
    })
  }
}

function validateEmailAddresses(emails) {
  let valid = true

  emails.forEach((email) => {
    if (!validator.isEmail(email)) valid = false
  })

  return valid
}

function sendEmails(users) {
  users.forEach((user) => {
    const data = {
      from: 'Babblets <me@samples.mailgun.org>',
      to: user.email,
      subject: 'Link to your chat room',
      text: `Hi!\n\n${process.env.BABBLETS_URL}/chat/${user.token}/${user.email}`
    }

    mailgun.messages().send(data, function(err, body) {
      console.log(err)
      console.log(body)
    })
  })
}
