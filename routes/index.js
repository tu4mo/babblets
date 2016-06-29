const chat = require('../controllers/chat')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { layout: null })
})

router.get('/chat/:token/:user', (req, res) => {
  chat.getChatByUser(req.params.user, req.params.token, (chat) => {
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
