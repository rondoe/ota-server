var Moniker = require('moniker');
var uid = require('uid');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var names = Moniker.generator([Moniker.adjective, Moniker.noun]);
var _ = require('lodash');

//instantiate mongoose-gridfs
var gridfs = require('mongoose-gridfs')({
  collection: 'software',
  model: 'Software'
});

//obtain a model
var Software = gridfs.model;

var schemaOptions = {
  toJSON: {
    virtuals: true
  }
};
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
  created: {
    type: Date,
    default: new Date()
  },
  lastCheck: Date,
  inProgress: Boolean,
  pending: {
    type: Boolean,
    default: false
  }, // software update pending, new software deployed but no rollout yet
  lastUpdate: Date,
  software: [{
    file: {
      type: Schema.Types.ObjectId,
      ref: 'Software'
    },
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
}, schemaOptions);


Device.statics.byUser = function(id, callback) {
  return this.find({
    user: id
  }, callback);
};

Device.virtual('updateCount').get(function() {
  return _.filter(this.software, function(s) {
    return !s.downloaded;
  }).length;
});

// cb(err, software) null if no software
Device.methods.nextSoftware = function(cb) {
  var res = _.filter(_.orderBy(this.software, ['created'], ['asc']), function(s) {
    return !s.downloaded;
  });
  // return first software to update
  if (res.length > 0) {
    cb(null, res[0]);
  } else {

    cb(null, null);
  }
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
