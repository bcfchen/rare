
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
    'angularValidator',
    'mcwebb.twilio', 
    'mcwebb.twilio-verification'
  ])
  .config(function ($stateProvider, $urlRouterProvider, TwilioProvider, TwilioVerificationProvider) {
    Stripe.setPublishableKey('pk_test_eiMfC0If1yWAHJMOSWFTz1FK');

    /* test account */
        // setup Twilio 
    TwilioProvider.setCredentials({
        accountSid: 'ACe79928940d39103df64d9bac1fd06a9f',
        authToken: '839a92ea384334275a5871970b5be354'
    });

    TwilioVerificationProvider.setFromNumber('+19252415828');

    /* prod account */
    // // setup Twilio 
    // TwilioProvider.setCredentials({
    //     accountSid: 'AC8b36caff6e2efe2cc52ba9c3adca65aa',
    //     authToken: 'd7487cf487722e6167895d74e11a70d0'
    // });

    // TwilioVerificationProvider.setFromNumber('+14152756413');
    $urlRouterProvider.otherwise("/booking");
     $stateProvider
            .state('booking', {
                url: '/booking/:productId',
                templateUrl: 'booking/booking.html'
            })
  });
