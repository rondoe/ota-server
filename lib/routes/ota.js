var Device = require('./../../models/device');
var express = require('express');
var router = express.Router();
var auth = require('./../auth');


var isESP = function(req, res, next) {
  console.log(req);
  if (!req.get("x-esp8266-sta-mac") &&
    !req.get("x-esp8266-ap-mac") &&
    !req.get("x-esp8266-free-space") &&
    !req.get("x-esp8266-sketch-size") &&
    !req.get("x-esp8266-chip-size") &&
    !req.get("x-esp8266-sdk-version")) {
    res.sendStatus(403);
  }
  next();
};

/*

[HTTP_USER_AGENT] => ESP8266-http-Update [HTTP_X_ESP8266_STA_MAC] => 18:FE:AA:AA:AA:AA [HTTP_X_ESP8266_AP_MAC] => 1A:FE:AA:AA:AA:AA [HTTP_X_ESP8266_FREE_SPACE] => 671744 [HTTP_X_ESP8266_SKETCH_SIZE] => 373940 [HTTP_X_ESP8266_CHIP_SIZE] => 524288 [HTTP_X_ESP8266_SDK_VERSION] => 1.3.0 [HTTP_X_ESP8266_VERSION] => DOOR-7-g14f53a19
 */

router.get('/esp', isESP, function(req, res, next) {
  console.log("try to find device in mode " + req.get("x-esp8266-mode"));
  Device.findOne({
    sta: req.get("x-esp8266-sta-mac")
  }, function(err, device) {
    if (!device) {
      device = new Device();
      device.sta = req.get("x-esp8266-sta-mac");
    }
    device.ap = req.get("x-esp8266-ap-mac");
    device.type = "esp8266";
    device.size.sketch = req.get("x-esp8266-sketch-size");
    device.size.free = req.get("x-esp8266-free-space");
    device.size.chip = req.get("x-esp8266-chip-size");
    device.sdk = req.get("x-esp8266-sdk-version");
    device.version = req.get("x-esp8266-version");
    device.lastCheck = new Date();
    device.save();
    res.sendStatus(200);
  });
});

module.exports = router;
