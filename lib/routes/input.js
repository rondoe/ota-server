var express = require('express');
var router = express.Router();
var auth = require('./../auth');
var Stats = require('./../../models/stats');
var Device = require('./../../models/device');


router.use('/', function(req, res, next) {
  // there must be a user and a device in query String
  if (req.query.secret) {
    Device.
    findOne({
      secret: req.query.secret
    }, function(err, res) {
      if (err) {
        next(new Error("Device not found."));
      }
      req.device = res;
      next();
    });
  } else {
    next();
  }
});


function handleData(req, res, next) {
  // device and user is in place, so we just need to add the data
  var stats = new Stats();
  stats.device = req.device;
  stats.user = req.user;
  stats.timestamp = req.query.timestamp ||  new Date();
  stats.data = req.query.data ||  req.body.data;
  stats.node = req.query.node || req.body.node;
  stats.save(function(err) {
    if (err) {
      next(err);
    }
    res.json({
      status: 'success'
    });
  });
}

router.get('/data', handleData);
router.post('/data', handleData);

module.exports = router;
