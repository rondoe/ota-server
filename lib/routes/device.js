var express = require('express');
var router = express.Router();
var auth = require('./../auth');
var Device = require('./../../models/device');

/* GET home page. */
router.get('/', auth.isAdmin, function(req, res, next) {
  Device.find(function(err, data) {
    res.json(data);
  })
});

module.exports = router;
