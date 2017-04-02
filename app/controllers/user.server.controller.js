var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var async = require("async");


var User = require("../models/users.server.model");



// serialize & deserialize
passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

//middleware
passport.use('local-login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  User.findOne( {email: email}, function(err, user){
    if (err) return done(err);

    if(!user){
      return done(null, false, req.flash('loginMessage', 'Tài khoản không tồn tại '));
    }

    if(user.comparePassword(password) == false){
      return done(null, false, req.flash('loginMessage', 'Mật khẩu không chính xác '));
    }

    return done(null, user);
  });
}));



//custom function to validate
exports.isAuthenticated = function(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }

  res.redirect('/');

}


exports.SignUp = function( req, res, next){
  var user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.profile.address = req.body.address;
  user.avatar = user.avatar();

  User.findOne({ email: req.body.email}, function (err, existingUser){
    if (existingUser){
      req.flash('existingUser', "Email đã tồn tại");
      return res.redirect('/signup');
    }
    else {
      user.save(function (err, user){
        if (err) return next(err)
        req.flash('createdUser', "Tạo tài khoản thành công");
        return res.redirect('/signup');
      });
    }
  });

};
