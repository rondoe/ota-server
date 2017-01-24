var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());

  if (!req.user) {
    return res.render('login');
  }
  return res.render('app');
});


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("auth local");

    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      user.lastLogin = new Date();
      user.save();
      return next();
    });
  })(req, res, next);
}, function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

router.get('/me', function(req, res) {
  var user = req.user.toObject();
  var url = req.getBaseUrl();
  url += '/update/esp';
  url += '?token=' + req.user.apiKey;
  user.downloadUrl = url;
  res.json(user);
});

module.exports = router;
