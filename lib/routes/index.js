var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('index', {
            title: 'Express'
        });
    } else {
        res.redirect('/login');
    }
});


router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    passport.authenticate('local', function(err, user, info) {
        console.log(info);
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
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
})

module.exports = router;
