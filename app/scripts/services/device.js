'use strict';

/**
 * @ngdoc service
 * @name otaServerApp.Device
 * @description
 * # Device
 * Service in the otaServerApp.
 */
angular.module('otaServerApp')
  .service('DeviceService', function($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.my = function() {
      return $http.get("/me/devices");
    };

    this.all = function() {
      return $http.get("/devices");
    };

    this.get =
      function(id) {
        return $http.get("/devices/" + id);
      };

    this.update = function(device) {
      return $http.post('/devices/' + device._id, device);
    };

    this.delete = function(device) {
      return $http.delete('/devices/' + device._id);
    };

    this.otaUrl = function(device) {
      return $http.get('/devices/' + device._id + '/downloadUrl');
    };

    this.dataUrl = function(device) {
      return $http.get('/devices/' + device._id + '/dataUrl');
    };
  });
