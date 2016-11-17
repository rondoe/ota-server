'use strict';

/**
 * @ngdoc function
 * @name otaServerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the otaServerApp
 */
angular.module('otaServerApp')
  .controller('NavigationCtrl', function($rootScope, $scope) {
    var vm = this;
    vm.sidebar = true;
    $rootScope.bodyClass = "nav-md";

    $scope.$watch("vm.sidebar", function() {
      $rootScope.bodyClass = vm.sidebar ? "nav-md" : "nav-sm";
    });
  })
  .controller('IndexCtrl', function() {});
