require('dotenv').config({ silent: true })

// Require dependencies
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

// Controllers
var chat = require('./controllers/chat')

// Setup database
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGOLAB_URI)

// Require routes
var routes = require('./routes/index')
var api = require('./routes/api')

// Create an express and socket.io instance
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

// Setup webpack middleware
if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var webpackConfig = require('./webpack.config')
  var compiler = webpack(webpackConfig)

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

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// Setup routes
app.use('/', routes)
app.use('/api', api)

// Start the server
server.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})

// Setup socket
io.on('connection', function(socket) {
  socket.on('room', function(room) {
    socket.join(room)
  })

  socket.on('new message', function(data) {
    chat.getChatByUser(data.user, data.token, function(chat) {
      if (chat != null) {
        let newMessage = chat['messages'].create({
          user: data.user,
          message: data.message
        })

        chat['messages'].push(newMessage)

        chat.save(err => {
          io.to(chat._id).emit('new message', newMessage)
        })
      }
    })
  })
})
