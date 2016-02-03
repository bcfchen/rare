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

                     scope.book = function(){
                         scheduleService.bookAppointment()
                         .then(function success(response) {
                             scope.toWorkflow({
                                 workflow: userWorkflow.ORDER_SUCCESS
                             });
                         }, function error(err){
                          alert("Stripe payment failed with:", err);
                         });
                     }
                 }
             }
         }]);
 })();
