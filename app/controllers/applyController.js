var express = require('express'),
  router = express.Router(),
  passport = require('passport');
  Group = require('../models/group.js'),
  Member = require('../models/member.js'),
  Apply = require('../models/apply.js'),
  requireLogin = require('./userController').requireLogin;

module.exports = function (app) {
  app.use('/', router);
};

router.post('/apply/add', requireLogin, function(req, res, next){
  req.checkBody('group_id','小组不能为空').notEmpty();
  req.checkBody('note','理由必须填写').notEmpty();
  var errors = req.validationErrors();

  if(errors){
    console.log(errors);
    res.jsonp({errors: errors, result: -2});
    return;
  }

  var apply = new Apply({
    user: req.user,
    group:new Group({_id:req.body.group_id}),
    note: req.body.note,
  });

  apply.save(function(err, apply){
    if(err){
      res.jsonp({result: -1});
      return;
    }
    res.jsonp({result: 1});
  });
});

router.get('/apply', requireLogin, function(req, res, next){
  Apply.find({user:req.user},function(err, applies){
    if(err){
      return next(err);
    }

    res.render('personal/my_apply',{
      applies: applies,
      title: '申请中心',
      pagePaper: 'my_apply'
    });
  }).populate('group');
});


router.get('/apply/remind', requireLogin, function(req, res, next){
  Group.find({creator:req.user},function(err, groups){
    if(err){
      res.jsonp({result: -1});
      return;
    }
    if(!groups || groups.length <= 0){
      res.jsonp({result: 1, sum: 0});
      return;
    }

    Apply.find({group: {$in: groups},result:null}, function(err, applies){
      if(err){
        res.jsonp({result: -1});
        return;
      }
      res.jsonp({result: 1,sum: applies.length});
    });
  });
});

router.get('/apply/to', requireLogin, function(req, res, next){
  Group.find({creator:req.user},function(err, groups){
    if(err){
      return next(err);
    }
    if(!groups || groups.length <= 0){
      res.render('personal/apply',{
        applies: [],
        title: '消息中心',
        pagePaper: 'apply'
      });
      return;
    }

    Apply.find({group: {$in: groups}}, function(err, applies){
      if(err){
        return next(err);
      }
      res.render('personal/apply',{
        applies: applies,
        title: '消息中心',
        pagePaper: 'apply'
      });
    }).populate('user');
  });
});

router.get('/apply/detail/:action/:id', function(req, res, next){
  Apply.findOne({_id: req.params.id},function(err,apply){
    if(err){
      return next(err);
    }
    console.log(apply);
    res.render('apply/' + req.params.action,{
      apply: apply,
      title: apply.group.name
    });
  })
  .populate('user')
  .populate('group');
});

router.post('/apply/check', function(req, res, next){
  var updateFiled = {
    result: req.body.result,
    reason: req.body.reason
  }

  Apply.findByIdAndUpdate(req.body.id,{$set:updateFiled},function(err, apply){
    if(err){
      return next(err);
    }

    if(req.body.result == 'allow'){
      var member = new Member({
        user: apply.user,
        group: apply.group
      });

      member.save(function(err, member){
        if(err){
          return next(err);
        }

        res.redirect('/apply/detail/apply/' + req.body.id);
      });
    }
  });
});