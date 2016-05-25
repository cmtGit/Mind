var express = require('express'),
  router = express.Router(),
  passport = require('passport');
  Group = require('../models/group.js'),
  Follow = require('../models/follow.js'),
  requireLogin = require('./userController').requireLogin;

module.exports = function (app) {
  app.use('/', router);
};


router.get('/follow/add/:id', requireLogin, function(req, res, next){
  if(!req.params.id){
    return next(new Error('no group id provided'));
  }
  var group = new Group({
    _id: req.params.id
  });

  Follow.find({user: req.user, group: group}, function(err, followOld){
    if(err){
      res.jsonp({result: -1});
      return;
    }
    if(followOld.length > 0){
      res.jsonp({result: 0});
      return;
    }

    var follow = new Follow({
      user: req.user,
      group: group
    });


    follow.save(function(err,follow){
      if(err){
        res.jsonp({result: -1});
        return;
      }
       res.jsonp({result: 1});
    });
  });
});


router.get('/follow/isFollow/:id', requireLogin, function(req, res, next){
  if(!req.params.id){
    res.jsonp({result:-1,msg: 'the id must be provided'});
    return ;
  }

  var group = new Group({
    _id: req.params.id
  });

  Follow.find({user: req.user, group: group}, function(err, followOld){
    if(err){
      res.jsonp({result: -1});
      return;
    }
     if(followOld.length > 0){
        res.jsonp({result: 1});
        return;
     }

     res.jsonp({result: 0});

  });

});


router.get('/follow/cancel/:id', requireLogin, function(req, res, next){
  if(!req.params.id){
    res.jsonp({result:-1,msg: 'the id must be provided'});
    return ;
  }

  var group = new Group({
    _id: req.params.id
  });

  Follow.find({user: req.user, group: group}, function(err, follow){
    if(err){
      res.jsonp({result: -1});
      return;
    }

    if(!follow){
      res.jsonp({result: 0});
      return;
    }

    Follow.remove({user: req.user, group: group}, function(err){
      if(err){
        res.jsonp({result: -1});
        return;
      }
      res.jsonp({result: 1});
    });
  });

});

router.get('/follow/', requireLogin, function(req, res, next){
  Follow.find({user: req.user})
    .populate('group')
    .exec(function(err, follows){
      if(err){
        return next(err);
      }
      console.log(follows);
      res.render('personal/follow',{
        follows: follows,
        title: '关注中心',
        pagePaper: 'follow'
      });
    });
});