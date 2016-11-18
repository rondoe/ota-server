// requires the model with Passport-Local Mongoose plugged in
var User = require('./../models/user');
var passport = require('passport');
// check admin user
User.findOne({
  username: 'admin'
}, function(err, user) {
  if (!user) {
    var u = new User();
    u.username = 'admin';
    u.admin = true;
    u.setPassword('admin', function(err) {
      console.log(err);
      u.save();
    });
  }
});


// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var authenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(403);
};

var isAdmin = function(req, res, next) {
  if (req.user && req.user.admin) {
    return next();
  }
  res.sendStatus(403);
}

module.exports.authenticated = authenticated;
module.exports.isAdmin = isAdmin;
