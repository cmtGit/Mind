var express = require('express'),
  router = express.Router(),
  passport = require('passport');
  mongoose = require('mongoose'),
  user = mongoose.model('User');

module.exports = function (app) {
  app.use('/', router);
};

module.exports.requireLogin = function(req, res, next){
  if(req.user){
    next();
  }else{
    next(new Error('用户必须登陆！'));
  }
}