'use strict';

/**
 * @ngdoc function
 * @name otaServerApp.controller:DeviceCtrl
 * @description
 * # DeviceCtrl
 * Controller of the otaServerApp
 */
angular.module('otaServerApp')
  .controller('DeviceCtrl', function(devices) {
    var vm = this;
    vm.devices = devices.data;
  })
  .controller('EditDeviceCtrl', function(device) {
    var vm = this;
    vm.device = device;
  });
