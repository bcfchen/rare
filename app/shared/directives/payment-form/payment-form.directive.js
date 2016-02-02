 (function() {
     angular.module('rare')
         .directive('paymentForm', ["paymentService", "stripeService", "userBuilder", "userWorkflow", "appointmentBuilder", 
            function(paymentService, stripeService, userBuilder, userWorkflow, appointmentBuilder) {
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

                         userBuilder.setEmail(scope.email);
                         appointmentBuilder.setTokenId(response.id);
                         userBuilder.setExpiry(scope.expiry);
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

                         paymentService.populatePaymentInfo(scope);

                 }
             }
         }}]);
 })();
