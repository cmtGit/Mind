var express = require('express'),
  router = express.Router(),
  passport = require('passport');
  Inform = require('../models/inform.js'),
  InformDetail = require('../models/inform_detail.js'),
  Group = require('../models/group.js'),
  requireLogin = require('./userController').requireLogin;

module.exports = function (app) {
  app.use('/', router);
};


router.get('/inform/', requireLogin, function(req, res, next){
  InformDetail.find({user: req.user}, function(err, informes){
    if(err){
      return next(err);
    }

    res.render('/personal/inform', {
      informes: informes,
      title: '通知中心'
    });
  })
  .populate('inform')
  .sort('-created');
});


router.get('/inform/update/:id', requireLogin, function(req, res, next){
  if(req.params.id){
    return next(new Error('the inform can not be null'));
  }

  var inform = new Inform({
    _id: id
  });

  InformDetail.update({inform:inform,user: req.user}, {$set:{readed: 1}},function (err, raw){
    if(err){
      res.jsonp({result:-1});
      return;
    }
    res.jsonp({result:1});
  });

});

router.get('/inform/delete/:id', requireLogin, function(req, res, next){
  if(req.params.id){
    return next(new Error('the inform can not be null'));
  }

  var inform = new Inform({
    _id: id
  });

  InformDetail.remove({inform: inform, user: req.user},function (err) {
    if(err){
      res.jsonp({result: -1});
      return;
    }

    res.jsonp({result: 1});
  });
});


