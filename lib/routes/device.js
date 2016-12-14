var express = require('express');
var router = express.Router();
var auth = require('./../auth');
var Device = require('./../../models/device');


// set device on req.device if params id found
router.use('/:id', function(req, res, next) {
  Device.findOne({
    _id: req.params.id
  }).populate('user').exec(function(err, device) {
    req.device = device;
    next();
  });
});

var downloadUrl = function(req, res) {
  var url = req.getBaseUrl();
  url += '/update/esp';
  url += '?token=' + req.user.apiKey ||  '';
  url += '&device=' + req.device.deviceId;
  url += '&secret=' + req.device.secret;
  res.json({
    url: url
  });
};


var dataUrl = function(req, res) {
  var url = req.getBaseUrl();
  url += '/input/data';
  url += '?token=' + req.user.apiKey ||  '';
  url += '&device=' + req.device.deviceId;
  url += '&secret=' + req.device.secret;
  res.json({
    url: url
  });
};

/* GET home page. */
router.get('/', auth.isAdmin, function(req, res) {
  Device.find({}).populate('user').exec(function(err, data) {
    res.json(data);
  });
});


router.get('/:id', auth.ownDeviceOrAdmin, function(req, res) {
  Device.findOne({
    _id: req.params.id
  }).populate('user').exec(function(err, device) {
    res.json(device);
  });
});

router.post('/:id', auth.ownDeviceOrAdmin, function(req, res, next) {
  req.device.deviceId = req.body.deviceId;
  req.device.save(function(err) {
    if (err) {
      return next(err);
    }
    res.json(req.device);
  });
});

router.get('/:id/downloadUrl', auth.ownDeviceOrAdmin, downloadUrl);
router.get('/:id/dataUrl', auth.ownDeviceOrAdmin, dataUrl);

module.exports = router;
