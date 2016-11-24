// getting-started.js
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL ||  'mongodb://localhost/ota');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to mongodb');
});


module.exports = db;
