 (function() {
     angular.module('rare')
         .directive('paymentForm', ["billingInfoService", "stripeService", "userBuilder", "userWorkflow", "appointmentBuilder", 
            function(billingInfoService, stripeService, userBuilder, userWorkflow, appointmentBuilder) {
         return {
                 restrict: 'E',
                 scope: {
                     toWorkflow: "&",
                     toggleParentNav: "&"
                 },
                 templateUrl: 'shared/directives/payment-form/payment-form.html',
                 link: function(scope) {
                     scope.toggleParentNav({
                         showBackBtn: false
                     });

                     // generate values for stripe form
                     initialize();

                     scope.confirmNumber = function() {
                         scope.isConfirmed = validateCode();
                         if (scope.isConfirmed) {
                             scope.toWorkflow({
                                 workflow: userWorkflow.PAYMENT_FORM
                             });
                         }
                     }

                     scope.validateZipCode = function(zipCode) {
                         return zipCode.toString().length > 4;
                     }

                     scope.handleStripe = function(status, response) {
                         if (status !== 200) {
                             alert("Stripe payment failed!");
                             return;
                         }

                         userBuilder.setEmail(scope.email)
                                    .setCardNumber(response.card.last4)
                                    .setPaymentAddress(scope)
                                    .setExpiry(scope.expiry);
                         appointmentBuilder.setTokenId(response.id);
                         scope.toWorkflow({
                             workflow: userWorkflow.CONFIRMATION
                         });
                     }

                     function initialize() {
                         var user = userBuilder.build(),
                             appointment = appointmentBuilder.build(),
                             stripeCustomerId = user.getStripeCustomerId();

                         scope.name = user.getFirstName() + " " + user.getLastName();
                         scope.price = appointment.getPrice();

                         billingInfoService.populatePaymentInfo(scope);

                 }
             }
         }}]);
 })();
