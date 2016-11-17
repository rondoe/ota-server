// requires the model with Passport-Local Mongoose plugged in
var User = require('./../models/user');
var passport = require('passport');


// Configure passport middleware

// Configure passport middleware
passport.initialize();
passport.session();

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// check admin user
User.findOne({
    username: 'admin'
}, function(err, user) {
    if (!user) {
        var u = new User();
        u.username = 'admin';
        u.setPassword('admin', function(err) {
            console.log(err);
            u.save();
        });
    }
});

module.exports = passport;
