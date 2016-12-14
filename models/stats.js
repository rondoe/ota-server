var uid = require('uid');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var Stats = new Schema({
  timestamp: {
    type: Date,
    default: new Date()
  },
  // logical identifier and secret
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  },
  node: String,
  data: mongoose.Schema.Types.Mixed,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Statistics', Stats);
