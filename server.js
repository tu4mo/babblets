require('dotenv').config({ silent: true });

// Require dependencies
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

// Setup database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

// Require routes
var routes = require('./routes/index');
var api = require('./routes/api');

// Create an express instance
var app = express();

// Set port
app.set('port', (process.env.PORT || 3000));

// Set templating engine to Jade
app.set('view engine', 'jade');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Setup routes
app.use('/', routes);
app.use('/api', api);

// Setup webpack middleware
if (process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
}

// Start the server
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
