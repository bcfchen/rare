'use strict';

/**
 * @ngdoc overview
 * @name rareApp
 * @description
 * # rareApp
 *
 * Main module of the application.
 */
angular
  .module('rare', [
    'firebase',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/booking', {
        templateUrl: 'booking/booking.html'
      })
      .otherwise({
        templateUrl: 'booking/booking.html'
      });
  });
