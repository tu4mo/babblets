var express = require('express')
var router = express.Router()

var chat = require('../controllers/chat')

router.get('/chat/:token/:user', function(request, response) {
  chat.getChatByUser(request.params.user, request.params.token, function(chat) {
    if (chat != null) {
      response.render('chat', {
        user: request.params.user,
        token: request.params.token,
        room: chat._id
      })
    } else {
      response.render('error', {
        error: 'Nope'
      })
    }
  })
})

module.exports = router
