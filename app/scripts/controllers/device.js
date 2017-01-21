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
  .controller('EditDeviceCtrl', function(device, DeviceService, FileUploader) {
    var vm = this;
    vm.device = device.data;
    vm.update = update;
    vm.uploader = new FileUploader({
      url: 'devices/' + vm.device._id + '/upload'
    });


    vm.uploader.onAfterAddingAll = function(addedFileItems) {
      vm.uploader.uploadAll();
    };

    DeviceService.otaUrl(vm.device).success(function(res) {
      vm.otaUrl = res.url;
    });

    DeviceService.dataUrl(vm.device).success(function(res) {
      vm.dataUrl = res.url;
    });


    //////////////////
    function update() {
      DeviceService.update(vm.device).success(function(res) {
        vm.device = res;
      });
    }
  });
