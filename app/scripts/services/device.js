'use strict';

/**
 * @ngdoc service
 * @name otaServerApp.Device
 * @description
 * # Device
 * Service in the otaServerApp.
 */
angular.module('otaServerApp')
  .service('DeviceService', function($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.my = function() {
      return $http.get("/me/devices");
    }

    this.all = function() {
      return $http.get("/devices");
    }
  });
