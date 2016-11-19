var express = require('express');
var router = express.Router();
var auth = require('./../auth');
var Device = require('./../../models/device');

/* GET home page. */
router.get('/', auth.isAdmin, function(req, res) {
  Device.find({}).populate('user').exec(function(err, data) {
    res.json(data);
  });
});


router.get('/:id', auth.ownDeviceOrAdmin, function(req, res) {
  Device.find({
    _id: req.params.id
  }).populate('user').exec(function(err, device) {
    res.json(device);
  });
});

module.exports = router;
