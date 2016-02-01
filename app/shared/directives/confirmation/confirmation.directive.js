 (function() {
     angular.module('rare')
         .directive('confirmation', ["constants", "userBuilder", "appointmentBuilder", "userWorkflow", "stripeService", function(constants, userBuilder, appointmentBuilder, userWorkflow, stripeService) {
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

                     scope.book = function(){
                         userBuilder.setEmail(scope.email);

                         stripeService.makePayment(response, scope.user.getStripeCustomerId(), scope.appointment.getPrice())
                         .then(function success(response) {
                             scope.toWorkflow({
                                 workflow: userWorkflow.CONFIRMATION
                             });
                         }, function error(err){
                          alert("Stripe payment failed with:", err);
                         });
                     }
                 }
             }
         }]);
 })();
