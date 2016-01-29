
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
    'firebase',
    'angularPayments'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    Stripe.setPublishableKey('pk_test_eiMfC0If1yWAHJMOSWFTz1FK')
    $urlRouterProvider.otherwise("/booking");
     $stateProvider
            .state('booking', {
                url: '/booking?productId',
                templateUrl: 'booking/booking.html'
            })
  });
