'use strict';

/**
 * @ngdoc function
 * @name otaServerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the otaServerApp
 */
angular.module('otaServerApp')
  .controller('DocCtrl', function(doc) {
    var vm = this;
    vm.doc = doc;
  });
