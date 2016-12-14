var Moniker = require('moniker');
var uid = require('uid');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var names = Moniker.generator([Moniker.adjective, Moniker.noun]);


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
  deviceId: {
    type: String,
    unique: true
  },
  secret: String,
  sta: String, // sta-mac
  ap: String, // ap-mac
  sdk: String,
  type: String,
  framework: String,
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
  created: Date,
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
    this.deviceId = names.choose();
  }
  if (!this.secret) {
    this.secret = uid(32);
  }

  // do stuff
  next();
});

module.exports = mongoose.model('Device', Device);
