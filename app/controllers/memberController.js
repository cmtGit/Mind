var express = require('express'),
  router = express.Router(),
  passport = require('passport');
  Member = require('../models/member.js'),
  Group = require('../models/group.js'),
  requireLogin = require('./userController').requireLogin;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/member/add/:id',requireLogin, function(req, res, next){
  if (!req.params.id) {
        return next(new Error('no group id provided'));
  }

  var group = new Group({
    _id:req.params.id
  });

  var member = new Member({
    user: req.user,
    group:group,
  });

  Member.find({user:req.user,group: group},function(err, oldMember){
    if(err){
      console.log(err);
      res.jsonp({result:-1});
      return;
    }

    if(oldMember){
      console.log('already add the group');
      res.jsonp({result: 0 });
      return ;
    }

    member.save(function(err,member){
      if(err){
        console.log(err);
        res.jsonp({result: -1});
        return ;
      }
      res.jsonp({result: 1 });
    });

  });
});

var varifyMember = function(req, res, next){
  if (!req.params.id) {
        return next(new Error('no group id provided'));
  }

  var group = new Group({
    _id: req.params.id
  });

  Member.find({user: req.user, group: group}, function(err, member){
    if(err){
      return next(err);
    }
    if(member){
      next();
    }else{
      next(new Error('该用户没有权限'));
    }
  });
};

module.exports.varifyMember = varifyMember;

router.get('/member/cancel/:id', varifyMember, function(req, res, next){
  if (!req.params.id) {
        return next(new Error('no group id provided'));
  }

  var group = new Group({
    _id: req.params.id
  });

  Member.remove({user: req.user,group: group},function(err){
    if(err){
      res.jsonp({result:-1});
    }else{
      res.jsonp({result:1});
    }
  });
});


router.get('/member', requireLogin, function(req, res, next){
  Member.find({user: req.user},function(err, members){
    if(err){
      return next(err);
    }
    res.render('personal/member',{
      members: members,
      title: '我的参与',
      pagePaper: 'member'
    });
  })
  .populate('group');
});