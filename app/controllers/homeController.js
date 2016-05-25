var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('mind/index', {
      title: '首页'
    });
});

router.get('/about', function (req, res, next) {
    res.render('about', {
      nav: 'about',
      title: '关于'
    });
});

router.get('/contact', function (req, res, next) {
    res.render('contact', {
      nav: 'contact',
      title: '联系我们'
    });
});


