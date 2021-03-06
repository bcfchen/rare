 (function() {
     angular.module('rare')
         .directive('loginForm', ["appointmentBuilder", "constants", "userBuilder", "userWorkflow", "userValidator", "authService", 
            function(appointmentBuilder, constants, userBuilder, userWorkflow, userValidator, authService) {
             return {
                 restrict: 'E',
                 scope: {
                     toWorkflow: "&",
                     toggleParentNav: "&"
                 },
                 templateUrl: 'shared/directives/login-form/login-form.html',
                 link: function(scope) {
                     scope.user = userBuilder.build();
                     scope.toggleParentNav({
                         showBackBtn: false,
                         showPicker: true
                     });
                     scope.isProcessing = false;

                     scope.validatePhoneNumber = function(phoneNumber) {
                         return userValidator.isValidPhoneNumber(phoneNumber);
                     };

                     scope.login = function() {
                        scope.isProcessing = true;
                     	userBuilder.setPhoneNumber(scope.user.phoneNumber);
                        appointmentBuilder.setPhoneNumber(scope.user.phoneNumber);
                        authService.sendCode(scope.user.phoneNumber)
                             .then(function() {
                                scope.isProcessing = false;
                                 scope.toWorkflow({
                                     workflow: userWorkflow.VERIFY_PHONE
                                 });
                             });
                     };
                 }
             }
         }]);
 })();
