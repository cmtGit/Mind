var express = require('express'),
  router = express.Router(),
  md5 = require('md5'),
  User = require('../models/user.js');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/register',function(req, res, next){
  res.render('register',{
    title: '注册'
  });
});

router.post('/register', function(req, res, next){
  console.log(req.body);
  req.checkBody('email','邮箱不能为空').notEmpty().isEmail();
  req.checkBody('password','密码不能为空').notEmpty();
  req.checkBody('confirmPassword','两次密码不一致').notEmpty().equals(req.body.password);

  var error = req.validationErrors();
  if(error){
    console.log(error);
    return res.render('register',req.body);
  }

  var user = new User({
    userName: req.body.email.split('@').shift(),
    email: req.body.email,
    password: md5(req.body.password)
  });

  user.save(function(err, user){
    if(err){
      console.log('user register error: ' + err);
      res.render('register',{
        title: '注册'
      });
    }else{
      req.flash('info','用户注册成功');
      res.render('login',{
        title: '登陆'
      });
    }
  });

});