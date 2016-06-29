'use strict'

require('dotenv').config({ silent: true })

// Require dependencies
const express = require('express')
const bodyParser = require('body-parser')

// Controllers
const chat = require('./controllers/chat')

// Setup database
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOLAB_URI)

// Require routes
const routes = require('./routes/index')
const api = require('./routes/api')

// Create an express and socket.io instance
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// Setup webpack middleware
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('./webpack.config')
  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler))
  app.use(webpackHotMiddleware(compiler))
}

// Set port
app.set('port', (process.env.PORT || 3000))

// Set templating engine to Handlebars
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// Setup routes
app.use('/', routes)
app.use('/api', api)

// Start the server
server.listen(app.get('port'), function() {
  console.log('Server started: ' + process.env.BABBLETS_URL)
})

// Setup socket
io.on('connection', (socket) => {
  socket.on('room', (room) => {
    socket.join(room)
  })

  socket.on('new message', (data) => {
    chat.getChatByUser(data.user, data.token, (chat) => {
      if (chat != null) {
        const newMessage = chat['messages'].create({
          user: data.user,
          message: data.message
        })

        chat['messages'].push(newMessage)

        chat.save((err) => {
          io.to(chat._id).emit('new message', newMessage)
        })
      }
    })
  })
})
