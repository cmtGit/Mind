var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports.init = function(){
  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) { 
          return done(null, false); 
        }
        if (!user.verifyPassword(password)) { 
          return done(null, false); 
        }
        console.log(username);
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

