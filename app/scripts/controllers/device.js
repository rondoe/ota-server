'use strict';

/**
 * @ngdoc function
 * @name otaServerApp.controller:DeviceCtrl
 * @description
 * # DeviceCtrl
 * Controller of the otaServerApp
 */
angular.module('otaServerApp')
  .controller('DeviceCtrl', function(devices, mySocket, DeviceService, $timeout) {
    var vm = this;
    vm.devices = devices.data;
    vm.updates = [];


    /////////// data manipulation /////////////
    function deleteDevice(device) {
      DeviceService.delete(device).success(function(res) {
        DeviceService.all().success(function(res) {
          vm.devices = res;
        });
      });
    }
    vm.delete = deleteDevice;


    /////////// socket.io stuff ///////////////

    mySocket.on('update:check', function(id) {});

    mySocket.on("update:start", function(id) {
      vm.updates.push(id);
    });

    mySocket.on('update:completed', function(id) {
      // wait a little bit, to give server a chance to update the data
      $timeout(function() {
        vm.updates = vm.updates.filter(function(e) {
          return e !== id;
        });
        DeviceService.all().success(function(res) {
          vm.devices = res;
        });
      }, 500);
    });
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
