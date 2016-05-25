var express = require('express'),
  router = express.Router(),
  passport = require('passport');
  Group = require('../models/group.js'),
  Comment = require('../models/comment.js'),
  Reply = require('../models/reply.js'),
  requireLogin = require('./userController').requireLogin;

module.exports = function (app) {
  app.use('/', router);
};

router.post('/user/comment/add', requireLogin, function(req, res, next){
  req.checkBody('content', '评论内容不能为空').notEmpty();
  req.checkBody('type', '评论类型不能为空').notEmpty();
  req.checkBody('source', '评论资源不能为空').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    res.jsonp({result:-2,errors: errors});
    return;
  }

  var comment = new Comment({
    content: req.body.content,
    type: req.body.type,
    source: req.body.source,
    commentator: req.user
  });

  comment.save(function(err, comment){
    if(err){
      res.jsonp({result: -1, errors: err});
      return ;
    }
    res.jsonp({result: 1, comment: comment});
  });
});

router.get('/user/comment/delete/:id', requireLogin, function(req, res, next){
  if(!req.params.id){
    res.jsonp({result:-2})
  }

  Comment.find({_id: req.params.id},function(err, comment){
    if(err){
      res.jsonp({result: -1, errors: err});
      return;
    }

    if(!comment){
      return;
    }

    if(comment.replies){
      Reply.remove({id: {$in: comment.replies}}, function(err){
        if(err){
          res.jsonp({result: -1, errors: err});
          return;
        }
      });
    }

    comment.remove();
    res.jsonp({result: 1});
  });
});


router.post('/user/reply/add', requireLogin, function(req, res, next){
  req.checkBody('content','回复内容不能为空').notEmpty();
  req.checkBody('commentId','评论不能为空').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    res.jsonp({result:-2,errors: errors});
    return;
  }

  var reply = new Reply({
    content: req.body.content,
    comment: new Comment({_id: req.body.commentId}),
    responder: req.user
  });

  reply.save(function(err,reply){
    if(err){
      res.jsonp({result: -1, errors: err});
      return ;
    }
    Comment.findOne({_id: req.body.commentId},function(err, comment){
      if(err){
        res.jsonp({result: -1, errors: err});
        return ;
      }
      comment.replies.unshift(reply);
      comment.markModified('replies');
      comment.save(function(err, comment){
        if(err){
          res.jsonp({result: -1, errors: err});
          return ;
        }
      });
    });
    res.jsonp({result: 1});
  });
});

router.get('/user/comment/:id/:type', function(req, res, next){
  if(!(req.params.id && req.params.type)){
    res.jsonp({result:-2});
    return;
  }
  var condition = {
    source: req.params.id,
    type: req.params.type
  }
  console.log(condition);
  Comment.find(condition, function(err, comments){
    if(err){
      res.jsonp({result: -1, errors: err});
      return ;
    }
    res.jsonp({result:1,comments: comments});
  })
  .sort('-created')
  .populate('replies')
  .populate('commentator');
});