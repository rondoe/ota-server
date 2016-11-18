var index = require('./routes/index');
var users = require('./routes/users');
var device = require('./routes/device');
var ota = require('./routes/ota');
var auth = require('./auth');

module.exports = function(app) {
  app.use('/', index);
  app.use('/me', auth.authenticated, users);
  app.use('/devices', auth.authenticated, device);
  app.use('/update', ota);
};
