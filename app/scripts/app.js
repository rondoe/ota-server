'use strict';

/**
 * @ngdoc overview
 * @name otaServerApp
 * @description
 * # otaServerApp
 *
 * Main module of the application.
 */
angular
  .module('otaServerApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularMoment',
    'ngclipboard',
  ])
  .config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/admin/devices', {
        templateUrl: 'views/admin/devices/index.html',
        controller: 'DeviceCtrl',
        controllerAs: 'vm',
        resolve: {
          devices: function(DeviceService) {
            return DeviceService.all();
          }
        }
      })
      .when('/devices/:id/edit', {
        templateUrl: 'views/devices/edit.html',
        controller: 'EditDeviceCtrl',
        controllerAs: 'vm',
        resolve: {
          device: function(DeviceService, $route) {
            return DeviceService.get($route.current.params.id);
          }
        }
      })
      .when('/devices', {
        templateUrl: 'views/devices/index.html',
        controller: 'DeviceCtrl',
        controllerAs: 'vm',
        resolve: {
          devices: function(DeviceService) {
            return DeviceService.my();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
