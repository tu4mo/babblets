const chat = require('../controllers/chat')
const express = require('express')
const router = express.Router()

router.post('/chat', (req, res) => {
  chat.createChat(req.body.emails, function(status) {
    res.send(status)
  })
})

router.get('/messages', (req, res) => {
  chat.getChatByUser(req.query.user, req.query.token, (chat) => {
    if (chat != null) {
      res.json(chat)
    } else {
      res.status(500).send(req.body)
    }
  })
})

router.post('/messages', (req, res) => {
  chat.getChatByUser(req.query.user, req.query.token, (chat) => {
    if (chat != null) {
      chat.messages.push({
        user: req.query.user,
        text: req.body.text
      })

      chat.save((err) => {
        console.log(err)
        res.json(chat)
      })
    } else {
      res.status(500).send(req.body)
    }
  })
})

module.exports = router
