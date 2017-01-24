var express = require('express');
var router = express.Router();
var Device = require('./../../models/device');

router.get('/devices', function(req, res) {
  Device.byUser(req.user._id, function(err, results) {
    res.json(results);
  });
});

module.exports = router;
