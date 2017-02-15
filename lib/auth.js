// requires the model with Passport-Local Mongoose plugged in
var User = require('./../models/user');
var passport = require('passport');
var Device = require('./../models/device');
var BasicStrategy = require('passport-http').BasicStrategy;

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
passport.use('user-basic', new BasicStrategy(
  function(userid, password, done) {
    console.log("basic");
    User.findOne({
      username: userid
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.apiKey !== password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var authenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('authenticated');
    return next();
  }
  passport.authenticate('user-basic', function(err, user, info) {
    if (err) next(err);
    if (!user) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })(req, res, next);
};

var isAdmin = function(req, res, next) {
  if (req.user && req.user.admin) {
    return next();
  }
  res.sendStatus(403);
};

var ownDeviceOrAdmin = function(req, res, next) {
  // admin can see all devices
  if (req.user.admin) {
    return next();
  }

  Device.findById(req.params.id).populate('user').exec(function(err, device) {
    if (req.user === device.user) {
      return next();
    }
    res.sendStatus(403);
  });
};


module.exports.ownDeviceOrAdmin = [authenticated, ownDeviceOrAdmin];
module.exports.authenticated = authenticated;
module.exports.isAdmin = isAdmin;
