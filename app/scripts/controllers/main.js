'use strict';

/**
 * @ngdoc function
 * @name otaServerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the otaServerApp
 */
angular.module('otaServerApp')
  .controller('NavigationCtrl', function($rootScope, $scope, DeviceService, UserService) {
    var vm = this;
    vm.sidebar = true;
    $rootScope.bodyClass = "nav-md";

    $scope.$watch("vm.sidebar", function() {
      $rootScope.bodyClass = vm.sidebar ? "nav-md" : "nav-sm";
    });

    UserService.me().success(function(res) {
      $rootScope.user = res;
    })

    DeviceService.my().success(function(res) {
      $rootScope.deviceCount = res.length;
    });


  })
  .controller('MainCtrl', function(DeviceService) {

    var vm = this;



  });
