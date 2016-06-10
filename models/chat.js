var mongoose = require('mongoose')

var ChatSchema = new mongoose.Schema({
  users: [
    {
      email: String,
      token: String,
      last_active: Date
    }
  ],
  messages: [
    {
      user: String,
      message: String,
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

module.exports = mongoose.model('Chat', ChatSchema)
