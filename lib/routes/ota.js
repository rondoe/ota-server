var Device = require('./../../models/device');
var express = require('express');
var router = express.Router();
var auth = require('./../auth');
var User = require('./../../models/user');
var mongoose = require('mongoose');
var crypto = require('crypto');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;


module.exports = function(io) {



  var isESP = function(req, res, next) {
    // local requests are forwared
    if (req.ip === '::1') {
      return next();
    }

    if (!req.get("x-esp8266-sta-mac") &&
      !req.get("x-esp8266-ap-mac") &&
      !req.get("x-esp8266-free-space") &&
      !req.get("x-esp8266-sketch-size") &&
      !req.get("x-esp8266-chip-size") &&
      !req.get("x-esp8266-sdk-version")) {
      res.sendStatus(403);
    } else {
      req.mac = req.get("x-esp8266-sta-mac");
      next();
    }
  };



  var checkSecret = function(req, res, next) {
    if (req.query.secret) {
      User.findOne({
        apiKey: req.query.secret
      }, function(err, user) {
        if (err) {
          return next(err);
        }
        req.user = user;
        if (!user) {
          // Unauthorized to user
          res.sendStatus(401);
        } else {
          next();
        }
      });
    } else {
      next();
    }
  };

  // check the secret and set the user
  router.use(checkSecret);

  /*

  [HTTP_USER_AGENT] => ESP8266-http-Update [HTTP_X_ESP8266_STA_MAC] => 18:FE:AA:AA:AA:AA [HTTP_X_ESP8266_AP_MAC] => 1A:FE:AA:AA:AA:AA [HTTP_X_ESP8266_FREE_SPACE] => 671744 [HTTP_X_ESP8266_SKETCH_SIZE] => 373940 [HTTP_X_ESP8266_CHIP_SIZE] => 524288 [HTTP_X_ESP8266_SDK_VERSION] => 1.3.0 [HTTP_X_ESP8266_VERSION] => DOOR-7-g14f53a19
   */

  router.get('/esp', isESP, function(req, res) {

    Device.findOne({
      sta: req.mac
    }, function(err, device) {

      if (!device) {
        device = new Device();
        device.sta = req.mac;
      }
      device.ap = req.get("x-esp8266-ap-mac");
      device.type = "esp8266";
      device.size.sketch = req.get("x-esp8266-sketch-size");
      device.size.free = req.get("x-esp8266-free-space");
      device.size.chip = req.get("x-esp8266-chip-size");
      device.sdk = req.get("x-esp8266-sdk-version");
      device.version = req.get("x-esp8266-version");
      device.lastCheck = new Date();
      device.user = req.user;
      device.save();
      io.emit('update:check', device._id);

      if (device.updateCount === 0) {
        // no more pending updates
        device.pending = false;
        device.inProgress = false;
        io.emit('update:completed', device._id);
        device.save();
        // send not modified
        res.sendStatus(304);
      } else {
        io.emit('update:start', device._id);
        device.nextSoftware(function(err, s) {
          if (err || s === null) {
            res.sendStatus(304);
          } else {
            console.log("find file " + s.file);
            device.inProgress = true;
            device.save();
            var gfs = Grid(mongoose.connection.db);
            gfs.findOne({
              _id: s.file,
              root: 'software'
            }, function(err, file) {
              res.setHeader("Content-Type", "application/octet-stream");
              res.setHeader("Content-Disposition", "attachment; filename=firmware.bin");
              res.setHeader("Content-Length", file.length);
              res.setHeader("x-MD5", file.md5);
            });

            var readstream = gfs.createReadStream({
              _id: s.file,
              root: 'software'
            });
            readstream.on('error', function(err) {
              res.sendStatus(500, err);
            });
            readstream.on('open', function() {
              readstream.pipe(res);

            });
            readstream.on('close', function() {
              s.downloaded = true;
              s.downloadDate = device.lastUpdate = new Date();
              device.save();
            });
          }
        });
      }
    });
  });

  return router;
};
