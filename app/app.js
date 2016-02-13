
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
    'angularPayments',
    'angularValidator'
  ])
  .run(function($rootScope, $location){
    var locationSearch;

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //save location.search so we can add it back after transition is done
        locationSearch = $location.search();
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //restore all query string parameters back to $location.search
        $location.search(locationSearch);
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    Stripe.setPublishableKey('pk_live_570nSYPKpEFawxjct8tu4u9Z');

    $urlRouterProvider.otherwise("/booking");
     $stateProvider
            .state('booking', {
                url: '/booking/:productId',
                templateUrl: 'booking/booking.html',
                cache: false
            })
  });
