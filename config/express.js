var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

var flash=require("connect-flash");

var session = require('express-session');

var expressValidator = require('express-validator');

var passport = require('passport');

var MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose'),
  User = mongoose.model('User');

var truncate = require('truncate');

var moment = require('moment');

module.exports = function(app, config, connection) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  // add validation methods to request
  app.use(expressValidator());

  
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(session({
    secret: 'cmt',
    store: new MongoStore({ mongooseConnection: connection })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(function (req, res, next){
    req.user = null;
    if(req.session.passport && req.session.passport.user){
      User.findById(req.session.passport.user,function(err, user){
        if(err) return next(err);
        user.password = null;
        req.user = user;
        next();
      });
    }else{
      next();
    }
  });

  app.use(function (req, res, next){
    res.locals.user = req.user;
    res.locals.moment = moment;
    res.locals.truncate = truncate;
    next();
  });

  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
