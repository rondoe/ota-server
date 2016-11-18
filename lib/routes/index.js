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
      console.log("login called");
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
}, function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
