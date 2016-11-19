var Moniker = require('moniker');
var uid = require('uid');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//instantiate mongoose-gridfs
var gridfs = require('mongoose-gridfs')({
  collection: 'software',
  model: 'Software'
});

//obtain a model
var Software = gridfs.model;

var Device = new Schema({
  name: String,
  // logical identifier and secret
  deviceId: String,
  secret: String,
  sta: String, // sta-mac
  ap: String, // ap-mac
  sdk: String,
  version: String, // software version
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  size: {
    sketch: Number,
    chip: Number,
    free: Number
  },
  created: {
    type: Date,
    default: new Date()
  },
  lastCheck: Date,
  versions: [{
    version: String,
    software: Schema.Types.ObjectId,
    created: {
      type: Date,
      default: new Date()
    },
    downloaded: {
      type: Boolean,
      default: false
    },
    downloadDate: Date
  }]
});


Device.statics.byUser = function(id, callback) {
  return this.find({
    user: id
  }, callback);
};

Device.pre('save', function(next) {

  if (!this.deviceId) {
    this.deviceId = Moniker.choose();
  }
  if (!this.secret) {
    this.secret = uid(32);
  }

  // do stuff
  next();
});

module.exports = mongoose.model('Device', Device);
