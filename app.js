

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

//socketIO
/*var http = require('http').createServer(app);
var io = require('socket.io').listen(http);*/

require('./config/express')(app, config, db);
require('./config/passport').init();
//require('./config/socketIO')(io);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

