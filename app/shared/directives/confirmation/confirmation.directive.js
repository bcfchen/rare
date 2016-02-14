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

                         setPaymentBrand();

                         function setPaymentBrand(){
                            var paymentBrand = scope.user.getBrand().toUpperCase();
                            if (paymentBrand === "VISA"){
                                scope.brandImg = "img/icon_payment_visa@2x.png";
                            } else if (paymentBrand === "MASTERCARD"){
                                scope.brandImg = "img/icon_payment_mastercard@2x.png";
                            } else if (paymentBrand === "DISCOVER") {
                                scope.brandImg = "img/icon_payment_discover@2x.png";
                            } else {
                                scope.brandImg = "img/icon_payment_amex@2x.png";
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
