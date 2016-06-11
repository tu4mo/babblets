var express = require('express')
var router = express.Router()

var chat = require('../controllers/chat')

router.get('/', function(req, res) {
  res.render('index', { layout: null })
})

router.get('/chat/:token/:user', function(req, res) {
  chat.getChatByUser(req.params.user, req.params.token, function(chat) {
    if (chat != null) {
      res.render('chat', {
        user: req.params.user,
        token: req.params.token,
        room: chat._id
      })
    } else {
      res.render('error', {
        error: 'Nope'
      })
    }
  })
})

module.exports = router
