 (function() {
     angular.module('rare')
         .directive('confirmation', ["constants", "userBuilder", "appointmentBuilder", "userWorkflow", "scheduleService",
             function(constants, userBuilder, appointmentBuilder, userWorkflow, scheduleService) {
                 return {
                     restrict: 'E',
                     scope: {
                         toWorkflow: "&",
                         toggleParentNav: "&",
                         navHelper: "="
                     },
                     templateUrl: 'shared/directives/confirmation/confirmation.html',
                     link: function(scope) {
                         scope.user = userBuilder.build();
                         scope.appointment = appointmentBuilder.build();
                         scope.toggleParentNav({
                             showBackBtn: true
                         });

                         if (scope.navHelper) {
                             scope.navHelper.goBack = function() {
                                 scope.toWorkflow({
                                     workflow: userWorkflow.PAYMENT_FORM
                                 });
                             }
                         }

                         scope.toAddressForm = function() {
                             scope.toWorkflow({
                                 workflow: userWorkflow.ADDRESS
                             });
                         }

                         scope.toPaymentForm = function() {
                             scope.toWorkflow({
                                 workflow: userWorkflow.PAYMENT_FORM
                             });
                         }

                         scope.closePaymentError = function() {
                             scope.paymentError = false;
                         }

                         scope.book = function() {
                             // scope.toWorkflow({
                             //          workflow: userWorkflow.ORDER_SUCCESS
                             //      });
                             scope.isProcessing = true;
                             scheduleService.bookAppointment()
                                 .then(function success(response) {
                                     scope.isProcessing = false;
                                     scope.toWorkflow({
                                         workflow: userWorkflow.ORDER_SUCCESS
                                     });
                                 }, function error(err) {
                                     scope.isProcessing = false;
                                     scope.paymentError = true;
                                     console.log("Stripe payment failed with:", err);
                                 });
                         }
                     }
                 }
             }
         ]);
 })();
