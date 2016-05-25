var express = require('express'),
  router = express.Router(),
  passport = require('passport');
  mongoose = require('mongoose'),
  User = require('../models/user.js');

module.exports = function (app) {
  app.use('/', router);
};

var requireLogin = function(req, res, next){
  if(req.user){
    next();
  }else{
    next(new Error('用户必须登陆！'));
  }
};
module.exports.requireLogin = requireLogin;

router.post('/user/edit', requireLogin, function(req, res, next){
  var userupdate = {
    sex: req.body.sex,
    industry: req.body.industry,
    birthdate: req.body.birthdate,
    profile: req.body.profile
  };
  console.log(userupdate);
  User.findByIdAndUpdate(req.user._id,{$set:userupdate},function(err, user){
    if(err){
      return next(err);
    }
    req.flash('user');
    res.redirect('/user');
  });
});

router.get('/user', requireLogin, function(req, res, next){
  res.render('personal/my_information',{
    title: '个人资料',
    pagePaper: 'information'
  })
});