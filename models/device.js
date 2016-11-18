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


module.exports = mongoose.model('Device', Device);
