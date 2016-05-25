var express = require('express'),
  router = express.Router(),
  passport = require('passport');
  Group = require('../models/group.js'),
  requireLogin = require('./userController').requireLogin;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/group',function(req, res, next){
  Group.find()
    .sort('-created')
    .populate('creator')
    .exec(function (err, groups) {
      if (err) {
        return next(err);
      }
      res.render('group/index',{
        groups: groups,
        nav: 'home',
        title:'首页'
      });
    });
});

router.get('/group/personal',requireLogin, function(req, res, next){
  Group.find({creator: req.user})
    .sort('-created')
    .populate('creator')
    .exec(function (err, groups) {
      if (err) {
        return next(err);
      }
      console.log(groups);
      res.render('personal/my_group',{
        groups: groups,
        pretty: true,
        pagePaper: 'group'
      });
    });
});

router.get('/group/add',requireLogin,function(req, res, next){
  res.render('group/add',{
    title: '添加小组'
  });
});

router.post('/group/add',requireLogin,function(req, res, next){

  req.checkBody('name','名字不能为空！').notEmpty();
  req.checkBody('description', '描述不能为空').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    return res.render('group/add',{
      name : req.body.name,
      description: req.body.description,
      errors: errors
    });
  }

  var group = new Group({
    name: req.body.name,
    description: req.body.description,
    creator: req.user,
    fever: 0,
    comment: [],
    share: 0,
    follow: 0
  });

  group.save(function(err, group){
    if(err){
      console.log(err);
      return res.render('group/add', {
        errors: err
      });
    }

    res.redirect('/group/personal');

  });
});

router.get('/group/delete/:id',requireLogin,function(req, res, next){
  if (!req.params.id) {
        return next(new Error('no group id provided'));
  }

  Group.findById(req.params.id,function(err, group){
    if(err){
      console.log('find group error!');
      return res.render('/group', {
        errors: err
      });
    }
    group.remove();
    res.redirect('/group');
  });

});

router.get('/group/detail/:id',function(req, res, next){
  if (!req.params.id) {
        return next(new Error('no group id provided'));
  }

  Group.findById(req.params.id).populate('creator').exec(function (err, group) {
    if(err){
      console.log('find group error!');
      return res.render('/group', {
        errors: err
      });
    }
    res.render('group/detail',{
      title: group.name,
      group: group
    })
  });

});



