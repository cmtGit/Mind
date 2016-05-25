var express = require('express'),
  router = express.Router(),
  passport = require('passport');
  User = require('../models/user.js');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/login', function(req, res, next){
  res.render('login',{
    title: '登陆'
  });
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}),function(req, res, next){
  res.redirect('/group');
}
);

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/login');
});

