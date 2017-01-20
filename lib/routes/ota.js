var Device = require('./../../models/device');
var express = require('express');
var router = express.Router();
var auth = require('./../auth');
var User = require('./../../models/user');

var isESP = function(req, res, next) {
  console.log(req.headers);
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

router.get('/esp', isESP, function(req, res, next) {
  console.log("try to find device in mode " + req.get("x-esp8266-mode"));
  console.log(req.user);
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
    // send not modified
    res.sendStatus(304);
  });
});

module.exports = router;
