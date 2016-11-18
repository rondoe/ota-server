'use strict';

/**
 * @ngdoc service
 * @name otaServerApp.user
 * @description
 * # user
 * Service in the otaServerApp.
 */
angular.module('otaServerApp')
  .service('UserService', function($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.me = function() {
      return $http.get('/me');
    }
  });
