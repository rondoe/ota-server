var Device = require('./../../models/device');
var express = require('express');
var router = express.Router();
var auth = require('./../auth');


var isESP = function(req, res, next) {
  if (!req.get("HTTP_X_ESP8266_STA_MAC") &&
    !req.get("HTTP_X_ESP8266_AP_MAC") &&
    !req.get("HTTP_X_ESP8266_FREE_SPACE") &&
    !req.get("HTTP_X_ESP8266_SKETCH_SIZE") &&
    !req.get("HTTP_X_ESP8266_CHIP_SIZE") &&
    !req.get("HTTP_X_ESP8266_SDK_VERSION") &&
    !req.get("HTTP_X_ESP8266_VERSION")) {
    res.send(403);
  }
  next();
};

/*

[HTTP_USER_AGENT] => ESP8266-http-Update [HTTP_X_ESP8266_STA_MAC] => 18:FE:AA:AA:AA:AA [HTTP_X_ESP8266_AP_MAC] => 1A:FE:AA:AA:AA:AA [HTTP_X_ESP8266_FREE_SPACE] => 671744 [HTTP_X_ESP8266_SKETCH_SIZE] => 373940 [HTTP_X_ESP8266_CHIP_SIZE] => 524288 [HTTP_X_ESP8266_SDK_VERSION] => 1.3.0 [HTTP_X_ESP8266_VERSION] => DOOR-7-g14f53a19
 */

router.get('/esp', isESP, function(req, res, next) {
  Device.findOne({
    sta: req.get("HTTP_X_ESP8266_STA_MAC")
  }, function(err, device) {
    if (!device) {
      device = new Device();
      device.sta = req.get("HTTP_X_ESP8266_STA_MAC");
      device.save();
    }
    res.sendStatus(200);
  });
});

module.exports = router;
