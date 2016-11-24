var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');
var uid = require('uid');

var User = new Schema({
  admin: Boolean,
  email: String,
  apiKey: {
    type: String,
    unique: true
  },
  lastLogin: Date
});

User.plugin(passportLocalMongoose);

User.pre('save', function(next) {
  if (!this.apiKey) {
    this.apiKey = uid(64);
  }
  next();
});

module.exports = mongoose.model('User', User);
