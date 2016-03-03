 (function() {
     angular.module('rare')
         .directive('confirmation', ["fromConfirmation", "constants", "userBuilder", "appointmentBuilder", "userWorkflow", "scheduleService",
             function(fromConfirmation, constants, userBuilder, appointmentBuilder, userWorkflow, scheduleService) {
                 return {
                     restrict: 'E',
                     scope: {
                         toWorkflow: "&",
                         toggleParentNav: "&",
                         navHelper: "="
                     },
                     templateUrl: 'shared/directives/confirmation/confirmation.html',
                     link: function(scope) {
                         fromConfirmation.FROM_CONFIRMATION = true;

                         scope.user = userBuilder.build();
                         var appointment = appointmentBuilder.build();

                         /* if no address on appointment yet, set 
                            user address as appointment address
                         */
                         if (!appointment.getAddress()){
                            appointment.setAddress(scope.user.getAddress());
                         }

                         scope.appointment = appointment;

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
                             scope.isProcessing = true;
                             scheduleService.bookAppointment()
                                 .then(function success(response) {
                                     fromConfirmation.FROM_CONFIRMATION = false;
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
