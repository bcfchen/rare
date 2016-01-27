
/**
 * @ngdoc overview
 * @name rare
 * @description
 * # rare
 *
 * Main module of the application.
 */
angular
  .module('rare', [
    'ui.router',
    'firebase'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/booking");
     $stateProvider
            .state('booking', {
                url: '/booking?productId',
                templateUrl: 'booking/booking.html'
            })
  });
